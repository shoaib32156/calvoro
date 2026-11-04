import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Copy,
  Inbox,
  Loader2,
  Mail,
  RefreshCw,
  Trash2,
  Zap,
} from "lucide-react";

import ToolPage from "./ToolPage.jsx";
import { copyText } from "./utils.js";
import {
  MAILBOX_TTL_MS,
  buildDemoMessages,
  extractVerificationCodes,
  generateMailbox,
} from "./tempMailCore.js";
import {
  createRemoteMailbox,
  deleteRemoteMailbox,
  fetchRemoteInbox,
  fetchRemoteMessage,
  trackEvent,
} from "./tempMailApi.js";
import "./tempMail.css";

const STORAGE_KEY = "calvoro-temp-mail-v1";
const POLL_INTERVAL_MS = 15_000;

function timeAgo(iso) {
  const parsed = Date.parse(iso);

  if (!Number.isFinite(parsed)) return "";

  const diff = Date.now() - parsed;

  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;

  return new Date(parsed).toLocaleDateString();
}

function formatClock(iso) {
  const parsed = Date.parse(iso);

  if (!Number.isFinite(parsed)) return "";

  return new Date(parsed).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const session = JSON.parse(raw);

    if (!session?.address || !session?.expiresAt) return null;

    return session;
  } catch {
    return null;
  }
}

function storeSession(session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage may be unavailable in private browsing modes.
  }
}

function clearStoredSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

function sessionFromMailbox(mailbox, source) {
  return {
    id: mailbox.id,
    token: mailbox.token,
    address: mailbox.address,
    createdAt: mailbox.createdAt,
    expiresAt: mailbox.expiresAt,
    delivery: mailbox.delivery || "demo",
    source,
  };
}

function InboxMessageList({
  messages,
  activeId,
  onSelect,
}) {
  if (messages.length === 0) {
    return (
      <div className="calvoro-tm-empty" role="status">
        <Inbox size={28} strokeWidth={1.6} aria-hidden="true" />
        <strong>No messages yet</strong>
        <p>
          Incoming messages will appear here. Use the refresh button or
          wait for the automatic check.
        </p>
      </div>
    );
  }

  return (
    <ul className="calvoro-tm-message-list" aria-label="Inbox messages">
      {messages.map((message) => (
        <li key={message.id}>
          <button
            type="button"
            className={`calvoro-tm-message-item${
              activeId === message.id ? " is-active" : ""
            }${message.read ? "" : " is-unread"}`}
            onClick={() => onSelect(message)}
            aria-current={activeId === message.id ? "true" : undefined}
          >
            <span className="calvoro-tm-message-top">
              <span className="calvoro-tm-message-sender">
                {message.demo && (
                  <span className="calvoro-tm-demo-chip">DEMO</span>
                )}
                {message.read ? "" : (
                  <span
                    className="calvoro-tm-unread-dot"
                    aria-label="Unread"
                  />
                )}
                {message.from}
              </span>
              <span className="calvoro-tm-message-time">
                {timeAgo(message.receivedAt)}
              </span>
            </span>
            <span className="calvoro-tm-message-subject">
              {message.subject}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function CodeChips({ codes, onCopied }) {
  if (!codes || codes.length === 0) return null;

  return (
    <div className="calvoro-tm-codes" aria-label="Verification codes">
      <span className="calvoro-tm-codes-label">
        Verification code{codes.length > 1 ? "s" : ""}
      </span>
      <div className="calvoro-tm-codes-row">
        {codes.map((code) => (
          <button
            key={code}
            type="button"
            className="calvoro-tm-code-chip"
            onClick={async () => {
              const copied = await copyText(code);
              onCopied(copied ? `Code ${code} copied.` : "Copy was blocked by the browser.");
            }}
          >
            <strong>{code}</strong>
            <Copy size={14} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageViewer({ message, loading, onCopied }) {
  const [tab, setTab] = useState("text");

  if (loading) {
    return (
      <div className="calvoro-tm-viewer calvoro-tm-viewer-loading" role="status">
        <Loader2 size={22} className="calvoro-tm-spin" aria-hidden="true" />
        <span>Loading message…</span>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="calvoro-tm-viewer calvoro-tm-viewer-placeholder">
        <Mail size={30} strokeWidth={1.6} aria-hidden="true" />
        <strong>Select a message</strong>
        <p>Choose a message from the inbox to read it here.</p>
      </div>
    );
  }

  const showHtml = Boolean(message.html);
  const iframeHtml = `<!doctype html><html><head><base target="_blank"><style>body{font-family:Inter,system-ui,-apple-system,sans-serif;color:#172033;margin:16px;line-height:1.55;word-break:break-word}img{max-width:100%;height:auto}</style></head><body>${message.html || ""}</body></html>`;

  return (
    <div className="calvoro-tm-viewer">
      <header className="calvoro-tm-viewer-header">
        <div className="calvoro-tm-viewer-badges">
          {message.demo && <span className="calvoro-tm-demo-chip">DEMO MESSAGE</span>}
          <span className="calvoro-tm-viewer-time">
            {formatClock(message.receivedAt)}
          </span>
        </div>
        <h3>{message.subject}</h3>
        <p className="calvoro-tm-viewer-from">
          From: <strong>{message.from}</strong>
        </p>
      </header>

      <CodeChips codes={message.codes} onCopied={onCopied} />

      {showHtml && (
        <div className="calvoro-tm-tabs" role="tablist" aria-label="Message format">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "text"}
            className={tab === "text" ? "is-active" : ""}
            onClick={() => setTab("text")}
          >
            Text
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "html"}
            className={tab === "html" ? "is-active" : ""}
            onClick={() => setTab("html")}
          >
            HTML
          </button>
        </div>
      )}

      <div className="calvoro-tm-viewer-body">
        {tab === "html" && showHtml ? (
          <iframe
            className="calvoro-tm-iframe"
            title="Email message content"
            sandbox=""
            srcDoc={iframeHtml}
          />
        ) : (
          <pre className="calvoro-tm-text">{message.text || "This message has no text content."}</pre>
        )}
      </div>

      {message.demo && (
        <p className="calvoro-tm-viewer-demo-note">
          This is a simulated DEMO message. It was not received from the
          internet.
        </p>
      )}
    </div>
  );
}

function restoreInitialState() {
  const stored = readStoredSession();

  if (!stored) {
    return { session: null, messages: [], active: null };
  }

  if (stored.source !== "local") {
    return { session: stored, messages: [], active: null };
  }

  const demoMessages = buildDemoMessages().map((message) => ({
    ...message,
    codes: extractVerificationCodes(message.text),
  }));

  return {
    session: stored,
    messages: demoMessages,
    active: demoMessages[0] || null,
  };
}

function TemporaryEmailClient() {
  const [initialState] = useState(restoreInitialState);
  const [session, setSession] = useState(initialState.session);
  const [messages, setMessages] = useState(initialState.messages);
  const [active, setActive] = useState(initialState.active);
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const sessionRef = useRef(null);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const showNotice = useCallback((text) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2500);
  }, []);

  useEffect(() => {
    trackEvent("temp_mail_page_view");

    const ticker = window.setInterval(
      () => setNow(Date.now()),
      1000
    );

    return () => window.clearInterval(ticker);
  }, []);

  const refreshInbox = useCallback(
    async (source) => {
      const current = source || sessionRef.current;

      if (!current || current.source !== "api") return;

      setRefreshing(true);

      try {
        const data = await fetchRemoteInbox(current.id, current.token);

        if (!data) {
          const expired =
            current.expiresAt && Date.now() >= current.expiresAt;

          if (expired) {
            clearStoredSession();
            setSession(null);
            setMessages([]);
            setActive(null);
          } else {
            setError("The inbox could not be reached. It will retry automatically.");
          }

          return;
        }

        setMessages(
          data.messages.map((message) => ({
            ...message,
          }))
        );

        const refreshedSession = {
          ...current,
          expiresAt: data.mailbox?.expiresAt || current.expiresAt,
          delivery: data.mailbox?.delivery || current.delivery,
        };

        setSession(refreshedSession);
        storeSession(refreshedSession);
        setError("");
      } catch {
        setError("The inbox could not be reached. It will retry automatically.");
      } finally {
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!sessionRef.current || sessionRef.current.source !== "api") return;

    const initial = window.setTimeout(() => refreshInbox(), 0);

    const poller = window.setInterval(() => {
      refreshInbox();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(poller);
    };
  }, [session?.id, session?.source, refreshInbox]);

  const openMessage = useCallback(
    async (summary) => {
      const current = sessionRef.current;

      if (!current) return;

      trackEvent("temp_mail_message_open");

      if (current.source === "local") {
        const full = messages.find(
          (message) => message.id === summary.id
        );

        if (full) {
          setActive({ ...full, read: true });
          setMessages((previous) =>
            previous.map((message) =>
              message.id === summary.id
                ? { ...message, read: true }
                : message
            )
          );
        }

        return;
      }

      setViewerLoading(true);

      try {
        const message = await fetchRemoteMessage(
          current.id,
          current.token,
          summary.id
        );

        if (message) {
          setActive(message);
          setMessages((previous) =>
            previous.map((entry) =>
              entry.id === summary.id ? { ...entry, read: true } : entry
            )
          );
        } else {
          setError("That message could not be opened.");
        }
      } catch {
        setError("That message could not be opened.");
      } finally {
        setViewerLoading(false);
      }
    },
    [messages]
  );

  const generate = useCallback(async () => {
    setBusy(true);
    setError("");

    const remote = await createRemoteMailbox();

    if (remote) {
      const newSession = sessionFromMailbox(remote, "api");

      setSession(newSession);
      storeSession(newSession);
      setMessages([]);
      setActive(null);
      setBusy(false);
      trackEvent("temp_mail_generate");
      return;
    }

    const mailbox = generateMailbox();
    const newSession = sessionFromMailbox(mailbox, "local");
    const demoMessages = buildDemoMessages().map((message) => ({
      ...message,
      codes: extractVerificationCodes(message.text),
    }));

    setSession(newSession);
    storeSession(newSession);
    setMessages(demoMessages);
    setActive(demoMessages[0] || null);
    setBusy(false);
    trackEvent("temp_mail_generate");
  }, []);

  const regenerate = useCallback(async () => {
    const current = sessionRef.current;

    if (current?.source === "api") {
      try {
        await deleteRemoteMailbox(current.id, current.token);
      } catch {
        // The old mailbox may already be gone.
      }
    }

    clearStoredSession();
    setSession(null);
    setMessages([]);
    setActive(null);
    await generate();
  }, [generate]);

  const removeMailbox = useCallback(async () => {
    const current = sessionRef.current;

    if (current?.source === "api") {
      try {
        await deleteRemoteMailbox(current.id, current.token);
      } catch {
        // Even if the server call fails, clear the local session.
      }
    }

    clearStoredSession();
    setSession(null);
    setMessages([]);
    setActive(null);
    setError("");
    trackEvent("temp_mail_delete");
  }, []);

  const copyAddress = useCallback(async () => {
    if (!session) return;

    const copied = await copyText(session.address);

    showNotice(
      copied
        ? "Address copied to the clipboard."
        : "Copy was blocked by the browser."
    );
  }, [session, showNotice]);

  const remainingMs = session
    ? session.expiresAt - now
    : 0;
  const expired = Boolean(session) && remainingMs <= 0;

  return (
    <div className="calvoro-tm-client">
      {!session ? (
        <section className="calvoro-tm-welcome" aria-labelledby="calvoro-tm-welcome-heading">
          <span className="calvoro-tm-welcome-icon" aria-hidden="true">
            <Mail size={30} strokeWidth={1.7} />
          </span>
          <h2 id="calvoro-tm-welcome-heading">
            Generate a free temporary email address
          </h2>
          <p>
            Get a disposable address for signups and verification emails.
            Your real inbox stays private, and the temporary mailbox
            expires automatically.
          </p>
          <button
            type="button"
            className="calvoro-tm-primary-button"
            onClick={generate}
            disabled={busy}
          >
            {busy ? (
              <Loader2 size={18} className="calvoro-tm-spin" aria-hidden="true" />
            ) : (
              <Zap size={18} aria-hidden="true" />
            )}
            {busy ? "Generating…" : "Generate Free Email"}
          </button>
          <p className="calvoro-tm-welcome-note">
            No account needed. The address is created for this browser
            session and expires after 60 minutes.
          </p>
        </section>
      ) : (
        <>
          <section
            className="calvoro-tm-address-card"
            aria-label="Your temporary email address"
          >
            <div className="calvoro-tm-address-main">
              <span className="calvoro-tm-address-label">
                Your temporary address
              </span>
              <div className="calvoro-tm-address-row">
                <strong className="calvoro-tm-address">{session.address}</strong>
                <button
                  type="button"
                  className="calvoro-tm-copy-button"
                  onClick={copyAddress}
                  aria-label="Copy email address to clipboard"
                >
                  <Copy size={16} aria-hidden="true" />
                  Copy
                </button>
              </div>
              <div className="calvoro-tm-address-meta">
                {session.delivery === "live" && !expired ? (
                  <span className="calvoro-tm-status calvoro-tm-status-live">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    Connected
                  </span>
                ) : expired ? (
                  <span className="calvoro-tm-status calvoro-tm-status-expired">
                    <AlertTriangle size={14} aria-hidden="true" />
                    Expired
                  </span>
                ) : (
                  <span className="calvoro-tm-status calvoro-tm-status-demo">
                    <AlertTriangle size={14} aria-hidden="true" />
                    Demo mode
                  </span>
                )}
                {!expired && (
                  <span className="calvoro-tm-expiry">
                    <Clock size={14} aria-hidden="true" />
                    Expires in {formatCountdown(remainingMs)}
                  </span>
                )}
              </div>
            </div>

            <div className="calvoro-tm-address-actions">
              <button
                type="button"
                className="calvoro-tm-outline-button"
                onClick={regenerate}
                disabled={busy}
              >
                <RefreshCw size={16} aria-hidden="true" />
                New address
              </button>
              <button
                type="button"
                className="calvoro-tm-danger-button"
                onClick={removeMailbox}
              >
                <Trash2 size={16} aria-hidden="true" />
                Delete
              </button>
            </div>
          </section>

          {session.delivery !== "live" && !expired && (
            <div className="calvoro-tm-banner calvoro-tm-banner-demo" role="status">
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                Demo mode: this mailbox cannot receive real email yet.
                Every message below is a simulated DEMO message.
              </span>
            </div>
          )}

          {expired && (
            <div className="calvoro-tm-banner calvoro-tm-banner-expired" role="status">
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                This mailbox has expired and can no longer receive
                messages. Generate a new address to continue.
              </span>
            </div>
          )}

          {error && (
            <div className="calvoro-tm-banner calvoro-tm-banner-error" role="alert">
              <AlertTriangle size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="calvoro-tm-layout">
            <section className="calvoro-tm-inbox-pane" aria-label="Inbox">
              <header className="calvoro-tm-inbox-header">
                <h2>Inbox</h2>
                <span className="calvoro-tm-inbox-count">
                  {messages.length} {messages.length === 1 ? "message" : "messages"}
                </span>
                <button
                  type="button"
                  className="calvoro-tm-refresh-button"
                  onClick={() => {
                    trackEvent("temp_mail_refresh");

                    if (session.source === "local") {
                      showNotice(
                        "Demo mode: this inbox only contains simulated DEMO messages."
                      );
                      return;
                    }

                    refreshInbox();
                  }}
                  disabled={refreshing}
                  aria-label="Refresh inbox"
                >
                  <RefreshCw
                    size={16}
                    className={refreshing ? "calvoro-tm-spin" : ""}
                    aria-hidden="true"
                  />
                </button>
              </header>

              {session.source === "api" && !expired && (
                <p className="calvoro-tm-auto-refresh-note">
                  Checks automatically every 15 seconds.
                </p>
              )}

              <InboxMessageList
                messages={messages}
                activeId={active?.id}
                onSelect={openMessage}
              />
            </section>

            <MessageViewer
              key={active?.id ?? "placeholder"}
              message={active}
              loading={viewerLoading}
              onCopied={showNotice}
            />
          </div>

          <p className="calvoro-tm-notice" aria-live="polite">
            {notice}
          </p>
        </>
      )}
    </div>
  );
}

function TemporaryEmailSeoContent() {
  return (
    <section className="calvoro-tm-seo" aria-labelledby="calvoro-tm-seo-heading">
      <div className="calvoro-tool-container">
        <div className="calvoro-tm-seo-heading">
          <span className="calvoro-tool-kicker">About this tool</span>
          <h2 id="calvoro-tm-seo-heading">
            What is a temporary email address?
          </h2>
        </div>

        <div className="calvoro-tm-seo-columns">
          <div>
            <p>
              A temporary email address (also called temp mail or a
              disposable email address) is a short-lived mailbox you can
              use instead of your personal email. It receives messages
              like any other inbox — verification codes, confirmation
              links, and one-time signup emails — and then disappears
              after a set time.
            </p>
            <p>
              People use temporary inboxes to keep newsletters, trial
              signups, and services that require an email address away
              from their primary inbox. Because the address expires,
              spam sent to it later reaches nobody.
            </p>
            <p>
              In CALVORO, the address is generated for your browser
              session. The inbox shows the sender, subject, and received
              time of each message, and verification codes found inside
              a message are extracted and shown as copyable chips.
            </p>
          </div>

          <div className="calvoro-tm-seo-card">
            <h3>How to use the CALVORO temporary inbox</h3>
            <ol>
              <li>
                Press <strong>Generate Free Email</strong> to create an
                address.
              </li>
              <li>Copy the address and use it on the signup form.</li>
              <li>
                Open the inbox here and read the incoming message.
              </li>
              <li>
                Copy the verification code and finish your signup.
              </li>
              <li>
                Delete the mailbox when you are done, or let it expire
                automatically after {MAILBOX_TTL_MS / 60_000} minutes.
              </li>
            </ol>
          </div>
        </div>

        <div className="calvoro-tm-faq">
          <h3>Frequently asked questions</h3>

          <details>
            <summary>Is a temporary email address free?</summary>
            <p>
              Yes. The CALVORO Temporary Email tool is free to use. It is
              designed for receiving short-lived mail such as verification
              codes, not for important or personal correspondence.
            </p>
          </details>

          <details>
            <summary>How long does a temporary mailbox last?</summary>
            <p>
              A CALVORO temporary mailbox lasts 60 minutes from the moment
              it is created. The remaining time is shown next to the
              address. When the time runs out, the mailbox and its
              messages are discarded.
            </p>
          </details>

          <details>
            <summary>Can I receive real emails with this address?</summary>
            <p>
              The tool is currently in demo mode, which means the inbox
              shows clearly labeled DEMO messages and cannot yet receive
              mail from the internet. The message flow is built so real
              inbound delivery can be switched on once the mail routing
              for the CALVORO domain is configured.
            </p>
          </details>

          <details>
            <summary>What should I use a temporary email for?</summary>
            <p>
              Common uses include receiving one-time verification codes,
              trying a service without sharing your personal address,
              and signing up for something you expect to use only once.
              Do not use a temporary address for banking, government, or
              anything you need to access later.
            </p>
          </details>

          <details>
            <summary>Do not use it for important accounts</summary>
            <p>
              Because temporary mailboxes expire, you cannot recover an
              account that is tied to one. If a service only lets you
              reset a password through the original address, a
              temporary address will stop working after it expires.
            </p>
          </details>

          <details>
            <summary>Is HTML email displayed safely?</summary>
            <p>
              Yes. Message HTML is sanitized to a safe subset of tags,
              scripts and tracking elements are removed, and the result
              is rendered inside a sandboxed frame that cannot run
              scripts. Links open in a new tab only when you click them.
            </p>
          </details>

          <details>
            <summary>Where are the messages stored?</summary>
            <p>
              Messages for a live mailbox are stored with CALVORO only
              while the mailbox exists, and they are deleted when the
              mailbox expires or when you press Delete. In demo mode,
              sample messages are generated locally in your browser.
            </p>
          </details>
        </div>

        <div className="calvoro-tm-seo-links">
          <Link to="/ai-email-writer" className="calvoro-secondary-button">
            Need to write an email? Try the AI Email Writer
          </Link>
          <Link to="/password-generator" className="calvoro-secondary-button">
            Generate a strong password
          </Link>
          <Link to="/privacy-policy" className="calvoro-secondary-button">
            Read the privacy policy
          </Link>
          <Link to="/tools" className="calvoro-secondary-button">
            Browse all CALVORO tools
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function TemporaryEmail() {
  return (
    <>
      <ToolPage
        title="Temporary Email"
        kicker="Email tool"
        description="Generate a free disposable email address, read incoming messages in a temporary inbox, and copy verification codes without exposing your personal email."
        seoTitle="Free Temporary Email – Receive Emails Online | CALVORO"
        seoDescription="Generate a free temporary email address with CALVORO. Receive verification emails, read messages online, and protect your personal inbox."
        steps={[
          "Generate an address and copy it.",
          "Use it on any signup form.",
          "Read the incoming message in this inbox.",
          "Copy the verification code, then delete the mailbox.",
        ]}
        notes={[
          "Mailboxes expire 60 minutes after creation, and every message is deleted with them.",
          "Messages marked DEMO are simulated samples, not mail received from the internet.",
          "Do not use a temporary address for accounts you need to recover later.",
        ]}
        related={[
          { name: "AI Email Writer", path: "/ai-email-writer" },
          { name: "Password Generator", path: "/password-generator" },
          { name: "Word Counter", path: "/word-counter" },
        ]}
        privacyBadge="Mailbox-based tool. Demo mode runs entirely in this browser tab."
        privacyNote="Your temporary address is only shown in this browser tab. Verification-code extraction happens on the message text and no analytics collect email contents, addresses, or message text."
      >
        <TemporaryEmailClient />
      </ToolPage>

      <TemporaryEmailSeoContent />
    </>
  );
}
