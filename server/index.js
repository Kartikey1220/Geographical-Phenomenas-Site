import express from "express";
import axios from "axios";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();
const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ credentials: true, origin: corsOrigin }));
app.use(express.json());
console.log("OpenAI API key loaded:", Boolean(process.env.OPENAI_API_KEY));

app.post("/chat", async (req, res) => {
  try {
    const { input } = req.body;
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are a helpful chatbot.

  Rules:
  - Answer in simple plain English.
  - Do not use Markdown.
  - Do not use headings.
  - Do not use bullet points.
  - Do not use tables.
  - Do not use bold text.
  - Keep answers conversational.
  - Maximum 120 words unless the user asks for detail.
  `,
          },
          {
            role: "user",
            content: input,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    res.json({
      answer: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error.response?.data || error);
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
