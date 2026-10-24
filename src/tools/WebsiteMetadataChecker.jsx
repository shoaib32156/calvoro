import { useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

const CHECK_LABELS = {
  pass: "Pass",
  warn: "Review",
  fail: "Fix",
  info: "Note",
};

function withScheme(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildChecks(result) {
  const metadata = result.metadata;
  const checks = [];
  const add = (state, label, detail) => {
    checks.push({ state, label, detail });
  };

  if (result.status >= 200 && result.status < 300) {
    add("pass", "Page responds", `The page returned HTTP ${result.status}.`);
  } else {
    add(
      "fail",
      "Page responds",
      `The page returned HTTP ${result.status}. Search engines may not index an error page.`
    );
  }

  if (result.finalUrl.startsWith("https://")) {
    add("pass", "HTTPS", "The final URL uses HTTPS.");
  } else {
    add(
      "warn",
      "HTTPS",
      "The final URL uses HTTP. Browsers and search engines prefer a secure connection."
    );
  }

  if (!metadata.title) {
    add("fail", "Title tag", "No title element was found in the HTML.");
  } else if (metadata.title.length < 30) {
    add(
      "warn",
      "Title tag",
      `The title is ${metadata.title.length} characters. It may be shorter than the usual 30-60 character range.`
    );
  } else if (metadata.title.length > 60) {
    add(
      "warn",
      "Title tag",
      `The title is ${metadata.title.length} characters. Search results may truncate it.`
    );
  } else {
    add(
      "pass",
      "Title tag",
      `The title is ${metadata.title.length} characters.`
    );
  }

  if (!metadata.description) {
    add(
      "fail",
      "Meta description",
      "No meta description was found. Search engines may write their own snippet."
    );
  } else if (metadata.description.length < 70) {
    add(
      "warn",
      "Meta description",
      `The description is ${metadata.description.length} characters. It may be shorter than the usual 70-160 character range.`
    );
  } else if (metadata.description.length > 160) {
    add(
      "warn",
      "Meta description",
      `The description is ${metadata.description.length} characters. Search results may truncate it.`
    );
  } else {
    add(
      "pass",
      "Meta description",
      `The description is ${metadata.description.length} characters.`
    );
  }

  if (!metadata.canonical) {
    add(
      "warn",
      "Canonical URL",
      "No canonical link was found. Search engines will choose a canonical URL themselves."
    );
  } else {
    add("pass", "Canonical URL", "A canonical link is present.");
  }

  const robotsText = `${metadata.robots} ${result.xRobotsTag}`.toLowerCase();

  if (robotsText.includes("noindex")) {
    add(
      "fail",
      "Indexing",
      "The page asks search engines not to index it with a noindex directive."
    );
  } else {
    add("pass", "Indexing", "No noindex directive was found.");
  }

  if (!metadata.viewport) {
    add(
      "warn",
      "Viewport",
      "No viewport meta tag was found. The page may not adapt well to mobile screens."
    );
  } else {
    add("pass", "Viewport", "A viewport meta tag is present.");
  }

  if (!metadata.lang) {
    add(
      "warn",
      "Page language",
      "The html element has no lang attribute. Screen readers and search engines may guess the language."
    );
  } else {
    add("pass", "Page language", `The page declares lang="${metadata.lang}".`);
  }

  if (metadata.h1Count === 1) {
    add("pass", "Main heading", "The page has one H1 heading.");
  } else if (metadata.h1Count === 0) {
    add("fail", "Main heading", "No H1 heading was found.");
  } else {
    add(
      "warn",
      "Main heading",
      `The page has ${metadata.h1Count} H1 headings. A single main heading is easier to follow.`
    );
  }

  const openGraphCount = [
    metadata.og.title,
    metadata.og.description,
    metadata.og.image,
  ].filter(Boolean).length;

  if (openGraphCount === 0) {
    add(
      "warn",
      "Social preview",
      "No Open Graph title, description, or image was found."
    );
  } else if (!metadata.og.image) {
    add(
      "warn",
      "Social preview",
      "Open Graph text is present, but no preview image was found."
    );
  } else {
    add("pass", "Social preview", "Open Graph title, description, and image were found.");
  }

  if (!metadata.twitter.card) {
    add(
      "warn",
      "Twitter card",
      "No twitter:card tag was found. X may fall back to a basic link preview."
    );
  } else {
    add("pass", "Twitter card", `The card type is "${metadata.twitter.card}".`);
  }

  if (metadata.jsonLdCount === 0) {
    add(
      "info",
      "Structured data",
      "No JSON-LD blocks were found. Structured data is optional, but it can help search engines understand the page."
    );
  } else {
    add(
      "pass",
      "Structured data",
      `${metadata.jsonLdCount} JSON-LD block${metadata.jsonLdCount === 1 ? "" : "s"} found.`
    );
  }

  return checks;
}

function MetadataRow({ label, value, href, note }) {
  return (
    <div className="calvoro-metadata-row">
      <dt>{label}</dt>
      <dd>
        {value ? (
          href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          ) : (
            <span>{value}</span>
          )
        ) : (
          <span className="calvoro-metadata-missing">Not found</span>
        )}
        {note ? <small>{note}</small> : null}
      </dd>
    </div>
  );
}

function MetadataChecks({ checks }) {
  const failures = checks.filter((check) => check.state === "fail").length;
  const warnings = checks.filter((check) => check.state === "warn").length;

  return (
    <section
      className="calvoro-metadata-section"
      aria-labelledby="metadata-checks-heading"
    >
      <div className="calvoro-metadata-section-head">
        <h3 id="metadata-checks-heading">Checks</h3>
        <span className="calvoro-metadata-count">
          {failures} to fix · {warnings} to review
        </span>
      </div>

      <ul className="calvoro-metadata-checks">
        {checks.map((check) => (
          <li
            className={`calvoro-metadata-check is-${check.state}`}
            key={`${check.state}-${check.label}`}
          >
            <span className="calvoro-metadata-check-state">
              {CHECK_LABELS[check.state]}
            </span>
            <div>
              <strong>{check.label}</strong>
              <p>{check.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function WebsiteMetadataChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(
    "Enter a public page URL to inspect its title, description, social tags, and indexing hints."
  );
  const [tone, setTone] = useState("info");

  const checks = result ? buildChecks(result) : [];
  const hasOpenGraph = result
    ? Boolean(
        result.metadata.og.title ||
          result.metadata.og.description ||
          result.metadata.og.image
      )
    : false;
  const hasTwitter = result
    ? Boolean(
        result.metadata.twitter.card ||
          result.metadata.twitter.title ||
          result.metadata.twitter.description
      )
    : false;

  const checkUrl = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    const candidate = withScheme(url);

    if (!candidate) {
      setTone("error");
      setStatus("Enter a website URL to check.");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20_000);

    setIsLoading(true);
    setResult(null);
    setTone("info");
    setStatus("Fetching the page and reading its metadata…");

    try {
      const response = await fetch("/api/site-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: candidate }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || `The check failed (HTTP ${response.status}).`
        );
      }

      if (!data?.metadata) {
        throw new Error("The server returned an incomplete result.");
      }

      setResult(data);
      setTone("success");
      setStatus("Metadata collected. Review the checks and the groups below.");
    } catch (error) {
      if (error?.name === "AbortError") {
        setTone("error");
        setStatus("The check timed out. Try a smaller or faster page.");
      } else {
        setTone("error");
        setStatus(
          error instanceof Error
            ? error.message
            : "The metadata check failed."
        );
      }
    } finally {
      window.clearTimeout(timer);
      setIsLoading(false);
    }
  };

  const copyReport = async () => {
    if (!result) return;

    const copied = await copyText(JSON.stringify(result, null, 2));
    setTone(copied ? "success" : "error");
    setStatus(
      copied
        ? "The metadata report was copied as JSON."
        : "Copy was blocked by the browser."
    );
  };

  const downloadReport = () => {
    if (!result) return;

    downloadBlob(
      new Blob([JSON.stringify(result, null, 2)], {
        type: "application/json;charset=utf-8",
      }),
      "calvoro-metadata-check.json"
    );
    setTone("success");
    setStatus("The metadata report was downloaded as JSON.");
  };

  return (
    <ToolPage
      title="Website Metadata Checker"
      kicker="SEO tool"
      description="Inspect a public page's title, description, canonical URL, social preview tags, headings, and indexing hints in one report."
      seoTitle="Website Metadata Checker - Audit Titles and Social Tags | CALVORO"
      seoDescription="Check a public web page's title, meta description, canonical URL, Open Graph and Twitter tags, headings, and robots hints. No account required."
      privacyBadge="CALVORO fetches the public page from its server. Page contents are not stored."
      privacyNote="The URL you enter is sent to CALVORO's Cloudflare Worker. Before requesting the page, the Worker resolves its hostname through Cloudflare DNS and rejects private, loopback, and reserved destinations. The target website will see a request from Cloudflare. CALVORO does not store the fetched page, forward cookies, or send credentials. Checks are briefly rate-limited by IP address."
      steps={[
        "Paste the full URL of a public page, including https://.",
        "Run the check and review the pass, review, and fix items.",
        "Compare the search, social, and structure fields with what the page should show.",
      ]}
      notes={[
        "The checker reads raw HTML from the final page response. Metadata inserted later by JavaScript may not appear in the report.",
        "Pages behind a login, a paywall, or bot protection may return an error or a challenge page instead of the content visitors see.",
        "Social platforms and search engines cache previews. Updating tags does not instantly change an existing preview.",
        "A passing metadata check does not guarantee rankings, rich results, or ad approval. It only confirms that common tags are present and readable.",
        "Only public HTTP and HTTPS pages on ports 80 and 443 are supported. Each redirect is revalidated against the same destination rules, and more than three redirects are rejected.",
        "The checker resolves the hostname through Cloudflare DNS before each request but cannot pin the IP address used by the connection. A hostname that changes its DNS answer after validation is a residual risk.",
      ]}
      related={[
        { name: "Word and Character Counter", path: "/word-counter" },
        { name: "Color Palette Generator", path: "/color-palette-generator" },
        { name: "Markdown Previewer", path: "/markdown-previewer" },
      ]}
    >
      <form className="calvoro-metadata-form" onSubmit={checkUrl}>
        <div className="calvoro-field">
          <label htmlFor="metadata-url">Public page URL</label>
          <div className="calvoro-field-row">
            <input
              id="metadata-url"
              className="calvoro-metadata-url"
              type="text"
              inputMode="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/page"
              spellCheck="false"
              autoComplete="url"
            />
            <button
              type="submit"
              className="calvoro-tool-button"
              disabled={isLoading}
            >
              {isLoading ? "Checking…" : "Check metadata"}
            </button>
          </div>
          <span className="calvoro-field-hint">
            Only public HTML pages can be checked. Add https:// if the browser
            does not.
          </span>
        </div>
      </form>

      <p
        className={`calvoro-tool-status ${
          tone === "success"
            ? "is-success"
            : tone === "error"
              ? "is-error"
              : tone === "warning"
                ? "is-warning"
                : ""
        }`}
        aria-live="polite"
      >
        {status}
      </p>

      {result && (
        <div className="calvoro-metadata-results">
          <section className="calvoro-metadata-summary">
            <span className="calvoro-metadata-kicker">Checked page</span>
            <h2>{result.metadata.title || "Untitled page"}</h2>
            <a
              href={result.finalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.finalUrl}
            </a>

            <div className="calvoro-metadata-pills">
              <span>HTTP {result.status}</span>
              <span>{result.elapsedMs} ms</span>
              <span>
                {result.metadata.h1Count} H1 · {result.metadata.h2Count} H2
              </span>
            </div>

            <div className="calvoro-tool-actions">
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={copyReport}
              >
                Copy JSON report
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={downloadReport}
              >
                Download JSON
              </button>
            </div>
          </section>

          <MetadataChecks checks={checks} />

          <section
            className="calvoro-metadata-section"
            aria-labelledby="metadata-search-heading"
          >
            <h3 id="metadata-search-heading">Search and indexing</h3>
            <dl className="calvoro-metadata-list">
              <MetadataRow
                label="Title"
                value={result.metadata.title}
                note={
                  result.metadata.title
                    ? `${result.metadata.title.length} characters`
                    : ""
                }
              />
              <MetadataRow
                label="Description"
                value={result.metadata.description}
                note={
                  result.metadata.description
                    ? `${result.metadata.description.length} characters`
                    : ""
                }
              />
              <MetadataRow
                label="Canonical"
                value={result.metadata.canonical}
                href={result.metadata.canonical}
              />
              <MetadataRow
                label="Robots meta"
                value={result.metadata.robots}
              />
              <MetadataRow
                label="X-Robots-Tag"
                value={result.xRobotsTag}
              />
              <MetadataRow
                label="Viewport"
                value={result.metadata.viewport}
              />
              <MetadataRow
                label="Language"
                value={result.metadata.lang}
              />
              <MetadataRow
                label="Favicon"
                value={result.metadata.favicon}
                href={result.metadata.favicon}
              />
            </dl>
          </section>

          <section
            className="calvoro-metadata-section"
            aria-labelledby="metadata-social-heading"
          >
            <h3 id="metadata-social-heading">Social previews</h3>
            {!hasOpenGraph && (
              <p className="calvoro-inline-note">
                No Open Graph tags were found. Many platforms will build a
                preview from the page title and description instead.
              </p>
            )}
            <dl className="calvoro-metadata-list">
              <MetadataRow
                label="OG title"
                value={result.metadata.og.title}
              />
              <MetadataRow
                label="OG description"
                value={result.metadata.og.description}
              />
              <MetadataRow
                label="OG image"
                value={result.metadata.og.image}
                href={result.metadata.og.image}
              />
              <MetadataRow
                label="OG type"
                value={result.metadata.og.type}
              />
              <MetadataRow
                label="OG site name"
                value={result.metadata.og.siteName}
              />
            </dl>

            {!hasTwitter && (
              <p className="calvoro-inline-note">
                No Twitter card tags were found.
              </p>
            )}
            <dl className="calvoro-metadata-list">
              <MetadataRow
                label="Card"
                value={result.metadata.twitter.card}
              />
              <MetadataRow
                label="Twitter title"
                value={result.metadata.twitter.title}
              />
              <MetadataRow
                label="Twitter description"
                value={result.metadata.twitter.description}
              />
              <MetadataRow
                label="Twitter image"
                value={result.metadata.twitter.image}
                href={result.metadata.twitter.image}
              />
            </dl>
          </section>

          <section
            className="calvoro-metadata-section"
            aria-labelledby="metadata-structure-heading"
          >
            <h3 id="metadata-structure-heading">Page structure</h3>
            <dl className="calvoro-metadata-list">
              <MetadataRow
                label="First H1"
                value={result.metadata.h1}
                note={`${result.metadata.h1Count} H1 heading${
                  result.metadata.h1Count === 1 ? "" : "s"
                }`}
              />
              <MetadataRow
                label="H2 headings"
                value={String(result.metadata.h2Count)}
              />
              <MetadataRow
                label="JSON-LD"
                value={
                  result.metadata.jsonLdCount > 0
                    ? `${result.metadata.jsonLdCount} block${
                        result.metadata.jsonLdCount === 1 ? "" : "s"
                      }`
                    : ""
                }
                note={
                  result.metadata.jsonLdTypes.length > 0
                    ? result.metadata.jsonLdTypes.join(", ")
                    : ""
                }
              />
              <MetadataRow
                label="Content type"
                value={result.contentType}
              />
              <MetadataRow
                label="Content language"
                value={result.contentLanguage}
              />
            </dl>
          </section>

          {result.redirects.length > 0 && (
            <section
              className="calvoro-metadata-section"
              aria-labelledby="metadata-redirects-heading"
            >
              <h3 id="metadata-redirects-heading">Redirect chain</h3>
              <ol className="calvoro-metadata-redirects">
                {result.redirects.map((redirect) => (
                  <li key={`${redirect.from}-${redirect.to}`}>
                    <span>HTTP {redirect.status}</span>
                    <code>{redirect.from}</code>
                    <span aria-hidden="true">→</span>
                    <code>{redirect.to}</code>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      )}

      <p className="calvoro-inline-note">
        Previews and search snippets are decided by each platform. This tool
        reports what the page exposes; it cannot force a platform to use a
        particular title, image, or snippet.
      </p>
    </ToolPage>
  );
}
