// Shared, dependency-free core logic for the CALVORO Temporary Email tool.
// Imported by the React frontend, the Cloudflare Worker backend, and Node tests.
// No browser-only or worker-only APIs are used here.

export const TEMP_MAIL_DOMAIN = "calvorotool.com";
export const MAILBOX_TTL_MS = 60 * 60 * 1000;
export const MAX_MESSAGES_PER_MAILBOX = 50;
export const MAX_INBOUND_BYTES = 256 * 1024;
export const MAX_STORED_TEXT_BYTES = 180 * 1024;
export const MAX_VERIFICATION_CODES = 5;

const ADDRESS_WORDS = [
  "amber", "birch", "cedar", "dune", "elm", "fern", "glade", "hazel",
  "iris", "juniper", "koala", "lumen", "maple", "nimbus", "onyx", "palm",
  "quartz", "raven", "sage", "tide", "umber", "violet", "willow", "zephyr",
];

function bytesOf(value) {
  return new TextEncoder().encode(value).length;
}

export function randomHex(byteLength) {
  const bytes = new Uint8Array(byteLength);

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < byteLength; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

export function generateAddressLocalPart() {
  const word =
    ADDRESS_WORDS[Math.floor(Math.random() * ADDRESS_WORDS.length)];
  const digits = Math.floor(1000 + Math.random() * 9000);

  return `${word}${digits}`;
}

export function generateMailbox({ now = Date.now() } = {}) {
  const local = generateAddressLocalPart();

  return Object.freeze({
    id: randomHex(16),
    token: randomHex(32),
    local,
    address: `${local}@${TEMP_MAIL_DOMAIN}`,
    createdAt: now,
    expiresAt: now + MAILBOX_TTL_MS,
  });
}

export function isMailboxExpired(mailbox, now = Date.now()) {
  return !mailbox || now >= (mailbox.expiresAt || 0);
}

// ======================================================
// DEMO MESSAGES
// Every demo message is explicitly marked demo: true.
// ======================================================

export function buildDemoMessages({ now = Date.now() } = {}) {
  const minutesAgo = (minutes) => now - minutes * 60 * 1000;

  return [
    {
      id: "demo-welcome",
      from: "CALVORO Temporary Email <hello@calvorotool.com>",
      subject: "[DEMO] Welcome to your CALVORO disposable inbox",
      receivedAt: new Date(minutesAgo(1)).toISOString(),
      read: false,
      demo: true,
      text:
        "This is a DEMO message. It was generated locally by the CALVORO Temporary Email tool to show how the inbox works.\n\n" +
        "Messages are not being received from the internet yet. The mailbox, inbox list, message viewer, copy buttons, and expiration timer are all functional, but this address cannot receive real email.\n\n" +
        "When real inbound delivery is enabled, incoming messages will appear here the same way.",
      html: "",
    },
    {
      id: "demo-code",
      from: "Demo Service <noreply@example.com>",
      subject: "[DEMO] Your verification code is 482913",
      receivedAt: new Date(minutesAgo(4)).toISOString(),
      read: false,
      demo: true,
      text:
        "DEMO MESSAGE - not a real email.\n\n" +
        "Hi there,\n\n" +
        "To finish setting up your demo account, enter this verification code:\n\n" +
        "482913\n\n" +
        "This code expires in 10 minutes.\n\n" +
        "The code above is automatically extracted by CALVORO and shown as a copyable chip in the message viewer.",
      html:
        '<div style="font-family:Arial,sans-serif;color:#172033">' +
        "<p>DEMO MESSAGE - not a real email.</p>" +
        "<p>Hi there,</p>" +
        "<p>To finish setting up your demo account, enter this verification code:</p>" +
        '<p style="font-size:22px;font-weight:bold">482913</p>' +
        "<p>This code expires in 10 minutes.</p>" +
        "<p>The code above is automatically extracted by CALVORO and shown as a copyable chip in the message viewer.</p>" +
        "</div>",
    },
  ];
}

// ======================================================
// SAFE HTML SANITIZER
// Conservative whitelist sanitizer for email HTML. Runs without a DOM,
// so it works identically in the Worker, in Node tests, and in the
// browser. The frontend additionally renders sanitized HTML inside a
// sandboxed iframe without allow-scripts as a second layer of defense.
// ======================================================

const BLOCKED_PAIRED_TAGS = [
  "script", "style", "iframe", "object", "embed", "noscript", "svg",
  "math", "template", "frameset", "frame", "applet", "video", "audio",
  "canvas", "form", "select", "textarea",
];

const BLOCKED_SINGLE_TAGS = [
  "input", "button", "link", "meta", "base", "option", "keygen",
  "track", "source", "param", "area", "map", "dialog",
];

const VOID_TAGS = new Set(["br", "hr", "img"]);

const ALLOWED_TAGS = {
  div: ["align", "dir", "style"],
  p: ["align", "dir", "style"],
  span: ["dir", "style"],
  a: ["href", "title", "name"],
  b: [], strong: [], i: [], em: [], u: [], s: [], small: [], big: [],
  sup: [], sub: [],
  h1: ["align"], h2: ["align"], h3: ["align"],
  h4: ["align"], h5: ["align"], h6: ["align"],
  ul: [], ol: ["start"], li: [], dl: [], dt: [], dd: [],
  table: ["border", "cellpadding", "cellspacing", "width", "align", "bgcolor"],
  thead: [], tbody: [], tfoot: [],
  tr: ["align", "valign", "bgcolor"],
  td: ["colspan", "rowspan", "align", "valign", "width", "bgcolor", "style"],
  th: ["colspan", "rowspan", "align", "valign", "width", "bgcolor", "style"],
  blockquote: [], pre: [], code: [],
  br: [], hr: [], center: [],
  font: ["color", "size", "face"],
  img: ["src", "alt", "width", "height", "title"],
};

const CONTROL_CHARACTERS_REGEX = new RegExp(
  `[${String.fromCharCode(0)}-${String.fromCharCode(31)}${String.fromCharCode(127)}]`,
  "g"
);

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0",
  copy: "\u00a9", reg: "\u00ae", trade: "\u2122", hellip: "\u2026",
  mdash: "\u2014", ndash: "\u2013", lsquo: "\u2018", rsquo: "\u2019",
  ldquo: "\u201c", rdquo: "\u201d", euro: "\u20ac", pound: "\u00a3",
  yen: "\u00a5", cent: "\u00a2", sect: "\u00a7", para: "\u00b6",
  middot: "\u00b7", bull: "\u2022", deg: "\u00b0", plusmn: "\u00b1",
  times: "\u00d7", divide: "\u00f7", frac12: "\u00bd", frac14: "\u00bc",
};

function decodeEntities(text) {
  return String(text).replace(
    /&(#x?[0-9a-f]+|[a-z]+);/gi,
    (match, body) => {
      const lower = body.toLowerCase();

      if (lower.startsWith("#x")) {
        const code = Number.parseInt(lower.slice(2), 16);
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : match;
      }

      if (lower.startsWith("#")) {
        const code = Number.parseInt(lower.slice(1), 10);
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : match;
      }

      return Object.hasOwn(NAMED_ENTITIES, lower)
        ? NAMED_ENTITIES[lower]
        : match;
    }
  );
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeText(value).replace(/"/g, "&quot;");
}

function sanitizeUrl(value) {
  const trimmed = String(value || "")
    .replace(CONTROL_CHARACTERS_REGEX, "")
    .trim();

  if (!trimmed) return "";

  return /^(?:https?|mailto):/i.test(trimmed) ? trimmed : "";
}

function sanitizeStyleAttr(value) {
  const style = String(value || "").slice(0, 300);

  if (
    /url\s*\(|@import|expression\s*\(|javascript:|behavior\s*:|position\s*:\s*(?:fixed|absolute)|-moz-binding|@/i.test(
      style
    )
  ) {
    return "";
  }

  return style.replace(CONTROL_CHARACTERS_REGEX, "");
}

function sanitizeNumberAttr(value, max) {
  const digits = String(value || "").replace(/[^0-9]/g, "");

  if (!digits) return "";

  const number = Number.parseInt(digits, 10);
  return Number.isFinite(number) && number > 0 && number <= max
    ? String(number)
    : "";
}

function parseAttributes(raw) {
  const attributes = {};
  const pattern =
    /([a-zA-Z][a-zA-Z-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let match;

  while ((match = pattern.exec(raw)) !== null) {
    const name = match[1].toLowerCase();
    attributes[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attributes;
}

function findTagEnd(part) {
  let quote = "";

  for (let index = 0; index < part.length; index += 1) {
    const char = part[index];

    if (quote) {
      if (char === quote) quote = "";
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === ">") {
      return index;
    }
  }

  return -1;
}

function renderAllowedTag(name, rawAttributes) {
  const tag = name.toLowerCase();
  const allowed = ALLOWED_TAGS[tag];

  if (!allowed) return null;

  const incoming = parseAttributes(rawAttributes || "");
  const attributes = [];

  for (const attribute of allowed) {
    if (!Object.hasOwn(incoming, attribute)) continue;

    let value = incoming[attribute];

    if (attribute === "href" || attribute === "src") {
      value = sanitizeUrl(value);

      if (!value) continue;

      if (attribute === "href") {
        attributes.push(
          'target="_blank"',
          'rel="noopener noreferrer nofollow"'
        );
      }
    } else if (attribute === "style") {
      value = sanitizeStyleAttr(value);

      if (!value) continue;
    } else if (attribute === "width" || attribute === "height") {
      value = sanitizeNumberAttr(value, 2000);

      if (!value) continue;
    } else if (
      attribute === "border" ||
      attribute === "cellpadding" ||
      attribute === "cellspacing" ||
      attribute === "colspan" ||
      attribute === "rowspan" ||
      attribute === "size" ||
      attribute === "start"
    ) {
      const digits = String(value).replace(/[^0-9]/g, "");
      value = digits || "0";
    } else if (attribute === "bgcolor" || attribute === "color") {
      if (!/^#?[0-9a-f]{3,8}$/i.test(String(value))) continue;
    }

    attributes.push(
      `${attribute}="${escapeAttribute(String(value))}"`
    );
  }

  const rendered = `<${tag}` +
    (attributes.length > 0 ? ` ${attributes.join(" ")}` : "") +
    (VOID_TAGS.has(tag) ? " />" : ">");

  return rendered;
}

export function sanitizeEmailHtml(input) {
  let html = String(input ?? "");

  if (!html) return "";

  html = html.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");

  for (const tag of BLOCKED_PAIRED_TAGS) {
    html = html.replace(
      new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, "gi"),
      ""
    );
  }

  for (const tag of BLOCKED_SINGLE_TAGS) {
    html = html.replace(new RegExp(`<${tag}\\b[^>]*>`, "gi"), "");
  }

  const chunks = html.split(/</);
  let output = "";

  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex += 1) {
    const chunk = chunks[chunkIndex];

    if (!chunk) continue;

    const tagEnd = findTagEnd(chunk);

    if (tagEnd === -1) {
      output += escapeText(decodeEntities(chunk));
      continue;
    }

    const rawTag = chunk.slice(0, tagEnd).trim();
    const text = chunk.slice(tagEnd + 1);
    const match = /^\/?[a-zA-Z][a-zA-Z0-9-]*/.exec(rawTag);

    if (!match) {
      output += escapeText(
        decodeEntities(`<${chunk.slice(0, tagEnd + 1)}`)
      );
    } else {
      const tagName = match[0].replace(/^\//, "").toLowerCase();

      if (Object.hasOwn(ALLOWED_TAGS, tagName)) {
        output += rawTag.startsWith("/")
          ? `</${tagName}>`
          : renderAllowedTag(tagName, rawTag.slice(match[0].length));
      }
    }

    if (text) {
      output += escapeText(decodeEntities(text));
    }
  }

  return output;
}

export function htmlToPlainText(sanitizedHtml) {
  const withBreaks = String(sanitizedHtml || "")
    .replace(/<(?:br|\/p|\/div|\/li|\/h[1-6]|\/tr)[^>]*>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/?(?:td|th)[^>]*>/gi, "  ");

  const withoutTags = withBreaks.replace(/<[^>]*>/g, "");

  return decodeEntities(withoutTags)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ======================================================
// VERIFICATION CODE EXTRACTION
// Heuristic extraction from message text. Candidate codes only;
// the user decides what to copy.
// ======================================================

export function extractVerificationCodes(text) {
  const source = String(text ?? "");

  if (!source) return [];

  const codes = [];
  const seen = new Set();

  const add = (raw) => {
    const digits = String(raw).replace(/[^0-9]/g, "");

    if (digits.length < 4 || digits.length > 12) return;
    if (/^(\d)\1+$/.test(digits)) return;

    if (!seen.has(digits)) {
      seen.add(digits);
      codes.push(digits);
    }
  };

  const labeledPattern =
    /(?:verification|activation|confirmation|security|access|one-?time|login|otp|passcode|pin|code)\s*(?:is|:|-|number|no\.?)?[^\d\n]{0,30}?(\d[\d\s-]{3,15}\d)/gi;
  let match;

  while ((match = labeledPattern.exec(source)) !== null) {
    add(match[1]);
  }

  const dashedPattern = /\b(\d{3}[- ]\d{3})\b/g;

  while ((match = dashedPattern.exec(source)) !== null) {
    add(match[1]);
  }

  const standalonePattern = /(?:^|[^\d])(\d{6})(?=[^\d]|$)/g;

  while ((match = standalonePattern.exec(source)) !== null) {
    add(match[1]);
  }

  return codes.slice(0, MAX_VERIFICATION_CODES);
}

// ======================================================
// MINIMAL MIME PARSER
// Dependency-free RFC 2045/2046 parser used by the future Email
// Worker to turn raw inbound messages into stored message records.
// ======================================================

export class RawEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "RawEmailError";
  }
}

function normalizeNewlines(raw) {
  return String(raw).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseHeaderBlock(headerText) {
  const headers = {};
  const lines = headerText.split("\n");
  let current = "";

  for (const line of lines) {
    if (/^[ \t]/.test(line) && current) {
      headers[current] += ` ${line.trim()}`;
      continue;
    }

    const colon = line.indexOf(":");

    if (colon === -1) continue;

    current = line.slice(0, colon).trim().toLowerCase();

    if (current) {
      headers[current] = line.slice(colon + 1).trim();
    }
  }

  return headers;
}

function decodeEncodedWords(value) {
  return String(value || "").replace(
    /=\?([^?]+)\?([bBqQ])\?([^?]*)\?=/g,
    (match, charset, encoding, data) => {
      try {
        if (encoding.toLowerCase() === "b") {
          const binary = atob(data.replace(/\s/g, ""));
          const bytes = Uint8Array.from(binary, (char) =>
            char.charCodeAt(0)
          );

          return new TextDecoder(charset).decode(bytes);
        }

        return String(data)
          .replace(/_/g, " ")
          .replace(/=([0-9a-f]{2})/gi, (m, hex) =>
            String.fromCharCode(Number.parseInt(hex, 16))
          );
      } catch {
        return match;
      }
    }
  );
}

function decodeQuotedPrintable(text) {
  return String(text)
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9a-f]{2})/gi, (match, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    );
}

function decodeBase64(text) {
  try {
    const binary = atob(String(text).replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, (char) =>
      char.charCodeAt(0)
    );

    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

function decodeTransfer(text, encoding) {
  switch (String(encoding || "").toLowerCase()) {
    case "base64":
      return decodeBase64(text);
    case "quoted-printable":
      return decodeQuotedPrintable(text);
    default:
      return text;
  }
}

function parseContentType(value) {
  const [typePart, ...paramParts] = String(value || "text/plain")
    .split(";");
  const type = typePart.trim().toLowerCase() || "text/plain";
  const params = {};

  for (const part of paramParts) {
    const match = /^\s*([^=]+)="?([^";]*)"?/.exec(part);

    if (match) {
      params[match[1].trim().toLowerCase()] = match[2].trim();
    }
  }

  return { type, params };
}

function walkMimeParts(body, contentType, depth, result) {
  if (depth > 4) return;

  const { type, params } = contentType;

  if (type.startsWith("multipart/") && params.boundary) {
    const boundary = params.boundary;
    const parts = body.split(`--${boundary}`);

    for (const part of parts) {
      const separator = part.indexOf("\n\n");

      if (separator === -1) continue;

      const partHeaders = parseHeaderBlock(part.slice(0, separator));
      const partBody = part.slice(separator + 2).trim();

      walkMimeParts(
        partBody,
        parseContentType(partHeaders["content-type"] || "text/plain"),
        depth + 1,
        result
      );
    }

    return;
  }

  const decoded = decodeTransfer(
    body.trim(),
    contentType.encoding
  );

  if (type === "text/plain" && !result.text) {
    result.text = decoded;
  } else if (type === "text/html" && !result.html) {
    result.html = sanitizeEmailHtml(decoded);
  }
}

export function parseRawEmail(raw, { maxBytes = MAX_INBOUND_BYTES } = {}) {
  if (typeof raw !== "string") {
    throw new RawEmailError("The message is not text.");
  }

  if (bytesOf(raw) > maxBytes) {
    throw new RawEmailError("The message is too large.");
  }

  const normalized = normalizeNewlines(raw);
  const separator = normalized.indexOf("\n\n");
  const headerText =
    separator === -1 ? normalized : normalized.slice(0, separator);
  const body =
    separator === -1 ? "" : normalized.slice(separator + 2);

  const headers = parseHeaderBlock(headerText);
  const contentType = parseContentType(headers["content-type"] || "text/plain");

  contentType.encoding =
    (headers["content-transfer-encoding"] || "").toLowerCase();

  const parts = { text: "", html: "" };
  walkMimeParts(body, contentType, 0, parts);

  let text = parts.text || htmlToPlainText(parts.html);

  if (bytesOf(text) > MAX_STORED_TEXT_BYTES) {
    text = text.slice(0, MAX_STORED_TEXT_BYTES);
  }

  const subject = decodeEncodedWords(headers.subject || "(no subject)");
  const from = decodeEncodedWords(headers.from || "Unknown sender");

  let receivedAt = null;
  const parsedDate = Date.parse(headers.date || "");

  if (Number.isFinite(parsedDate)) {
    receivedAt = new Date(parsedDate).toISOString();
  }

  return {
    from: from.slice(0, 200),
    subject: subject.slice(0, 300),
    receivedAt,
    text,
    html: parts.html,
  };
}
