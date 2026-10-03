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

async function callOpenRouter(prompt) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing from .env");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:5174",
      "X-Title": "CALVORO",
    },

    body: JSON.stringify({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content:
            "You are CALVORO AI, a helpful and accurate writing assistant.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const raw = await response.text();

  console.log("OpenRouter status:", response.status);

  if (!raw.trim()) {
    throw new Error(
      `OpenRouter returned an empty response (HTTP ${response.status}).`
    );
  }

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(
      `OpenRouter returned invalid JSON: ${raw.slice(0, 300)}`
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        `OpenRouter request failed (HTTP ${response.status}).`
    );
  }

  const content =
    data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter returned no AI text.");
  }

  return content.trim();
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    return sendJson(response, 204, {});
  }

  if (request.method === "GET" && request.url === "/") {
    return sendJson(response, 200, {
      success: true,
      message: "CALVORO AI server is working",
    });
  }

  if (
    request.method === "POST" &&
    (
      request.url === "/api/summarize" ||
      request.url === "/api/rewrite"
    )
  ) {
    try {
      const body = await readBody(request);

      const data = JSON.parse(body || "{}");

      if (!data.text || !String(data.text).trim()) {
        return sendJson(response, 400, {
          error: "Please enter some text.",
        });
      }

      const inputText = String(data.text).trim();

      let prompt;

      if (request.url === "/api/summarize") {
        prompt = `Summarize the following text accurately and clearly.

Keep the important information.
Use simple, natural language.
Return only the summary.

TEXT:
${inputText}`;
      } else {
        const tone = data.tone || "Professional";

        prompt = `Rewrite the following text in a ${tone} tone.

Preserve the original meaning.
Improve clarity, grammar, and readability.
Do not add unrelated information.
Return only the rewritten text.

TEXT:
${inputText}`;
      }

      const aiText = await callOpenRouter(prompt);

      if (request.url === "/api/rewrite") {
        return sendJson(response, 200, {
          result: aiText,
        });
      }

      return sendJson(response, 200, {
        summary: aiText,
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

  return sendJson(response, 404, {
    error: "Not found",
  });
});

server.listen(PORT, () => {
  console.log(
    `CALVORO AI RUNNING ON http://localhost:${PORT}`
  );
});