"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fitur: Salin Teks
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("✅ Teks berhasil disalin!");
  };

  // Kirim Teks Biasa
  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: `❌ Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ Maaf, koneksi ke asisten terputus." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-gray-100 p-4 font-sans">
      <div className="max-w-4xl w-full mx-auto flex flex-col h-full border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-5 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              PromptCinema Studio™ Pro
            </h1>
            <p className="text-sm text-gray-400 mt-1">Asisten Khusus Copywriting & Storyboard</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121212]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="text-5xl">🎬</div>
              <p className="text-gray-500 max-w-md">
                Siap meracik teks kelas atas. <br/>
                Ketik instruksi lu di bawah, lalu klik <strong className="text-blue-400">Kirim</strong>.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm relative group ${
                  msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-[#1e1e1e] border border-gray-700 text-gray-300 rounded-bl-none"
                }`}>
                  
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    /* Kalau ini adalah teks balasan AI */
                    <div className="text-[15px] leading-relaxed w-full">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-3 mt-5 text-white" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-3 mt-5 text-white" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-md font-bold mb-2 mt-4 text-white" {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                      
                      {/* Tombol Salin (Copy) */}
                      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                        <button 
                          onClick={() => handleCopy(msg.content)}
                          className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-1.5 px-4 rounded-md transition flex items-center gap-2"
                        >
                          📋 Salin Teks
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {/* Animasi Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1e1e1e] border border-gray-700 text-gray-400 rounded-2xl rounded-bl-none p-4 shadow-sm flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="ml-2 text-sm">
                  Sedang meracik ide...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Form Input Bawah */}
        <div className="p-4 bg-[#1a1a1a] border-t border-gray-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Ketik instruksi lu di sini..."
            className="flex-1 bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 px-8 rounded-lg disabled:opacity-50"
          >
            Kirim
          </button>
        </div>

      </div>
    </div>
  );
}