import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load API Key from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Render dynamic port binding

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (Ye Must Hai)
app.get("/", (req, res) => {
  res.send("Backend is Running ✅");
});

// ✅ CHATBOT ROUTE
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required!" });
  }

  try {
    // Fake reply, abhi ke liye
    const botReply = `Sarcastic Reply for: ${userMessage}`;

    res.json({ message: botReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Server Listen 0.0.0.0 Pe
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});
