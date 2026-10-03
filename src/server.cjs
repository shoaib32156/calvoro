
require("dotenv").config();

const http = require("http");

const PORT = 5050;

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });

  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 2_000_000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callOpenRouter(prompt) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is missing from .env"
    );
  }

  let lastError = "AI request failed.";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 45_000);

      const response = await fetch(
        OPENROUTER_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer":
              "http://localhost:5174",
            "X-Title": "CALVORO",
          },

          body: JSON.stringify({
            model: "openrouter/free",

            messages: [
              {
                role: "system",
                content:
                  "You are CALVORO AI, a helpful, accurate, clear, and safe writing assistant.",
              },

              {
                role: "user",
                content: prompt,
              },
            ],
          }),

          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      const raw = await response.text();

      console.log(
        `OpenRouter attempt ${attempt} status:`,
        response.status
      );

      if (!raw.trim()) {
        lastError =
          `OpenRouter returned an empty response (HTTP ${response.status}).`;
      } else {
        let data = null;

        try {
          data = JSON.parse(raw);
        } catch {
          lastError =
            "OpenRouter returned an invalid response.";
        }

        if (data) {
          if (response.ok) {
            const content =
              data?.choices?.[0]?.message?.content;

            if (content) {
              return content.trim();
            }

            lastError =
              "OpenRouter returned no AI text.";
          } else {
            lastError =
              data?.error?.message ||
              `OpenRouter request failed (HTTP ${response.status}).`;

            if (
              response.status !== 429 &&
              response.status !== 500 &&
              response.status !== 502 &&
              response.status !== 503 &&
              response.status !== 504
            ) {
              break;
            }
          }
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        lastError =
          "AI request timed out.";
      } else {
        lastError =
          error.message ||
          "AI connection failed.";
      }
    }

    if (attempt < 3) {
      await sleep(attempt * 1500);
    }
  }

  throw new Error(
    `${lastError} Please try again in a moment.`
  );
}

const server = http.createServer(
  async (request, response) => {
    // ================================================
    // OPTIONS
    // ================================================

    if (request.method === "OPTIONS") {
      return sendJson(response, 204, {});
    }

    // ================================================
    // HEALTH CHECK
    // ================================================

    if (
      request.method === "GET" &&
      request.url === "/"
    ) {
      return sendJson(response, 200, {
        success: true,
        message:
          "CALVORO AI server is working",
      });
    }

    // ================================================
    // ALL AI ENDPOINTS
    // ================================================

    const aiEndpoints = [
      "/api/summarize",
      "/api/rewrite",
      "/api/grammar",
      "/api/translate",
      "/api/generate",
      "/api/email-writer",
    ];

    if (
      request.method === "POST" &&
      aiEndpoints.includes(request.url)
    ) {
      try {
        const body = await readBody(request);

        let data;

        try {
          data = JSON.parse(body || "{}");
        } catch {
          return sendJson(response, 400, {
            error:
              "Invalid request data.",
          });
        }

        // ============================================
        // NORMAL TEXT VALIDATION
        // ============================================

        if (
          request.url !== "/api/generate" &&
          request.url !== "/api/email-writer" &&
          (
            !data.text ||
            !String(data.text).trim()
          )
        ) {
          return sendJson(response, 400, {
            error:
              "Please enter some text.",
          });
        }

        // ============================================
        // GENERATOR VALIDATION
        // ============================================

        if (
          request.url === "/api/generate" &&
          (
            !data.topic ||
            !String(data.topic).trim()
          )
        ) {
          return sendJson(response, 400, {
            error:
              "Please enter a topic or idea.",
          });
        }

        // ============================================
        // EMAIL WRITER VALIDATION
        // ============================================

        if (
          request.url === "/api/email-writer" &&
          (
            !data.purpose ||
            !String(data.purpose).trim()
          )
        ) {
          return sendJson(response, 400, {
            error:
              "Please describe what the email should say.",
          });
        }

        let prompt = "";

        // ============================================
        // SUMMARIZER
        // ============================================

        if (
          request.url === "/api/summarize"
        ) {
          const inputText =
            String(data.text).trim();

          prompt = `Summarize the following text accurately and clearly.

Keep the important information.
Use simple, natural language.
Return only the summary.

TEXT:
${inputText}`;
        }

        // ============================================
        // REWRITER
        // ============================================

        else if (
          request.url === "/api/rewrite"
        ) {
          const inputText =
            String(data.text).trim();

          const tone =
            data.tone ||
            "Professional";

          prompt = `Rewrite the following text in a ${tone} tone.

Preserve the original meaning.
Improve clarity, grammar, and readability.
Do not add unrelated information.
Return only the rewritten text.

TEXT:
${inputText}`;
        }

        // ============================================
        // GRAMMAR CHECKER
        // ============================================

        else if (
          request.url === "/api/grammar"
        ) {
          const inputText =
            String(data.text).trim();

          prompt = `Check the following text for grammar, spelling, punctuation, and sentence clarity.

Correct the mistakes while preserving the original meaning.
Do not add unrelated information.
Return only the corrected text.

TEXT:
${inputText}`;
        }

        // ============================================
        // TRANSLATOR
        // ============================================

        else if (
          request.url === "/api/translate"
        ) {
          const inputText =
            String(data.text).trim();

          const language =
            data.language ||
            "Spanish";

          prompt = `Translate the following text into ${language}.

Preserve the original meaning and tone.
Use natural, fluent language.
Do not explain the translation.
Return only the translated text.

TEXT:
${inputText}`;
        }

        // ============================================
        // TEXT GENERATOR
        // ============================================

        else if (
          request.url === "/api/generate"
        ) {
          const topic =
            String(data.topic).trim();

          const type =
            data.type ||
            "Short Article";

          const tone =
            data.tone ||
            "Professional";

          prompt = `Create a ${type} about the following topic.

Topic:
${topic}

Writing tone:
${tone}

Use clear, useful, natural language.
Stay focused on the topic.
Do not mention the AI process.
Return only the requested content.`;
        }

        // ============================================
        // EMAIL WRITER
        // ============================================

        else {
          const purpose =
            String(data.purpose).trim();

          const tone =
            data.tone ||
            "Professional";

          const length =
            data.length ||
            "Medium";

          prompt = `Write an email based on the following request.

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

        // ============================================
        // CALL OPENROUTER
        // ============================================

        const aiText =
          await callOpenRouter(prompt);

        // ============================================
        // SUMMARIZER RESPONSE
        // ============================================

        if (
          request.url === "/api/summarize"
        ) {
          return sendJson(response, 200, {
            summary: aiText,
          });
        }

        // ============================================
        // ALL OTHER AI RESPONSES
        // ============================================

        return sendJson(response, 200, {
          result: aiText,
        });

      } catch (error) {
        console.error(
          "CALVORO server error:",
          error.message
        );

        return sendJson(response, 500, {
          error:
            error.message ||
            "CALVORO AI server error.",
        });
      }
    }

    // ================================================
    // UNKNOWN ENDPOINT
    // ================================================

    return sendJson(response, 404, {
      error:
        "CALVORO AI endpoint not found.",
    });
  }
);

// ================================================
// SERVER ERROR
// ================================================

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      "Port 5050 is already in use. Stop the existing CALVORO AI server first."
    );
  } else {
    console.error(
      "CALVORO server error:",
      error.message
    );
  }
});

// ================================================
// START SERVER
// ================================================

server.listen(PORT, () => {
  console.log(
    `CALVORO AI RUNNING ON http://localhost:${PORT}`
  );
});

