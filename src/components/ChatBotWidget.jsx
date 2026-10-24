import React,{useState} from 'react'
import Chatbot from './chatbot'
const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}

         className="fixed bottom-5 left-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:cursor-pointer hover:bg-blue-600 transition"
      >
        💬
      </button>

      {/* Popup window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 flex h-[500px] max-h-[calc(100vh-6rem)] w-80 flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-xl lg:w-96">
          <div className="flex shrink-0 items-center justify-between border-b bg-gray-100 p-2">
            <h2 className="text-sm font-semibold">Geo AI Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
};
export default ChatBotWidget