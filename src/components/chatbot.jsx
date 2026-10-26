import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_RENDER_API_URL}/chat`, {
        input: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to get a response. Please try again.",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col p-4">
      <div className="mb-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`text-sm ${
              msg.role === "user" ? "text-blue-600" : "text-green-600"
            }`}
          >
            <span className="font-bold capitalize">{msg.role}:</span>{" "}
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex shrink-0 space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about monsoons..."
          className="flex-1 border border-gray-300 rounded w-12 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;