
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

// HOME TEST
app.get("/", (req, res) => {
  res.json({
    message: "CALVORO AI server is running.",
    provider: "OpenRouter",
    model: "nvidia/nemotron-3-super-120b-a12b:free",
  });
});

// API TEST
app.get("/api/test", (req, res) => {
  console.log("✅ /api/test reached!");

  res.json({
    success: true,
    message: "CALVORO API connection is working!",
  });
});

// AI SUMMARIZER
app.post("/api/summarize", async (req, res) => {
  console.log("🤖 /api/summarize request received");

  try {
    const { text } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        error: "Please enter at least 20 characters.",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY is missing.",
      });
    }

    console.log("🚀 Sending request to OpenRouter...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5174",
          "X-Title": "CALVORO AI",
        },

        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",

          messages: [
            {
              role: "system",
              content:
                "You are CALVORO AI. Summarize text accurately and clearly. Never invent facts.",
            },
            {
              role: "user",
              content:
                `Summarize the following text clearly and concisely:\n\n${text}`,
            },
          ],
        }),
      }
    );

    console.log(
      "OpenRouter response status:",
      response.status
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed.",
      });
    }

    const summary =
      data?.choices?.[0]?.message?.content?.trim();

    if (!summary) {
      return res.status(500).json({
        error: "OpenRouter returned an empty response.",
      });
    }

    console.log("✅ AI summary generated!");

    return res.json({
      summary,
    });

  } catch (error) {
    console.error("❌ Server error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "CALVORO AI server error.",
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log("🚀 CALVORO AI SERVER RUNNING");
  console.log(`http://localhost:${PORT}`);
  console.log("🤖 Provider: OpenRouter");
  console.log(
    "🧠 Model: NVIDIA Nemotron 3 Super (Free)"
  );
  console.log("=================================");
  console.log("");
});

