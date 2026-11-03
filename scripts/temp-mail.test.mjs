import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  MAILBOX_TTL_MS,
  buildDemoMessages,
  extractVerificationCodes,
  generateMailbox,
  htmlToPlainText,
  isMailboxExpired,
  parseRawEmail,
  sanitizeEmailHtml,
} from "../src/tools/tempMailCore.js";
import {
  TempMailError,
  createTempMailbox,
  deleteTempMailbox,
  getTempMailMessage,
  ingestInboundEmail,
  listTempMailInbox,
} from "../worker/temp-mail-service.js";
import emailWorker from "../worker/email-worker.js";
import {
  getRouteMetadata,
  routeInventory,
} from "../src/routeMetadata.js";
import { utilityTools } from "../src/calculatorCatalog.js";

const repoFile = (path) => new URL(`../${path}`, import.meta.url);

// ---------- Mailbox generation ----------

test("generateMailbox creates a random address with a 32-char id and 64-char token", () => {
  const mailbox = generateMailbox();

  assert.match(mailbox.address, /^[a-z]+\d{4}@calvorotool\.com$/);
  assert.match(mailbox.id, /^[0-9a-f]{32}$/);
  assert.match(mailbox.token, /^[0-9a-f]{64}$/);
  assert.equal(mailbox.expiresAt - mailbox.createdAt, MAILBOX_TTL_MS);

  const second = generateMailbox();
  assert.notEqual(second.id, mailbox.id);
  assert.notEqual(second.token, mailbox.token);
});

test("isMailboxExpired reflects the mailbox lifetime", () => {
  const mailbox = generateMailbox();

  assert.equal(
    isMailboxExpired(mailbox, mailbox.createdAt + MAILBOX_TTL_MS - 1),
    false
  );
  assert.equal(
    isMailboxExpired(mailbox, mailbox.createdAt + MAILBOX_TTL_MS),
    true
  );
  assert.equal(isMailboxExpired(null), true);
});

// ---------- HTML sanitizer ----------

test("sanitizeEmailHtml strips scripts, event handlers, and dangerous URLs", () => {
  const dirty = [
    '<script>alert("xss")</script>',
    '<img src="x" onerror="alert(1)">',
    '<a href="javascript:alert(1)">click</a>',
    '<a href="  JaVaScRiPt:alert(2)">click2</a>',
    '<iframe src="https://evil.example"></iframe>',
    "<object data='x'></object>",
    "<svg onload='alert(1)'></svg>",
    "<style>body{display:none}</style>",
    '<div style="background:url(https://tracker.example/pixel)">x</div>',
    '<div style="position:fixed;top:0">x</div>',
    '<p onclick="steal()">hello</p>',
  ].join("\n");

  const clean = sanitizeEmailHtml(dirty);

  assert.doesNotMatch(clean, /script/i);
  assert.doesNotMatch(clean, /onerror|onclick|onload/i);
  assert.doesNotMatch(clean, /javascript:/i);
  assert.doesNotMatch(clean, /iframe|object|svg|style>/i);
  assert.doesNotMatch(clean, /url\(/i);
  assert.doesNotMatch(clean, /position:\s*fixed/i);
  assert.match(clean, /hello/);
});

test("sanitizeEmailHtml keeps safe formatting and rewrites links", () => {
  const input =
    '<div style="color:#2563eb"><b>Bold</b> and <i>italic</i><br/>' +
    '<a href="https://example.com/verify?token=abc">Verify</a></div>';

  const clean = sanitizeEmailHtml(input);

  assert.match(clean, /<b>Bold<\/b>/);
  assert.match(clean, /<i>italic<\/i>/);
  assert.match(clean, /<br\s*\/>/);
  assert.match(clean, /color:#2563eb/i);
  assert.match(clean, /href="https:\/\/example\.com\/verify\?token=abc"/);
  assert.match(clean, /rel="noopener noreferrer nofollow"/);
  assert.match(clean, /target="_blank"/);
});

test("sanitizeEmailHtml escapes plain text and drops unknown attributes", () => {
  const clean = sanitizeEmailHtml(
    '1 < 2 & 3 > 2 <p data-secret="x">text</p>'
  );

  assert.match(clean, /1 &lt; 2 &amp; 3 &gt; 2/);
  assert.doesNotMatch(clean, /data-secret/);
});

test("htmlToPlainText converts sanitized HTML to readable text", () => {
  const text = htmlToPlainText(
    "<p>Hello</p><p>World</p><ul><li>One</li><li>Two</li></ul>"
  );

  assert.match(text, /Hello\nWorld/);
  assert.match(text, /- One/);
});

// ---------- Verification code extraction ----------

test("extractVerificationCodes finds labeled, dashed, and standalone codes", () => {
  const text =
    "Your verification code is 482913.\n" +
    "Security code: 739-201 for this login.\n" +
    "OTP 556677\n" +
    "Year of release: 2026 and 2027.";

  const codes = extractVerificationCodes(text);

  assert.ok(codes.includes("482913"));
  assert.ok(codes.includes("739201"));
  assert.ok(codes.includes("556677"));
  assert.ok(codes.length <= 5);
});

test("extractVerificationCodes deduplicates and skips trivial codes", () => {
  const codes = extractVerificationCodes(
    "code 123456 again code 123456 and 000000"
  );

  assert.equal(codes.filter((code) => code === "123456").length, 1);
  assert.ok(!codes.includes("000000"));
});

// ---------- MIME parser ----------

function multipartFixture() {
  return [
    "From: Demo Sender <sender@example.com>",
    "To: maple1234@calvorotool.com",
    "Subject: =?UTF-8?B?VmVyaWZ5IHlvdXIgYWNjb3VudA==?=",
    "Date: Wed, 03 Nov 2026 10:30:00 +0000",
    'Content-Type: multipart/alternative; boundary="frontier"',
    "",
    "--frontier",
    "Content-Type: text/plain; charset=utf-8",
    "",
    "Your code is 928374.",
    "--frontier",
    "Content-Type: text/html; charset=utf-8",
    "",
    "<html><body><p>Your code is <b>928374</b>.</p><script>bad()</script></body></html>",
    "--frontier--",
  ].join("\r\n");
}

test("parseRawEmail extracts text, sanitized html, headers, and date", () => {
  const parsed = parseRawEmail(multipartFixture());

  assert.equal(parsed.from, "Demo Sender <sender@example.com>");
  assert.equal(parsed.subject, "Verify your account");
  assert.match(parsed.text, /Your code is 928374/);
  assert.match(parsed.html, /<b>928374<\/b>/);
  assert.doesNotMatch(parsed.html, /<script/);
  assert.equal(
    parsed.receivedAt,
    new Date("2026-11-03T10:30:00.000Z").toISOString()
  );
});

test("parseRawEmail decodes base64 and quoted-printable bodies", () => {
  const base64Body = Buffer.from("Plain from base64.").toString("base64");
  const raw =
    "From: a@b.c\nSubject: base64 test\n" +
    "Content-Type: text/plain; charset=utf-8\n" +
    "Content-Transfer-Encoding: base64\n\n" +
    `${base64Body}\n`;

  assert.equal(parseRawEmail(raw).text, "Plain from base64.");

  const qp =
    "From: a@b.c\nSubject: qp test\n" +
    "Content-Type: text/plain\n" +
    "Content-Transfer-Encoding: quoted-printable\n\n" +
    "Hello=20World\n";

  assert.equal(parseRawEmail(qp).text, "Hello World");
});

test("parseRawEmail rejects oversized messages", () => {
  assert.throws(
    () => parseRawEmail("x".repeat(300 * 1024), { maxBytes: 256 * 1024 }),
    /too large/i
  );
});

// ---------- Service: access isolation, demo seeding, deletion ----------

const env = {}; // no KV binding -> in-memory demo store

test("createTempMailbox reports demo delivery and seeds labeled demo messages", async () => {
  const mailbox = await createTempMailbox(env);

  assert.equal(mailbox.delivery, "demo");
  assert.match(mailbox.address, /@calvorotool\.com$/);

  const inbox = await listTempMailInbox(env, mailbox.id, mailbox.token);

  assert.equal(inbox.mailbox.delivery, "demo");
  assert.ok(inbox.messages.length >= 2);
  assert.ok(inbox.messages.every((message) => message.demo === true));
  assert.ok(
    inbox.messages.every((message) => /\[DEMO\]/.test(message.subject))
  );
});

test("inbox access is isolated by mailbox id and token", async () => {
  const first = await createTempMailbox(env);
  const second = await createTempMailbox(env);

  await assert.rejects(
    listTempMailInbox(env, first.id, "0".repeat(64)),
    (error) =>
      error instanceof TempMailError && error.statusCode === 403
  );
  await assert.rejects(
    listTempMailInbox(env, "0".repeat(32), first.token),
    (error) =>
      error instanceof TempMailError && error.statusCode === 404
  );
  await assert.rejects(
    getTempMailMessage(env, first.id, second.token, "demo-welcome"),
    (error) =>
      error instanceof TempMailError && error.statusCode === 403
  );

  const firstInbox = await listTempMailInbox(env, first.id, first.token);
  const secondInbox = await listTempMailInbox(env, second.id, second.token);

  assert.ok(firstInbox.messages.length >= 2);
  assert.ok(secondInbox.messages.length >= 2);
});

test("opening a message marks it read and returns codes", async () => {
  const mailbox = await createTempMailbox(env);
  const message = await getTempMailMessage(
    env,
    mailbox.id,
    mailbox.token,
    "demo-code"
  );

  assert.equal(message.read, true);
  assert.equal(message.demo, true);
  assert.ok(message.codes.includes("482913"));

  const inbox = await listTempMailInbox(env, mailbox.id, mailbox.token);
  const entry = inbox.messages.find((item) => item.id === "demo-code");

  assert.equal(entry.read, true);
});

test("deleteTempMailbox removes the mailbox and its messages", async () => {
  const mailbox = await createTempMailbox(env);

  await deleteTempMailbox(env, mailbox.id, mailbox.token);

  await assert.rejects(
    listTempMailInbox(env, mailbox.id, mailbox.token),
    (error) =>
      error instanceof TempMailError && error.statusCode === 404
  );
});

test("ingestInboundEmail accepts only existing mailboxes and enforces the cap", async () => {
  const mailbox = await createTempMailbox(env);

  const before = await listTempMailInbox(env, mailbox.id, mailbox.token);

  const outcome = await ingestInboundEmail(
    env,
    multipartFixture(),
    mailbox.address.split("@")[0]
  );

  assert.equal(outcome.accepted, true);

  const after = await listTempMailInbox(env, mailbox.id, mailbox.token);

  assert.equal(after.messages.length, before.messages.length + 1);
  assert.equal(
    after.messages.filter((message) => message.demo === false).length,
    1
  );

  const incomingId = after.messages.find(
    (message) => message.demo === false
  ).id;
  const incoming = await getTempMailMessage(
    env,
    mailbox.id,
    mailbox.token,
    incomingId
  );

  assert.equal(incoming.demo, false);
  assert.match(incoming.subject, /Verify your account/);
  assert.ok(incoming.codes.includes("928374"));
  assert.doesNotMatch(incoming.html || "", /<script/);

  const unknown = await ingestInboundEmail(
    env,
    multipartFixture(),
    "nobody1234"
  );

  assert.equal(unknown.accepted, false);

  for (let index = 0; index < 50; index += 1) {
    await ingestInboundEmail(
      env,
      multipartFixture(),
      mailbox.address.split("@")[0]
    );
  }

  const full = await listTempMailInbox(env, mailbox.id, mailbox.token);

  assert.equal(full.messages.length, 50);

  const rejected = await ingestInboundEmail(
    env,
    multipartFixture(),
    mailbox.address.split("@")[0]
  );

  assert.equal(rejected.accepted, false);
  assert.equal(rejected.reason, "mailbox full");
});

test("demo messages sanitize cleanly", () => {
  for (const message of buildDemoMessages()) {
    if (!message.html) continue;

    const clean = sanitizeEmailHtml(message.html);

    assert.doesNotMatch(clean, /<script|onerror|javascript:/i);
  }
});

// ---------- Email Worker: early oversize rejection ----------

function plainRawFixture() {
  return [
    "From: sender@example.com",
    "To: maple1234@calvorotool.com",
    "Subject: hello inbox",
    "Date: Wed, 03 Nov 2026 10:30:00 +0000",
    "Content-Type: text/plain; charset=utf-8",
    "",
    "Hello inbox.",
  ].join("\n");
}

function streamOf(bytes) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

function fakeMailMessage({ rawSize, raw }) {
  let rejected = null;

  const message = {
    rawSize,
    raw,
    to: "maple1234@calvorotool.com",
    setReject(reason) {
      rejected = reason;
    },
  };

  return { message, getRejected: () => rejected };
}

test("email worker rejects oversized mail before reading the stream when rawSize is available", async () => {
  let readerRequests = 0;
  const raw = new Proxy(streamOf(new Uint8Array(0)), {
    get(target, prop, receiver) {
      if (prop === "getReader") readerRequests += 1;
      return Reflect.get(target, prop, receiver);
    },
  });
  const { message, getRejected } = fakeMailMessage({
    rawSize: 300 * 1024,
    raw,
  });

  await emailWorker.email(message, {});

  assert.equal(getRejected(), "Message too large.");
  assert.equal(readerRequests, 0, "the raw stream must not be read");
});

test("email worker rejects oversized mail via the stream cap when rawSize is unavailable", async () => {
  const big = new Uint8Array(300 * 1024);
  const { message, getRejected } = fakeMailMessage({
    rawSize: undefined,
    raw: streamOf(big),
  });

  await emailWorker.email(message, {});

  assert.equal(getRejected(), "Message too large or unreadable.");
});

test("email worker accepts a valid message into an existing mailbox", async () => {
  const mailbox = await createTempMailbox(env);
  const raw = plainRawFixture();
  const { message, getRejected } = fakeMailMessage({
    rawSize: raw.length,
    raw: streamOf(new TextEncoder().encode(raw)),
  });

  message.to = mailbox.address;

  await emailWorker.email(message, env);

  assert.equal(getRejected(), null);

  const inbox = await listTempMailInbox(env, mailbox.id, mailbox.token);
  const incoming = inbox.messages.find((item) => item.demo === false);

  assert.ok(incoming, "ingested message should appear in the inbox");
  assert.equal(incoming.subject, "hello inbox");
});

// ---------- KV mode: message expiry aligned with mailbox expiry ----------

function createFakeKv() {
  const records = new Map();

  const kv = {
    async get(key) {
      const entry = records.get(key);
      return entry ? JSON.parse(entry.value) : null;
    },
    async put(key, value, options) {
      records.set(key, { value, options });
    },
    async delete(key) {
      records.delete(key);
    },
  };

  return { kv, records };
}

test("stored messages and the recipient index expire with their parent mailbox", async () => {
  const { kv, records } = createFakeKv();
  const kvEnv = { TEMP_MAIL_KV: kv };
  const mailbox = await createTempMailbox(kvEnv);

  assert.equal(mailbox.delivery, "live");

  const outcome = await ingestInboundEmail(
    kvEnv,
    multipartFixture(),
    mailbox.address.split("@")[0]
  );

  assert.equal(outcome.accepted, true);

  const messageEntry = [...records.entries()].find(([key]) =>
    key.startsWith(`message:${mailbox.id}:`)
  );

  assert.ok(messageEntry, "message record should be written to KV");

  const storedMessage = JSON.parse(messageEntry[1].value);

  assert.equal(storedMessage.expiresAt, mailbox.expiresAt);

  const ttlSeconds = messageEntry[1].options.expirationTtl;
  const remainingSeconds = Math.ceil(
    (mailbox.expiresAt - Date.now()) / 1000
  );

  assert.ok(ttlSeconds >= 60, "TTL must respect the KV 60s minimum");
  assert.ok(
    Math.abs(ttlSeconds - remainingSeconds) <= 2,
    "TTL should match the mailbox's remaining lifetime"
  );

  const indexEntry = records.get(
    `mailbox:index:${mailbox.address.split("@")[0]}`
  );

  assert.ok(indexEntry, "index record should be written to KV");
  assert.equal(JSON.parse(indexEntry.value).expiresAt, mailbox.expiresAt);
});

test("inbound mail is rejected in the mailbox's final minute", async () => {
  const { kv } = createFakeKv();
  const kvEnv = { TEMP_MAIL_KV: kv };
  const mailbox = await createTempMailbox(kvEnv);

  const realNow = Date.now;
  Date.now = () => mailbox.expiresAt - 30_000;

  try {
    const outcome = await ingestInboundEmail(
      kvEnv,
      multipartFixture(),
      mailbox.address.split("@")[0]
    );

    assert.equal(outcome.accepted, false);
    assert.equal(outcome.reason, "mailbox expiring");
  } finally {
    Date.now = realNow;
  }
});

test("an expired mailbox cannot receive mail", async () => {
  const { kv } = createFakeKv();
  const kvEnv = { TEMP_MAIL_KV: kv };
  const mailbox = await createTempMailbox(kvEnv);

  const realNow = Date.now;
  Date.now = () => mailbox.expiresAt + 1_000;

  try {
    const outcome = await ingestInboundEmail(
      kvEnv,
      multipartFixture(),
      mailbox.address.split("@")[0]
    );

    assert.equal(outcome.accepted, false);
  } finally {
    Date.now = realNow;
  }
});

test("inbox and message retrieval work unchanged in KV mode", async () => {
  const { kv } = createFakeKv();
  const kvEnv = { TEMP_MAIL_KV: kv };
  const mailbox = await createTempMailbox(kvEnv);

  await ingestInboundEmail(
    kvEnv,
    multipartFixture(),
    mailbox.address.split("@")[0]
  );

  const inbox = await listTempMailInbox(kvEnv, mailbox.id, mailbox.token);
  const incoming = inbox.messages.find((item) => item.demo === false);

  assert.ok(incoming);

  const full = await getTempMailMessage(
    kvEnv,
    mailbox.id,
    mailbox.token,
    incoming.id
  );

  assert.equal(full.demo, false);
  assert.ok(full.codes.includes("928374"));
});

// ---------- Route, catalog, and sitemap integration ----------

test("temporary email route is wired into metadata, catalog, app, and sitemap", async () => {
  const metadata = getRouteMetadata("/temporary-email");

  assert.equal(metadata.type, "WebApplication");
  assert.equal(
    metadata.title,
    "Free Temporary Email – Receive Emails Online | CALVORO"
  );
  assert.match(metadata.description, /temporary email address/i);

  assert.ok(
    routeInventory.some((route) => route.path === "/temporary-email")
  );

  const catalogEntry = utilityTools.find(
    (tool) => tool.path === "/temporary-email"
  );

  assert.ok(catalogEntry, "catalog should list temporary email");
  assert.equal(catalogEntry.category, "Productivity");
  assert.ok(catalogEntry.aliases.length >= 5);

  const appSource = await readFile(repoFile("src/App.jsx"), "utf8");

  assert.match(appSource, /TemporaryEmail/);
  assert.match(
    appSource,
    /"\/temporary-email": lazy\(\(\) =>\s*import\("\.\/tools\/TemporaryEmail\.jsx"\)/
  );
  assert.match(appSource, /TempMailFeature/);

  const sitemap = await readFile(repoFile("public/sitemap.xml"), "utf8");

  assert.match(sitemap, /https:\/\/calvorotool\.com\/temporary-email/);
});
