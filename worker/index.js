const AI_ENDPOINTS = new Set([
  "/api/summarize",
  "/api/rewrite",
  "/api/grammar",
  "/api/translate",
  "/api/generate",
  "/api/email-writer",
]);

const MAX_BODY_SIZE = 2_000_000;
const AI_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;

const SITE_METADATA_ENDPOINT = "/api/site-metadata";
const METADATA_BODY_LIMIT = 8_192;
const METADATA_TIMEOUT_MS = 12_000;
const METADATA_MAX_BYTES = 1_000_000;
const METADATA_MAX_REDIRECTS = 3;
const METADATA_MAX_URL_LENGTH = 2_048;
const METADATA_MAX_JSON_LD_BLOCKS = 10;
const METADATA_DNS_ENDPOINT = "https://cloudflare-dns.com/dns-query";
const METADATA_DNS_MAX_BYTES = 64_000;
const METADATA_RATE_LIMIT = 30;
const METADATA_RATE_WINDOW_MS = 60_000;
const METADATA_RATE_LIMIT_KEY = "METADATA_RATE_LIMITER";

const BLOCKED_HOSTNAMES = new Set([
  "home.arpa",
  "local",
  "internal",
  "intranet",
  "lan",
  "corp",
  "home",
  "localdomain",
]);

const BLOCKED_HOST_SUFFIXES = [
  ".localhost",
  ".local",
  ".internal",
  ".intranet",
  ".lan",
  ".home.arpa",
  ".arpa",
  ".test",
  ".invalid",
  ".example",
  ".corp",
  ".home",
  ".localdomain",
  ".onion",
  ".nip.io",
  ".sslip.io",
  ".xip.io",
  ".localtest.me",
  ".lvh.me",
  ".vcap.me",
  ".traefik.me",
  ".localhost.direct",
];

const METADATA_FETCH_HEADERS = {
  Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "CALVORO-MetadataChecker/1.0 (+https://calvorotool.com/website-metadata-checker)",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Cache-Control": "no-store",
};

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

function jsonResponse(statusCode, data, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function getConfig(env = {}) {
  const apiKey =
    env.CALVORO_OPENROUTER_API_KEY ||
    env.OPENROUTER_API_KEY ||
    "";

  const baseUrl =
    env.CALVORO_OPENROUTER_BASE_URL ||
    env.OPENROUTER_BASE_URL ||
    "https://openrouter.ai/api/v1";

  return {
    apiKey,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    siteUrl:
      env.SITE_URL ||
      env.URL ||
      "https://calvorotool.com",
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status) {
  return (
    status === 408 ||
    status === 409 ||
    status === 425 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function extractAiText(data) {
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    const trimmed = content.trim();

    if (trimmed) {
      return trimmed;
    }
  }

  if (Array.isArray(content)) {
    const combined = content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (
          part &&
          typeof part === "object" &&
          typeof part.text === "string"
        ) {
          return part.text;
        }

        return "";
      })
      .join("")
      .trim();

    if (combined) {
      return combined;
    }
  }

  return "";
}

async function callOpenRouter(prompt, config) {
  if (!config.apiKey) {
    throw new ApiError(
      503,
      "The AI service is not configured on the server."
    );
  }

  let lastError =
    "The AI provider did not return a usable response.";
  let lastStatus = 502;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${config.baseUrl}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
            "HTTP-Referer": config.siteUrl,
            "X-Title": "CALVORO",
          },
          body: JSON.stringify({
            model: "openrouter/free",
            messages: [
              {
                role: "system",
                content:
                  "You are CALVORO AI, a helpful, accurate, clear, natural, and safe writing assistant.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            provider: {
              allow_fallbacks: true,
            },
            max_tokens: 2500,
          }),
        },
        AI_TIMEOUT_MS
      );

      const raw = await response.text();

      console.log(
        `OpenRouter attempt ${attempt}/${MAX_RETRIES} status: ${response.status}`
      );

      let data = null;

      if (raw.trim()) {
        try {
          data = JSON.parse(raw);
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        lastError =
          data?.error?.message ||
          `OpenRouter request failed (HTTP ${response.status}).`;
        lastStatus =
          response.status === 429 ? 429 : 502;

        if (!isRetryableStatus(response.status)) {
          break;
        }
      } else {
        const aiText = extractAiText(data);

        if (aiText) {
          console.log(
            `CALVORO AI response received successfully on attempt ${attempt}.`
          );

          return aiText;
        }

        lastError =
          "OpenRouter returned an empty AI response.";
        lastStatus = 502;
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        lastError = "The AI request timed out.";
        lastStatus = 504;
      } else {
        lastError =
          error?.message ||
          "The AI connection failed.";
        lastStatus = 502;
      }

      console.error(
        `OpenRouter attempt ${attempt} error:`,
        lastError
      );
    }

    if (attempt < MAX_RETRIES) {
      await sleep(attempt * 2000);
    }
  }

  throw new ApiError(
    lastStatus,
    `${lastError} Please try again in a moment.`
  );
}

function buildPrompt(endpoint, data) {
  if (endpoint === "/api/summarize") {
    const inputText = String(data.text).trim();

    return `Summarize the following text accurately and clearly.

Keep the important information.
Use simple, natural language.
Return only the summary.

TEXT:
${inputText}`;
  }

  if (endpoint === "/api/rewrite") {
    const inputText = String(data.text).trim();
    const tone = data.tone || "Professional";

    return `Rewrite the following text in a ${tone} tone.

Preserve the original meaning.
Improve clarity, grammar, and readability.
Do not add unrelated information.
Return only the rewritten text.

TEXT:
${inputText}`;
  }

  if (endpoint === "/api/grammar") {
    const inputText = String(data.text).trim();

    return `Check the following text for grammar, spelling, punctuation, and sentence clarity.

Correct the mistakes while preserving the original meaning.
Do not add unrelated information.
Return only the corrected text.

TEXT:
${inputText}`;
  }

  if (endpoint === "/api/translate") {
    const inputText = String(data.text).trim();
    const language = data.language || "Spanish";

    return `Translate the following text into ${language}.

Preserve the original meaning and tone.
Use natural, fluent language.
Do not explain the translation.
Return only the translated text.

TEXT:
${inputText}`;
  }

  if (endpoint === "/api/generate") {
    const topic = String(data.topic).trim();
    const type = data.type || "Short Article";
    const tone = data.tone || "Professional";

    return `Create a ${type} about the following topic.

Topic:
${topic}

Writing tone:
${tone}

Use clear, useful, natural language.
Stay focused on the topic.
Do not mention the AI process.
Return only the requested content.`;
  }

  const purpose = String(data.purpose).trim();
  const tone = data.tone || "Professional";
  const length = data.length || "Medium";

  return `Write an email based on the following request.

REQUEST:
${purpose}

TONE:
${tone}

LENGTH:
${length}

Create a clear and natural email.
Include an appropriate subject line.
Use a suitable greeting and closing.
Keep the email focused on the request.
Do not invent specific names, dates, prices, or facts that were not provided.
Return only the complete email.`;
}

function validateRequest(endpoint, data) {
  if (
    endpoint !== "/api/generate" &&
    endpoint !== "/api/email-writer" &&
    (!data.text || !String(data.text).trim())
  ) {
    return "Please enter some text.";
  }

  if (
    endpoint === "/api/generate" &&
    (!data.topic || !String(data.topic).trim())
  ) {
    return "Please enter a topic or idea.";
  }

  if (
    endpoint === "/api/email-writer" &&
    (!data.purpose || !String(data.purpose).trim())
  ) {
    return "Please describe what the email should say.";
  }

  return null;
}

async function readJsonBody(request, maxSize = MAX_BODY_SIZE) {
  const contentLength = Number(
    request.headers.get("content-length") || 0
  );

  if (contentLength > maxSize) {
    throw new ApiError(413, "Request body is too large.");
  }

  const body = await request.text();

  if (new TextEncoder().encode(body).length > maxSize) {
    throw new ApiError(413, "Request body is too large.");
  }

  if (!body.trim()) {
    return {};
  }

  let data;

  try {
    data = JSON.parse(body);
  } catch {
    throw new ApiError(400, "Invalid request data.");
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new ApiError(400, "Invalid request data.");
  }

  return data;
}

async function handleAiRequest(endpoint, request, env) {
  const data = await readJsonBody(request);
  const validationError = validateRequest(endpoint, data);

  if (validationError) {
    throw new ApiError(400, validationError);
  }

  const prompt = buildPrompt(endpoint, data);
  const aiText = await callOpenRouter(prompt, getConfig(env));

  if (endpoint === "/api/summarize") {
    return jsonResponse(200, { summary: aiText });
  }

  return jsonResponse(200, { result: aiText });
}

function metadataJsonResponse(statusCode, data, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function isBlockedMetadataHostname(hostname) {
  const host = String(hostname || "").toLowerCase();

  if (!host || host.length > 253) return true;
  if (host.endsWith(".")) return true;
  if (!host.includes(".")) return true;
  if (host.includes("%")) return true;
  if (BLOCKED_HOSTNAMES.has(host)) return true;

  const bareHost = host.replace(/^\[|\]$/g, "");

  if (bareHost.includes(":")) return true;
  if (/^[\d.]+$/.test(bareHost)) return true;

  return BLOCKED_HOST_SUFFIXES.some((suffix) =>
    host.endsWith(suffix)
  );
}

function validateMetadataUrl(value) {
  const raw = String(value || "").trim();

  if (!raw) {
    throw new ApiError(400, "Enter a website URL to check.");
  }

  if (raw.length > METADATA_MAX_URL_LENGTH) {
    throw new ApiError(400, "The URL is too long.");
  }

  let url;

  try {
    url = new URL(raw);
  } catch {
    throw new ApiError(
      400,
      "Enter a valid URL, including http:// or https://."
    );
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ApiError(
      400,
      "Only http:// and https:// URLs are supported."
    );
  }

  if (url.username || url.password) {
    throw new ApiError(
      400,
      "URLs containing credentials are not allowed."
    );
  }

  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new ApiError(400, "Only ports 80 and 443 are allowed.");
  }

  if (isBlockedMetadataHostname(url.hostname)) {
    throw new ApiError(
      400,
      "That host is not a public website."
    );
  }

  url.hash = "";
  return url;
}

function parseIpv4Address(value) {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(
    String(value || "").trim()
  );

  if (!match) return null;

  const parts = match.slice(1).map(Number);

  return parts.every((part) => part <= 255) ? parts : null;
}

function parseIpv6Address(value) {
  const raw = String(value || "").trim().toLowerCase();

  if (!raw || raw.includes("%") || !/^[0-9a-f:.]+$/.test(raw)) {
    return null;
  }

  try {
    const hostname = new URL(`http://[${raw}]/`).hostname;
    const canonical = hostname.replace(/^\[|\]$/g, "");
    const sections = canonical.split("::");

    if (sections.length > 2) return null;

    const head = sections[0] ? sections[0].split(":") : [];
    const tail =
      sections.length === 2 && sections[1]
        ? sections[1].split(":")
        : [];
    const fill = 8 - head.length - tail.length;

    if (fill < 0 || (sections.length === 1 && fill !== 0)) {
      return null;
    }

    const groups = [
      ...head,
      ...Array.from({ length: fill }, () => "0"),
      ...tail,
    ].map((group) => Number.parseInt(group, 16));

    return groups.length === 8 && groups.every(Number.isFinite)
      ? groups
      : null;
  } catch {
    return null;
  }
}

function isPublicIpv4Address(parts) {
  const [a, b, c] = parts;

  if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
  if (a === 100 && b >= 64 && b <= 127) return false;
  if (a === 169 && b === 254) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 192 && b === 168) return false;
  if (a === 192 && b === 0 && (c === 0 || c === 2 || c === 88)) {
    return false;
  }
  if (a === 168 && b === 63 && c === 129 && parts[3] === 16) {
    return false;
  }
  if (a === 198 && (b === 18 || b === 19)) return false;
  if (a === 198 && b === 51 && c === 100) return false;
  if (a === 203 && b === 0 && c === 113) return false;

  return true;
}

function isPublicIpv6Address(groups) {
  if (groups[0] < 0x2000 || groups[0] > 0x3fff) return false;

  // 2001::/23 covers Teredo, benchmarking, and other IETF assignments.
  if (groups[0] === 0x2001 && groups[1] <= 0x01ff) return false;
  if (groups[0] === 0x2001 && groups[1] === 0x0db8) return false;
  if (groups[0] === 0x2002) return false;
  if (groups[0] === 0x3fff && groups[1] <= 0x0fff) return false;

  return true;
}

function isPublicMetadataAddress(address) {
  const ipv4 = parseIpv4Address(address);

  if (ipv4) return isPublicIpv4Address(ipv4);

  const ipv6 = parseIpv6Address(address);

  if (ipv6) return isPublicIpv6Address(ipv6);

  return false;
}

async function queryMetadataDns(hostname, type, signal) {
  const queryUrl = new URL(METADATA_DNS_ENDPOINT);

  queryUrl.searchParams.set("name", hostname);
  queryUrl.searchParams.set("type", type);

  let response;

  try {
    response = await fetch(queryUrl.toString(), {
      method: "GET",
      redirect: "error",
      signal,
      headers: { Accept: "application/dns-json" },
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new Error("Metadata DNS lookup failed.");
  }

  if (!response.ok) {
    throw new Error("Metadata DNS lookup failed.");
  }

  const text = await response.text();

  if (text.length > METADATA_DNS_MAX_BYTES) {
    throw new Error("Metadata DNS response was too large.");
  }

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Metadata DNS response was invalid.");
  }

  if (typeof data?.Status !== "number") {
    throw new Error("Metadata DNS response was invalid.");
  }

  if (data.Status === 3) return [];
  if (data.Status !== 0) {
    throw new Error("Metadata DNS lookup did not complete.");
  }

  const answers = Array.isArray(data.Answer) ? data.Answer : [];
  const recordType = type === "A" ? 1 : 28;

  return answers
    .filter(
      (answer) =>
        answer &&
        answer.type === recordType &&
        typeof answer.data === "string"
    )
    .map((answer) => answer.data.trim())
    .filter(Boolean);
}

async function assertPublicMetadataHostname(hostname, signal) {
  const [ipv4, ipv6] = await Promise.all([
    queryMetadataDns(hostname, "A", signal),
    queryMetadataDns(hostname, "AAAA", signal),
  ]);
  const addresses = [...new Set([...ipv4, ...ipv6])];

  if (addresses.length === 0) {
    throw new ApiError(400, "That host could not be resolved.");
  }

  if (addresses.some((address) => !isPublicMetadataAddress(address))) {
    throw new ApiError(400, "That host is not a public website.");
  }
}

async function resolveMetadataTarget(url, signal, fromRedirect) {
  try {
    await assertPublicMetadataHostname(url.hostname, signal);
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new ApiError(
        504,
        "The website did not respond before the timeout."
      );
    }

    if (fromRedirect) {
      throw new ApiError(
        502,
        "The website redirected to a destination that cannot be checked."
      );
    }

    if (error instanceof ApiError) throw error;

    throw new ApiError(
      502,
      "The website's address could not be verified."
    );
  }
}

function isMetadataOriginAllowed(request, env) {
  const origin = request.headers.get("origin");

  if (!origin) return true;

  let originUrl;

  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  const requestUrl = new URL(request.url);
  const allowedOrigins = new Set([
    "https://calvorotool.com",
    "https://www.calvorotool.com",
  ]);

  try {
    allowedOrigins.add(new URL(getConfig(env).siteUrl).origin);
  } catch {
    // Ignore a malformed configured site URL.
  }

  if (allowedOrigins.has(originUrl.origin)) return true;
  if (originUrl.origin === requestUrl.origin) return true;

  const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

  return (
    localHosts.has(originUrl.hostname) &&
    localHosts.has(requestUrl.hostname)
  );
}

function cleanText(value, maxLength = 500) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function resolveHttpUrl(value, baseUrl) {
  try {
    const resolved = new URL(String(value || ""), baseUrl);

    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") {
      return "";
    }

    return resolved.toString().slice(0, 1_000);
  } catch {
    return "";
  }
}

function createTextDecoder(contentType) {
  const match = /charset\s*=\s*"?([^";\s]+)/i.exec(
    contentType || ""
  );

  if (match) {
    try {
      return new TextDecoder(match[1].trim());
    } catch {
      // Fall back to UTF-8 for an unsupported charset label.
    }
  }

  return new TextDecoder("utf-8");
}

async function readLimitedText(response, maxBytes, contentType) {
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = createTextDecoder(contentType);
  let total = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      total += value.byteLength;

      if (total > maxBytes) {
        await reader.cancel();
        throw new ApiError(
          413,
          "The page is larger than the 1 MB limit."
        );
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error?.name === "AbortError") {
      throw new ApiError(
        504,
        "The website did not respond before the timeout."
      );
    }

    throw new ApiError(502, "The page could not be read.");
  }
}

function collectJsonLdTypes(value, types, depth = 0) {
  if (!value || typeof value !== "object" || depth > 8) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) =>
      collectJsonLdTypes(item, types, depth + 1)
    );
    return;
  }

  const type = value["@type"];

  if (typeof type === "string") {
    types.add(type);
  } else if (Array.isArray(type)) {
    type.forEach((item) => {
      if (typeof item === "string") types.add(item);
    });
  }

  if (Array.isArray(value["@graph"])) {
    collectJsonLdTypes(value["@graph"], types, depth + 1);
  }
}

async function extractMetadata(html, pageUrl) {
  const metadata = {
    title: "",
    description: "",
    canonical: "",
    robots: "",
    viewport: "",
    lang: "",
    favicon: "",
    og: {
      title: "",
      description: "",
      image: "",
      url: "",
      type: "",
      siteName: "",
    },
    twitter: {
      card: "",
      title: "",
      description: "",
      image: "",
    },
    h1: "",
    h1Count: 0,
    h2Count: 0,
    jsonLdCount: 0,
    jsonLdTypes: [],
  };

  const jsonLdBlocks = [];
  let titleOpen = false;
  let h1Open = false;
  let scriptIsJsonLd = false;

  const rewriter = new HTMLRewriter()
    .on("html", {
      element(element) {
        metadata.lang = cleanText(
          element.getAttribute("lang"),
          35
        );
      },
    })
    .on("title", {
      element(element) {
        titleOpen = true;
        element.onEndTag(() => {
          titleOpen = false;
        });
      },
      text(chunk) {
        if (titleOpen && metadata.title.length < 300) {
          metadata.title += chunk.text;
        }
      },
    })
    .on("meta", {
      element(element) {
        const name = (element.getAttribute("name") || "")
          .trim()
          .toLowerCase();
        const property = (element.getAttribute("property") || "")
          .trim()
          .toLowerCase();
        const content = cleanText(
          element.getAttribute("content"),
          1_000
        );

        if (!content) return;

        if (name === "description") {
          metadata.description = content;
        } else if (name === "robots") {
          metadata.robots = content;
        } else if (name === "viewport") {
          metadata.viewport = content;
        } else if (name === "twitter:card") {
          metadata.twitter.card = content;
        } else if (name === "twitter:title") {
          metadata.twitter.title = content;
        } else if (name === "twitter:description") {
          metadata.twitter.description = content;
        } else if (name === "twitter:image") {
          metadata.twitter.image = content;
        } else if (property === "og:title") {
          metadata.og.title = content;
        } else if (property === "og:description") {
          metadata.og.description = content;
        } else if (property === "og:image") {
          metadata.og.image = content;
        } else if (property === "og:url") {
          metadata.og.url = content;
        } else if (property === "og:type") {
          metadata.og.type = content;
        } else if (property === "og:site_name") {
          metadata.og.siteName = content;
        }
      },
    })
    .on("link", {
      element(element) {
        const relationships = (element.getAttribute("rel") || "")
          .toLowerCase()
          .split(/\s+/);
        const href = element.getAttribute("href") || "";

        if (relationships.includes("canonical")) {
          metadata.canonical = resolveHttpUrl(href, pageUrl);
        }

        if (
          relationships.includes("icon") ||
          relationships.includes("shortcut")
        ) {
          metadata.favicon = resolveHttpUrl(href, pageUrl);
        }
      },
    })
    .on("h1", {
      element(element) {
        metadata.h1Count += 1;

        if (metadata.h1Count === 1) {
          h1Open = true;
          element.onEndTag(() => {
            h1Open = false;
          });
        }
      },
      text(chunk) {
        if (h1Open && metadata.h1.length < 300) {
          metadata.h1 += chunk.text;
        }
      },
    })
    .on("h2", {
      element() {
        metadata.h2Count += 1;
      },
    })
    .on("script", {
      element(element) {
        const type = (element.getAttribute("type") || "")
          .trim()
          .toLowerCase();

        scriptIsJsonLd =
          type === "application/ld+json" &&
          jsonLdBlocks.length < METADATA_MAX_JSON_LD_BLOCKS;

        if (scriptIsJsonLd) {
          jsonLdBlocks.push("");
        }

        element.onEndTag(() => {
          scriptIsJsonLd = false;
        });
      },
      text(chunk) {
        if (!scriptIsJsonLd) return;

        const index = jsonLdBlocks.length - 1;
        const block = jsonLdBlocks[index];

        if (block.length < 60_000) {
          jsonLdBlocks[index] = block + chunk.text;
        }
      },
    });

  await rewriter.transform(new Response(html)).text();

  metadata.title = cleanText(metadata.title, 300);
  metadata.description = cleanText(metadata.description, 1_000);
  metadata.canonical = resolveHttpUrl(metadata.canonical, pageUrl);
  metadata.og.image = resolveHttpUrl(metadata.og.image, pageUrl);
  metadata.og.url = resolveHttpUrl(metadata.og.url, pageUrl);
  metadata.twitter.image = resolveHttpUrl(
    metadata.twitter.image,
    pageUrl
  );
  metadata.h1 = cleanText(metadata.h1, 300);

  const jsonLdTypes = new Set();

  jsonLdBlocks.forEach((block) => {
    try {
      collectJsonLdTypes(JSON.parse(block), jsonLdTypes);
    } catch {
      // Ignore malformed JSON-LD; the page can still be audited.
    }
  });

  metadata.jsonLdCount = jsonLdBlocks.length;
  metadata.jsonLdTypes = [...jsonLdTypes].slice(0, 12);

  return metadata;
}

async function fetchMetadataDocument(targetUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    METADATA_TIMEOUT_MS
  );
  const redirects = [];
  const startedAt = Date.now();
  let currentUrl = targetUrl;

  try {
    await resolveMetadataTarget(currentUrl, controller.signal, false);

    for (
      let hop = 0;
      hop <= METADATA_MAX_REDIRECTS;
      hop += 1
    ) {
      let response;

      try {
        response = await fetch(currentUrl.toString(), {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: METADATA_FETCH_HEADERS,
        });
      } catch (error) {
        if (error?.name === "AbortError") {
          throw new ApiError(
            504,
            "The website did not respond before the timeout."
          );
        }

        throw new ApiError(502, "The website could not be reached.");
      }

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");

        if (!location) {
          throw new ApiError(
            502,
            "The website returned a redirect without a destination."
          );
        }

        if (hop === METADATA_MAX_REDIRECTS) {
          throw new ApiError(
            502,
            "The website redirected too many times."
          );
        }

        let nextUrl;

        try {
          nextUrl = new URL(location, currentUrl);
        } catch {
          throw new ApiError(
            502,
            "The website returned an invalid redirect."
          );
        }

        try {
          nextUrl = validateMetadataUrl(nextUrl.toString());
        } catch {
          throw new ApiError(
            502,
            "The website redirected to a destination that cannot be checked."
          );
        }

        await resolveMetadataTarget(
          nextUrl,
          controller.signal,
          true
        );

        redirects.push({
          status: response.status,
          from: currentUrl.toString(),
          to: nextUrl.toString(),
        });

        if (response.body) {
          try {
            await response.body.cancel();
          } catch {
            // The redirect body is not needed.
          }
        }

        currentUrl = nextUrl;
        continue;
      }

      if (response.status === 204 || response.status === 205) {
        throw new ApiError(
          502,
          "The page returned no content to inspect."
        );
      }

      const contentType =
        response.headers.get("content-type") || "";

      if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
        throw new ApiError(
          422,
          "The URL did not return an HTML page."
        );
      }

      const html = await readLimitedText(
        response,
        METADATA_MAX_BYTES,
        contentType
      );
      const metadata = await extractMetadata(
        html,
        currentUrl.toString()
      );

      return {
        requestUrl: targetUrl.toString(),
        finalUrl: currentUrl.toString(),
        status: response.status,
        redirects,
        contentType,
        contentLanguage:
          response.headers.get("content-language") || "",
        xRobotsTag: response.headers.get("x-robots-tag") || "",
        elapsedMs: Date.now() - startedAt,
        metadata,
      };
    }

    throw new ApiError(502, "The website redirected too many times.");
  } finally {
    clearTimeout(timeout);
  }
}

const fallbackMetadataRateBuckets = new Map();

function getMetadataRateLimitKey(request) {
  return (request.headers.get("cf-connecting-ip") || "unknown").slice(
    0,
    64
  );
}

function consumeFallbackMetadataRateLimit(key) {
  const now = Date.now();
  const bucket = fallbackMetadataRateBuckets.get(key);

  if (!bucket || now - bucket.windowStart >= METADATA_RATE_WINDOW_MS) {
    fallbackMetadataRateBuckets.set(key, {
      windowStart: now,
      count: 1,
    });

    if (fallbackMetadataRateBuckets.size > 5_000) {
      for (const bucketKey of fallbackMetadataRateBuckets.keys()) {
        fallbackMetadataRateBuckets.delete(bucketKey);

        if (fallbackMetadataRateBuckets.size <= 4_000) break;
      }
    }

    return true;
  }

  bucket.count = Math.min(
    bucket.count + 1,
    METADATA_RATE_LIMIT + 1
  );
  return bucket.count <= METADATA_RATE_LIMIT;
}

async function isMetadataRateLimitAllowed(request, env) {
  const key = getMetadataRateLimitKey(request);
  const limiter = env?.[METADATA_RATE_LIMIT_KEY];

  if (limiter && typeof limiter.limit === "function") {
    try {
      const outcome = await limiter.limit({ key });
      return Boolean(outcome?.success);
    } catch (error) {
      console.error(
        "CALVORO metadata rate limiter error:",
        error?.message
      );
    }
  }

  return consumeFallbackMetadataRateLimit(key);
}

async function handleMetadataRequest(request, env) {
  if (!isMetadataOriginAllowed(request, env)) {
    throw new ApiError(
      403,
      "This endpoint is only available from CALVORO."
    );
  }

  if (!(await isMetadataRateLimitAllowed(request, env))) {
    throw new ApiError(
      429,
      "Too many metadata checks. Please wait a minute and try again."
    );
  }

  const contentType = request.headers.get("content-type") || "";

  if (!/^application\/json\b/i.test(contentType)) {
    throw new ApiError(
      415,
      "Send the URL as a JSON request body."
    );
  }

  const data = await readJsonBody(request, METADATA_BODY_LIMIT);
  const targetUrl = validateMetadataUrl(data.url);
  const result = await fetchMetadataDocument(targetUrl);

  return metadataJsonResponse(200, {
    success: true,
    ...result,
  });
}

async function handleApi(request, env) {
  const url = new URL(request.url);
  const endpoint =
    url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    if (endpoint === SITE_METADATA_ENDPOINT) {
      return new Response(null, {
        status: 204,
        headers: {
          Allow: "POST, OPTIONS",
          "Cache-Control": "no-store",
          Vary: "Origin",
        },
      });
    }

    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (endpoint === SITE_METADATA_ENDPOINT) {
    if (method !== "POST") {
      return metadataJsonResponse(
        405,
        {
          error:
            "Method not allowed. Use POST for this endpoint.",
        },
        { Allow: "POST, OPTIONS" }
      );
    }

    try {
      return await handleMetadataRequest(request, env);
    } catch (error) {
      if (error instanceof ApiError) {
        return metadataJsonResponse(
          error.statusCode,
          { error: error.message },
          error.statusCode === 429
            ? { "Retry-After": "60" }
            : {}
        );
      }

      console.error("CALVORO metadata checker error:", error);

      return metadataJsonResponse(500, {
        error: "The metadata check failed.",
      });
    }
  }

  if (
    method === "GET" &&
    (endpoint === "/api" || endpoint === "/api/health")
  ) {
    return jsonResponse(200, {
      success: true,
      status: "ok",
      service: "CALVORO",
      message: "CALVORO AI function is working.",
      aiConfigured: Boolean(getConfig(env).apiKey),
    });
  }

  if (AI_ENDPOINTS.has(endpoint)) {
    if (method !== "POST") {
      return jsonResponse(
        405,
        {
          error:
            "Method not allowed. Use POST for this endpoint.",
        },
        { Allow: "POST, OPTIONS" }
      );
    }

    try {
      return await handleAiRequest(endpoint, request, env);
    } catch (error) {
      if (error instanceof ApiError) {
        return jsonResponse(error.statusCode, {
          error: error.message,
        });
      }

      console.error("CALVORO AI function error:", error);

      return jsonResponse(500, {
        error: "CALVORO AI server error.",
      });
    }
  }

  return jsonResponse(404, {
    error: "CALVORO endpoint not found.",
  });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (
      pathname === "/api" ||
      pathname.startsWith("/api/")
    ) {
      return handleApi(request, env);
    }

    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(request);
    }

    return jsonResponse(404, {
      error: "Not found.",
    });
  },
};
