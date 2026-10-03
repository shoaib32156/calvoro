const CALVORO_OPENROUTER_API_KEY =
  process.env.CALVORO_OPENROUTER_API_KEY;

const OPENROUTER_BASE_URL =
  process.env.CALVORO_OPENROUTER_BASE_URL ||
  "https://openrouter.ai/api/v1";

const OPENROUTER_URL =
  `${OPENROUTER_BASE_URL}/chat/completions`;

const SITE_URL =
  process.env.SITE_URL ||
  process.env.URL ||
  "https://calvorotool.com";

const MAX_BODY_SIZE = 2_000_000;
const AI_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;

const AI_ENDPOINTS = [
  "/api/summarize",
  "/api/rewrite",
  "/api/grammar",
  "/api/translate",
  "/api/generate",
  "/api/email-writer",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Cache-Control": "no-store",
};

function jsonResponse(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
    body: JSON.stringify(data),
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

function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeout);
  });
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

async function callOpenRouter(prompt) {
  if (!CALVORO_OPENROUTER_API_KEY) {
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
            Authorization: `Bearer ${CALVORO_OPENROUTER_API_KEY}`,
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

        lastError = "OpenRouter returned an empty AI response.";
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        lastError = "The AI request timed out.";
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

function getEndpoint(event) {
  let pathname = event?.path || "/";

  pathname = pathname.split("?")[0];

  pathname = pathname.replace(
    /^\/\.netlify\/functions\/api/,
    ""
  );

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (pathname === "/") {
    return "/";
  }

  if (!pathname.startsWith("/api/")) {
    pathname = `/api${pathname}`;
  }

  return pathname;
}

function getRequestBody(event) {
  if (!event?.body) {
    return "";
  }

  if (event.isBase64Encoded) {
    return Buffer.from(event.body, "base64").toString("utf8");
  }

  return event.body;
}

exports.handler = async (event) => {
  try {
    const method = event?.httpMethod || "GET";
    const endpoint = getEndpoint(event);

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: CORS_HEADERS,
        body: "",
      };
    }

    if (
      method === "GET" &&
      (endpoint === "/" || endpoint === "/api/health")
    ) {
      return jsonResponse(200, {
        success: true,
        status: "ok",
        service: "CALVORO",
        message: "CALVORO AI function is working.",
        aiConfigured: Boolean(
          CALVORO_OPENROUTER_API_KEY
        ),
      });
    }

    if (
      method === "POST" &&
      AI_ENDPOINTS.includes(endpoint)
    ) {
      const body = getRequestBody(event);

      if (
        Buffer.byteLength(body, "utf8") > MAX_BODY_SIZE
      ) {
        return jsonResponse(413, {
          error: "Request body is too large.",
        });
      }

      let data;

      try {
        data = JSON.parse(body || "{}");
      } catch {
        return jsonResponse(400, {
          error: "Invalid request data.",
        });
      }

      const validationError = validateRequest(
        endpoint,
        data
      );

      if (validationError) {
        return jsonResponse(400, {
          error: validationError,
        });
      }

      const prompt = buildPrompt(endpoint, data);
      const aiText = await callOpenRouter(prompt);

      if (!aiText) {
        return jsonResponse(502, {
          error:
            "The AI provider returned an empty response. Please try again.",
        });
      }

      if (endpoint === "/api/summarize") {
        return jsonResponse(200, {
          summary: aiText,
        });
      }

      return jsonResponse(200, {
        result: aiText,
      });
    }

    return jsonResponse(404, {
      error: "CALVORO endpoint not found.",
    });
  } catch (error) {
    console.error(
      "CALVORO function error:",
      error?.stack || error?.message
    );

    return jsonResponse(500, {
      error:
        error?.message ||
        "CALVORO AI server error.",
    });
  }
};
