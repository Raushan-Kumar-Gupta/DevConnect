import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          lastName,
          text,
          createdAt: createdAt || new Date().toISOString(), // fallback to now
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      createdAt: new Date().toISOString(),
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full sm:w-[95%] md:w-[70%] lg:w-[50%] mx-auto my-4 border border-gray-700 rounded-xl shadow-lg h-[85vh] flex flex-col bg-gradient-to-tr from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-600 bg-slate-900 font-semibold text-lg flex items-center justify-between">
        <span>Chat</span>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
        {messages.map((msg, index) => {
          const isUser = msg.firstName === user.firstName;
          return (
            <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[75%]">
                <div className={`text-xs text-gray-400 mb-1 ${isUser ? "text-right" : "text-left"}`}>
                  {msg.firstName} {msg.lastName}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl shadow-md break-words ${
                    isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`flex gap-2 text-[11px] text-gray-400 mt-1 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{formatTime(msg.createdAt)}</span>
                  <span className="opacity-60">Seen</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 bg-slate-900 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-full bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
