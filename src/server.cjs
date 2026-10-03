
require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 5050;

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const SITE_URL =
  process.env.SITE_URL || "http://localhost:5174";

const DIST_DIR = path.resolve(__dirname, "..", "dist");

const MAX_BODY_SIZE = 2_000_000;
const AI_TIMEOUT_MS = 45_000;
const MAX_RETRIES = 4;

const AI_ENDPOINTS = [
  "/api/summarize",
  "/api/rewrite",
  "/api/grammar",
  "/api/translate",
  "/api/generate",
  "/api/email-writer",
];

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store",
  });

  response.end(JSON.stringify(data));
}

function sendText(response, statusCode, text, contentType = "text/plain") {
  response.writeHead(statusCode, {
    "Content-Type": `${contentType}; charset=utf-8`,
    "Cache-Control": "no-store",
  });

  response.end(text);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  };

  return types[extension] || "application/octet-stream";
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

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let settled = false;

    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    const succeed = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    request.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body, "utf8") > MAX_BODY_SIZE) {
        fail(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      succeed(body);
    });

    request.on("error", fail);
    request.on("aborted", () => {
      fail(new Error("Request was aborted."));
    });
  });
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

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
  const content =
    data?.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    const trimmed = content.trim();

    if (trimmed) {
      return trimmed;
    }
  }

  if (Array.isArray(content)) {
    const combined = content
      .map((part) => {
        if (typeof part === "string") return part;

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

async function callOpenRouter(prompt) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is missing from the environment."
    );
  }

  let lastError =
    "The AI provider did not return a usable response.";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(
        OPENROUTER_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": SITE_URL,
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

            // Ask OpenRouter to prefer reliable provider routing.
            provider: {
              allow_fallbacks: true,
            },

            // Prevent unusually long generations.
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
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        lastError =
          "The AI request timed out.";
      } else {
        lastError =
          error?.message ||
          "The AI connection failed.";
      }

      console.error(
        `OpenRouter attempt ${attempt} error:`,
        lastError
      );
    }

    if (attempt < MAX_RETRIES) {
      // 2s, 4s, 6s between retries.
      await sleep(attempt * 2000);
    }
  }

  throw new Error(
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

    const tone =
      data.tone || "Professional";

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

    const language =
      data.language || "Spanish";

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

    const type =
      data.type || "Short Article";

    const tone =
      data.tone || "Professional";

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

  const purpose =
    String(data.purpose).trim();

  const tone =
    data.tone || "Professional";

  const length =
    data.length || "Medium";

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
    (
      !data.text ||
      !String(data.text).trim()
    )
  ) {
    return "Please enter some text.";
  }

  if (
    endpoint === "/api/generate" &&
    (
      !data.topic ||
      !String(data.topic).trim()
    )
  ) {
    return "Please enter a topic or idea.";
  }

  if (
    endpoint === "/api/email-writer" &&
    (
      !data.purpose ||
      !String(data.purpose).trim()
    )
  ) {
    return "Please describe what the email should say.";
  }

  return null;
}

function safePathFromUrl(urlPath) {
  try {
    const parsed = new URL(
      urlPath,
      "http://localhost"
    );

    return decodeURIComponent(
      parsed.pathname
    );
  } catch {
    return "/";
  }
}

function serveFile(response, filePath, cacheControl = "no-cache") {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      return serveSpa(response);
    }

    const contentType =
      getContentType(filePath);

    response.writeHead(200, {
      "Content-Type":
        `${contentType}; charset=utf-8`,
      "Cache-Control": cacheControl,
    });

    fs.createReadStream(filePath)
      .on("error", () => {
        if (!response.headersSent) {
          sendText(
            response,
            500,
            "CALVORO server error."
          );
        } else {
          response.destroy();
        }
      })
      .pipe(response);
  });
}

function serveSpa(response) {
  const indexFile =
    path.join(DIST_DIR, "index.html");

  fs.stat(indexFile, (error, stats) => {
    if (error || !stats.isFile()) {
      return sendText(
        response,
        503,
        "CALVORO frontend is not built yet. Run npm run build."
      );
    }

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });

    fs.createReadStream(indexFile)
      .on("error", () => {
        if (!response.headersSent) {
          sendText(
            response,
            500,
            "CALVORO frontend error."
          );
        } else {
          response.destroy();
        }
      })
      .pipe(response);
  });
}

const server = http.createServer(
  async (request, response) => {
    try {
      if (request.method === "OPTIONS") {
        response.writeHead(204, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        });

        return response.end();
      }

      const endpoint =
        safePathFromUrl(request.url);

      // ==================================================
      // HEALTH CHECK
      // ==================================================

      if (
        request.method === "GET" &&
        (
          endpoint === "/" ||
          endpoint === "/api/health"
        )
      ) {
        return sendJson(response, 200, {
          success: true,
          status: "ok",
          service: "CALVORO",
          message: "CALVORO server is working.",
          aiConfigured:
            Boolean(
              process.env.OPENROUTER_API_KEY
            ),
        });
      }

      // ==================================================
      // AI ENDPOINTS
      // ==================================================

      if (
        request.method === "POST" &&
        AI_ENDPOINTS.includes(endpoint)
      ) {
        const body =
          await readBody(request);

        let data;

        try {
          data = JSON.parse(body || "{}");
        } catch {
          return sendJson(response, 400, {
            error: "Invalid request data.",
          });
        }

        const validationError =
          validateRequest(endpoint, data);

        if (validationError) {
          return sendJson(response, 400, {
            error: validationError,
          });
        }

        const prompt =
          buildPrompt(endpoint, data);

        const aiText =
          await callOpenRouter(prompt);

        if (!aiText) {
          return sendJson(response, 502, {
            error:
              "The AI provider returned an empty response. Please try again.",
          });
        }

        if (endpoint === "/api/summarize") {
          return sendJson(response, 200, {
            summary: aiText,
          });
        }

        return sendJson(response, 200, {
          result: aiText,
        });
      }

      // ==================================================
      // STATIC FRONTEND
      // ==================================================

      if (request.method === "GET") {
        const pathname = endpoint;

        // Existing real files in /dist
        const requestedFile =
          path.normalize(
            path.join(
              DIST_DIR,
              pathname
            )
          );

        // Prevent path traversal outside /dist.
        if (
          requestedFile.startsWith(
            DIST_DIR + path.sep
          )
        ) {
          fs.stat(
            requestedFile,
            (error, stats) => {
              if (
                !error &&
                stats.isFile()
              ) {
                const isAsset =
                  pathname.startsWith(
                    "/assets/"
                  );

                return serveFile(
                  response,
                  requestedFile,
                  isAsset
                    ? "public, max-age=31536000, immutable"
                    : "no-cache"
                );
              }

              return serveSpa(response);
            }
          );

          return;
        }

        return serveSpa(response);
      }

      return sendJson(response, 404, {
        error:
          "CALVORO endpoint not found.",
      });
    } catch (error) {
      console.error(
        "CALVORO server error:",
        error?.stack || error?.message
      );

      return sendJson(response, 500, {
        error:
          error?.message ||
          "CALVORO AI server error.",
      });
    }
  }
);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use.`
    );
  } else {
    console.error(
      "CALVORO server error:",
      error?.message
    );
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `CALVORO SERVER RUNNING ON PORT ${PORT}`
  );

  console.log(
    `Health check: http://localhost:${PORT}/api/health`
  );

  console.log(
    `Frontend build directory: ${DIST_DIR}`
  );
});

