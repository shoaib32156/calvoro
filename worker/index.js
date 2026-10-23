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

async function readJsonBody(request) {
  const contentLength = Number(
    request.headers.get("content-length") || 0
  );

  if (contentLength > MAX_BODY_SIZE) {
    throw new ApiError(413, "Request body is too large.");
  }

  const body = await request.text();

  if (new TextEncoder().encode(body).length > MAX_BODY_SIZE) {
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

async function handleApi(request, env) {
  const url = new URL(request.url);
  const endpoint =
    url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
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
