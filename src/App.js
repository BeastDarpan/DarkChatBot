import React, { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Speech Recognition (STT) Disabled
  // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  // recognition.lang = "en-IN"; // Hinglish support
  // recognition.continuous = false;
  // recognition.interimResults = false;

  // recognition.onresult = (event) => {
  //   const speechText = event.results[0][0].transcript;
  //   setInput(speechText);
  //   sendMessage(speechText);
  // };

  // const startListening = () => {
  //   recognition.start();
  // };

  // Text-to-Speech (TTS) Disabled
  // const speak = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-IN";
  //   speechSynthesis.speak(utterance);
  // };

  // Send message to backend
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.message };
      setMessages((prev) => [...prev, botMessage]);
      // Speak function is now disabled, so no TTS will happen
      // speak(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Bhai, server so raha hai. Try again later! 🤖" }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">Sarcastic Hinglish Bot 🤖</h1>
      <div className="w-full max-w-xl bg-gray-800 p-5 rounded-lg">
        <div className="h-80 overflow-y-auto mb-4 p-2 border border-gray-600 rounded">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span className={`${msg.sender === "user" ? "bg-blue-500" : "bg-green-500"} p-2 rounded-lg`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          {/* Disabled voice recognition button */}
          {/* <button onClick={startListening} className="bg-red-500 p-2 rounded mr-2">🎤</button> */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 rounded bg-gray-700 text-white"
            placeholder="Type a message..."
          />
          <button onClick={() => sendMessage(input)} className="bg-blue-500 p-2 rounded ml-2">Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
