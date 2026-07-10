"use client";
import { useState, useRef, useEffect } from "react";
import { aiClient } from "@/lib/api/client/ai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! 👋 Ben bu portfolyo sayfasının AI asistanıyım. Bana buradaki yazılımcı hakkında sorular sorabilirsiniz.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // aşağı doğru kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // açıldığında inputu focusla
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await aiClient.chat(trimmed);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Üzgünüm, şu an yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* sayfada hareket edebilen buton */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-[998] w-14 h-14 rounded-full
          bg-gradient-to-br from-brand-green to-brand-blue
          text-[#030508] shadow-[0_0_30px_rgba(124,247,196,0.4)]
          hover:shadow-[0_0_45px_rgba(124,247,196,0.6)]
          hover:scale-110 active:scale-95
          transition-all duration-300 flex items-center justify-center
          ${isOpen ? "rotate-0" : "animate-bounce-slow"}
        `}
        aria-label="AI Chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Sohbet Penceresi */}
      <div
        className={`
          fixed bottom-24 right-6 z-[997]
          w-[380px] max-w-[calc(100vw-48px)]
          h-[520px] max-h-[calc(100vh-140px)]
          rounded-2xl overflow-hidden
          border border-white/10
          bg-[#080c14]/95 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(124,247,196,0.1)]
          flex flex-col
          transition-all duration-300 origin-bottom-right
          ${isOpen
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-90 opacity-0 pointer-events-none translate-y-4"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#030508" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-green border-2 border-[#080c14] shadow-[0_0_8px_rgba(124,247,196,0.6)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-bold leading-tight">AI Asistan</h4>
            <p className="text-brand-green text-[11px] font-medium">Çevrimiçi</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Mesajlar */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                  max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-gradient-to-r from-brand-green/20 to-brand-blue/20 border border-brand-green/20 text-white rounded-br-md"
                    : "bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-bl-md"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-green/60 animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 rounded-full bg-brand-green/60 animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-brand-green/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-1 focus-within:border-brand-green/40 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Bir soru sorun..."
              disabled={loading}
              className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none py-2 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-lg bg-brand-green/20 hover:bg-brand-green/30 flex items-center justify-center text-brand-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-2">Yanıtlar AI tarafından üretilmektedir.</p>
        </div>
      </div>

      {/* Özel animasyon */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </>
  );
}
