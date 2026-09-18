import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  sender: 'pip' | 'user';
  text: string;
  linkText?: string;
  linkUrl?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    sender: 'pip',
    text: "Hello! I'm Pip, your Mango in-product AI assistant. How can I help you choose or configure your perfect Mango device today?"
  }
];

const PROMPT_SUGGESTIONS = [
  "Which Laptop is best for college?",
  "How does trade-in credit work?",
  "Tell me about Mango Care+",
  "What is Mango Sound?",
  "Phone 16 vs Phone Ultra camera?"
];

export const PipAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const userQuery = (textToSend || input).trim();
    if (!userQuery) return;

    // Append user message
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply: Message = {
        sender: 'pip',
        text: "I'd be glad to help with that! You can customize any of our devices directly in the store, complete with custom engravings, memory upgrades, and trade-in deductions."
      };

      const q = userQuery.toLowerCase();

      if (q.includes('laptop') || q.includes('college') || q.includes('student') || q.includes('notebook')) {
        reply = {
          sender: 'pip',
          text: "For students, I strongly recommend the Laptop Lite 13\" or 15\"! It delivers up to 18 hours of battery life, weighs only 2.7 lbs, and runs completely silent without fans. Plus, you get our campus discount!",
          linkText: "Explore Laptop Lite",
          linkUrl: "/store/laptop"
        };
      } else if (q.includes('trade-in') || q.includes('credit') || q.includes('switch')) {
        reply = {
          sender: 'pip',
          text: "Mango Trade-in gives you between $200 and $650 instant credit when you trade in your eligible previous device. The credit is deducted immediately at checkout!",
          linkText: "See Eligible Models",
          linkUrl: "/store/phone"
        };
      } else if (q.includes('care') || q.includes('protection') || q.includes('warranty')) {
        reply = {
          sender: 'pip',
          text: "Mango Care+ provides unlimited accidental damage repairs, priority 24/7 access to Mango experts, and battery replacement if health drops below 80%.",
          linkText: "View Mango Care+ Details",
          linkUrl: "/care"
        };
      } else if (q.includes('sound') || q.includes('music') || q.includes('lossless')) {
        reply = {
          sender: 'pip',
          text: "Mango Sound delivers over 100 million songs in lossless spatial audio. When you pick up any new Mango hardware, you receive 3 months complimentary!",
          linkText: "Discover Mango Sound",
          linkUrl: "/sound"
        };
      } else if (q.includes('phone') || q.includes('camera') || q.includes('ultra')) {
        reply = {
          sender: 'pip',
          text: "Phone Ultra features our aerospace Grade 5 titanium chassis, a 5x optical telephoto periscope lens, and the capacitive Pip Camera Control key for fluid zoom and exposure adjustments.",
          linkText: "Configure Phone Ultra",
          linkUrl: "/store/phone"
        };
      } else if (q.includes('headset') || q.includes('spatial')) {
        reply = {
          sender: 'pip',
          text: "Headset Spatial gives you infinite workspace canvas with twin 4K micro-OLED displays (23 million pixels) controlled solely by your eyes, voice, and subtle finger gestures.",
          linkText: "Experience Headset Spatial",
          linkUrl: "/store/headset"
        };
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-mango-500 to-mango-600 hover:from-mango-600 hover:to-mango-700 text-white shadow-mango-glow transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Chat with Pip AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-100" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-leaf-500 rounded-full border-2 border-white dark:border-black" />
          </div>
          <span className="font-semibold text-xs tracking-wide">
            Ask Pip
          </span>
        </button>
      )}

      {/* Assistant Window */}
      {isOpen && (
        <div className="bg-white dark:bg-[#16171A] rounded-mango shadow-2xl border border-neutral-200 dark:border-neutral-800 w-[360px] sm:w-[400px] h-[520px] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-mango-500 to-mango-600 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Pip
                  <span className="text-[10px] font-medium px-1.5 py-0.2 bg-white/20 rounded-full">
                    AI Assistant
                  </span>
                </h3>
                <p className="text-[11px] text-amber-100/90">
                  Ready to help with specs & recommendations
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Close Pip assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'pip' && (
                  <div className="w-6 h-6 rounded-full bg-mango-100 dark:bg-mango-950 text-mango-600 shrink-0 flex items-center justify-center mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-mango-500 text-white rounded-br-none'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.linkUrl && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(m.linkUrl!);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1 font-semibold text-mango-600 dark:text-mango-400 bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1 rounded-full hover:underline text-[11px]"
                    >
                      <span>{m.linkText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 shrink-0 flex items-center justify-center mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs">
                <Bot className="w-4 h-4 text-mango-500 animate-pulse" />
                <span className="italic">Pip is analyzing specs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
              {PROMPT_SUGGESTIONS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-mango-100 hover:text-mango-700 dark:hover:bg-mango-950/80 dark:hover:text-mango-400 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 bg-white dark:bg-[#16171A]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pip anything about Mango..."
              className="flex-1 text-xs bg-neutral-100 dark:bg-neutral-800 px-3 py-2.5 rounded-full text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-mango-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-full bg-mango-500 disabled:opacity-40 hover:bg-mango-600 text-white dark:text-black transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
