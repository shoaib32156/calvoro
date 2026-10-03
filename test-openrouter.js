
import dotenv from "dotenv";

dotenv.config();

console.log(
  "OPENROUTER KEY FOUND:",
  !!process.env.OPENROUTER_API_KEY
);

const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: "Say hello in one short sentence.",
        },
      ],
    }),
  }
);

console.log("STATUS:", response.status);
console.log("RESPONSE:");
console.log(await response.text());

