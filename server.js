import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config(); // Load API Key from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Dynamic port binding for Render

app.use(cors());
app.use(express.json());

// Initialize Hugging Face inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Hugging Face API Call Function
const fetchSarcasticReply = async (userMessage) => {
  try {
    const response = await hf.textGeneration({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Popular open-source model
      inputs: `[INST] <<SYS>>
      You are a sarcastic and dark-humored AI and can also reply in Hinglish when required. Keep responses short and witty.
      <</SYS>>
      ${userMessage} [/INST]`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.9,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    const botReply = response.generated_text.trim();
    return botReply;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Arre bhai, AI ne galti kar di... thoda time de phir try karna! 😅";
  }
};

// Chatbot API Route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("User:", userMessage);

  const aiReply = await fetchSarcasticReply(userMessage);
  console.log("Bot:", aiReply);

  res.json({ message: aiReply });
});

// ✅ Correct Port Binding for Render Deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});
