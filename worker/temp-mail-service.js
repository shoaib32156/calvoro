import {
  MAX_MESSAGES_PER_MAILBOX,
  buildDemoMessages,
  extractVerificationCodes,
  generateMailbox,
  isMailboxExpired,
  parseRawEmail,
  randomHex,
} from "../src/tools/tempMailCore.js";

const MEMORY_STORE = new Map();
const MEMORY_STORE_CAP = 400;

// Cloudflare KV rejects expirationTtl below 60 seconds. Any record whose
// remaining lifetime is under a minute must be guarded by callers instead
// of relying on the floor, so records never outlive their mailbox.
const MIN_KV_TTL_MS = 60_000;

export class TempMailError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "TempMailError";
    this.statusCode = statusCode;
  }
}

// Storage adapter: Cloudflare KV when a TEMP_MAIL_KV binding exists,
// otherwise an in-memory Map whose contents do not survive deploys.
// Memory mode is explicitly reported to the client as demo delivery.
function createStore(env) {
  const kv = env?.TEMP_MAIL_KV;

  if (kv && typeof kv.get === "function" && typeof kv.put === "function") {
    return {
      kind: "kv",
      async get(key) {
        try {
          return await kv.get(key, "json");
        } catch {
          return null;
        }
      },
      async put(key, value) {
        const expirationTtl = Math.ceil(
          (value?.expiresAt ? value.expiresAt - Date.now() : 60 * 60 * 1000) /
            1000
        );

        await kv.put(key, JSON.stringify(value), {
          expirationTtl: Math.max(60, expirationTtl),
        });
      },
      async delete(key) {
        try {
          await kv.delete(key);
        } catch {
          // Missing keys are fine to ignore.
        }
      },
    };
  }

  return {
    kind: "memory",
    async get(key) {
      return MEMORY_STORE.get(key) ?? null;
    },
    async put(key, value) {
      if (MEMORY_STORE.size >= MEMORY_STORE_CAP) {
        const oldest = MEMORY_STORE.keys().next().value;

        if (oldest) MEMORY_STORE.delete(oldest);
      }

      MEMORY_STORE.set(key, value);
    },
    async delete(key) {
      MEMORY_STORE.delete(key);
    },
  };
}

function mailboxKey(mailboxId) {
  return `mailbox:${mailboxId}`;
}

function mailboxIndexKey(localPart) {
  return `mailbox:index:${String(localPart).toLowerCase()}`;
}

function messageKey(mailboxId, messageId) {
  return `message:${mailboxId}:${messageId}`;
}

async function readMailbox(store, mailboxId) {
  const mailbox = await store.get(mailboxKey(mailboxId));

  if (!mailbox || isMailboxExpired(mailbox)) {
    return null;
  }

  return mailbox;
}

function assertAccess(mailbox, mailboxId, token) {
  if (!mailbox) {
    throw new TempMailError(404, "That mailbox no longer exists.");
  }

  if (mailbox.id !== mailboxId || mailbox.token !== token) {
    throw new TempMailError(
      403,
      "That mailbox belongs to a different visitor."
    );
  }
}

async function seedDemoMessages(store, mailbox) {
  const messages = buildDemoMessages();
  const messageIds = [];

  for (const message of messages) {
    await store.put(messageKey(mailbox.id, message.id), {
      ...message,
      mailboxId: mailbox.id,
      expiresAt: mailbox.expiresAt,
    });
    messageIds.push(message.id);
  }

  return messageIds;
}

export async function createTempMailbox(env) {
  const store = createStore(env);
  const mailbox = { ...generateMailbox() };

  mailbox.messageIds = [];

  if (store.kind === "memory") {
    mailbox.messageIds = await seedDemoMessages(store, mailbox);
  }

  mailbox.delivery = store.kind === "kv" ? "live" : "demo";
  await store.put(mailboxKey(mailbox.id), mailbox);
  await store.put(mailboxIndexKey(mailbox.local), {
    mailboxId: mailbox.id,
    expiresAt: mailbox.expiresAt,
  });

  return {
    id: mailbox.id,
    token: mailbox.token,
    address: mailbox.address,
    createdAt: mailbox.createdAt,
    expiresAt: mailbox.expiresAt,
    delivery: mailbox.delivery,
  };
}

export async function listTempMailInbox(env, mailboxId, token) {
  const store = createStore(env);
  const mailbox = await readMailbox(store, mailboxId);

  assertAccess(mailbox, mailboxId, token);

  const messages = [];

  for (const messageId of mailbox.messageIds || []) {
    const message = await store.get(messageKey(mailboxId, messageId));

    if (message) {
      messages.push({
        id: message.id,
        from: message.from,
        subject: message.subject,
        receivedAt: message.receivedAt,
        read: Boolean(message.read),
        demo: Boolean(message.demo),
      });
    }
  }

  messages.sort((a, b) =>
    String(b.receivedAt || "").localeCompare(String(a.receivedAt || ""))
  );

  return {
    mailbox: {
      id: mailbox.id,
      address: mailbox.address,
      createdAt: mailbox.createdAt,
      expiresAt: mailbox.expiresAt,
      delivery: mailbox.delivery,
    },
    messages,
  };
}

export async function getTempMailMessage(
  env,
  mailboxId,
  token,
  messageId
) {
  const store = createStore(env);
  const mailbox = await readMailbox(store, mailboxId);

  assertAccess(mailbox, mailboxId, token);

  const message = await store.get(messageKey(mailboxId, messageId));

  if (!message) {
    throw new TempMailError(404, "That message no longer exists.");
  }

  if (!message.read) {
    message.read = true;

    // KV's 60-second minimum TTL would push a re-put past the mailbox
    // expiry in the final minute, so skip persisting the read flag then.
    if (mailbox.expiresAt - Date.now() >= MIN_KV_TTL_MS) {
      await store.put(messageKey(mailboxId, messageId), message);
    }
  }

  return {
    id: message.id,
    from: message.from,
    subject: message.subject,
    receivedAt: message.receivedAt,
    read: true,
    demo: Boolean(message.demo),
    text: message.text || "",
    html: message.html || "",
    codes: extractVerificationCodes(message.text || ""),
  };
}

export async function deleteTempMailbox(env, mailboxId, token) {
  const store = createStore(env);
  const mailbox = await readMailbox(store, mailboxId);

  assertAccess(mailbox, mailboxId, token);

  for (const messageId of mailbox.messageIds || []) {
    await store.delete(messageKey(mailboxId, messageId));
  }

  await store.delete(mailboxKey(mailboxId));
  await store.delete(mailboxIndexKey(mailbox.local));
}

// Inbound ingestion for the future Email Worker. Only messages addressed
// to an existing, unexpired mailbox are stored; everything else is
// dropped so no cross-visitor data is ever retained.
export async function ingestInboundEmail(
  env,
  rawMessage,
  recipientLocalPart
) {
  const store = createStore(env);
  const index = await store.get(mailboxIndexKey(recipientLocalPart));

  if (!index?.mailboxId) return { accepted: false };

  const mailbox = await readMailbox(store, index.mailboxId);

  if (!mailbox) return { accepted: false };

  // A message stored in the mailbox's final minute would need a KV TTL
  // below the 60-second platform minimum, so it is rejected instead of
  // stored with a lifetime longer than the mailbox itself.
  if (mailbox.expiresAt - Date.now() < MIN_KV_TTL_MS) {
    return { accepted: false, reason: "mailbox expiring" };
  }

  const messageIds = mailbox.messageIds || [];

  if (messageIds.length >= MAX_MESSAGES_PER_MAILBOX) {
    return { accepted: false, reason: "mailbox full" };
  }

  const parsed = parseRawEmail(rawMessage);

  if (!parsed.text && !parsed.html) {
    return { accepted: false, reason: "empty message" };
  }

  const message = {
    id: randomHex(16),
    mailboxId: mailbox.id,
    from: parsed.from,
    subject: parsed.subject,
    receivedAt: parsed.receivedAt || new Date().toISOString(),
    read: false,
    demo: false,
    text: parsed.text,
    html: parsed.html,
    expiresAt: mailbox.expiresAt,
  };

  await store.put(messageKey(mailbox.id, message.id), message);

  mailbox.messageIds = [...messageIds, message.id];
  await store.put(mailboxKey(mailbox.id), mailbox);

  return { accepted: true };
}
