
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Check API key
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY is missing.");
  console.error(
    "Make sure your .env file is here:"
  );
  console.error(
    "C:\\Users\\HASSAN COMPUTERS\\calvoro\\.env"
  );
  process.exit(1);
}

console.log("✅ OpenRouter API key found.");

// Home / health check
app.get("/", (req, res) => {
  res.json({
    message: "CALVORO AI server is running.",
    provider: "OpenRouter",
    model: "nvidia/nemotron-3-super-120b-a12b:free",
  });
});

// AI SUMMARIZER
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, length = "medium" } = req.body;

    // Validate text
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        error: "Please provide some text to summarize.",
      });
    }

    if (text.trim().length < 20) {
      return res.status(400).json({
        error: "Please enter at least 20 characters.",
      });
    }

    // Summary length
    let lengthInstruction;

    if (length === "short") {
      lengthInstruction =
        "Create a short summary with only the most important points.";
    } else if (length === "long") {
      lengthInstruction =
        "Create a detailed summary containing the important facts, ideas, and context.";
    } else {
      lengthInstruction =
        "Create a balanced summary containing the main ideas and important details.";
    }

    // OpenRouter request
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "HTTP-Referer":
            "http://localhost:5174",

          "X-Title":
            "CALVORO AI",
        },

        body: JSON.stringify({
          model:
            "nvidia/nemotron-3-super-120b-a12b:free",

          messages: [
            {
              role: "system",
              content:
                "You are CALVORO AI Text Summarizer. " +
                "Summarize accurately and clearly. " +
                "Never invent facts. " +
                "Preserve the meaning of the original text. " +
                "Do not mention that you are an AI unless necessary.",
            },

            {
              role: "user",
              content:
                `${lengthInstruction}

Summarize the following text:

${text}`,
            },
          ],
        }),
      }
    );

    // Read response
    const data = await response.json();

    console.log(
      "OpenRouter status:",
      response.status
    );

    // Handle API error
    if (!response.ok) {
      console.error(
        "OpenRouter error:",
        data
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          `OpenRouter request failed with status ${response.status}.`,
      });
    }

    // Get summary
    const summary =
      data?.choices?.[0]?.message?.content?.trim();

    // Check summary
    if (!summary) {
      console.error(
        "OpenRouter returned no summary:",
        data
      );

      return res.status(500).json({
        error:
          "The AI returned an empty response.",
      });
    }

    // Success
    console.log(
      "✅ CALVORO AI summary generated successfully."
    );

    return res.json({
      summary: summary,
    });

  } catch (error) {
    console.error(
      "❌ CALVORO AI server error:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong while contacting OpenRouter.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log(
    "🚀 CALVORO AI server running on:"
  );
  console.log(
    `http://localhost:${PORT}`
  );
  console.log("");
  console.log(
    "🤖 Provider: OpenRouter"
  );
  console.log(
    "🧠 Model: NVIDIA Nemotron 3 Super (Free)"
  );
  console.log("");
});

