
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CALVORO AI server is working!",
  });
});

app.post("/api/summarize", async (req, res) => {
  console.log("🤖 Summarize request received");

  try {
    const { text } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        error: "Please enter at least 20 characters.",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },

        body: JSON.stringify({
          model:
            "nvidia/nemotron-3-super-120b-a12b:free",

          messages: [
            {
              role: "system",
              content:
                "You are CALVORO AI. Summarize text accurately and clearly. Never invent facts.",
            },

            {
              role: "user",
              content:
                `Summarize this text:\n\n${text}`,
            },
          ],
        }),
      }
    );

    console.log(
      "OpenRouter status:",
      response.status
    );

    const data = await response.json();

    console.log(
      "OpenRouter response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed.",
      });
    }

    const summary =
      data?.choices?.[0]?.message?.content;

    console.log(
      "Extracted summary:",
      summary
    );

    if (
      typeof summary !== "string" ||
      summary.trim() === ""
    ) {
      return res.status(500).json({
        error:
          "OpenRouter returned no usable summary.",
      });
    }

    return res.json({
      summary: summary.trim(),
    });

  } catch (error) {
    console.error(
      "❌ AI SERVER ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "CALVORO AI server error.",
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("================================");
  console.log("🚀 CALVORO AI SERVER");
  console.log("http://localhost:5050");
  console.log("================================");
  console.log("");
});

