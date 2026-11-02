import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, Compass, HeartPulse, Clock } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Greetings. I am your Shuto-Shoili Botanical Guide. How can I assist your health and wellness journey today? Ask me about the cellular benefits of whole foods, our organic menu, or cafe hours.",
      time: 'Just now'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Knowledge base and automated response matcher
  const generateBotResponse = (query) => {
    const q = query.toLowerCase();

    // Booking or Ordering Guardrail (Explicitly requested by user)
    if (q.includes('book') || q.includes('reserve') || q.includes('reservation') || q.includes('table') || q.includes('buy directly') || (q.includes('order') && (q.includes('here') || q.includes('chat') || q.includes('take')))) {
      return {
        text: "Direct bookings and orders cannot be placed directly inside this chat. You can easily order online by clicking 'Quick Add' on any menu item above and checking out via your Cart! For table reservations or private cafe bookings, please call our hosts directly at +880 1234-567890 or visit our flagship sanctuary in Dhaka.",
        action: 'call'
      };
    }

    // Health and Natural Food Benefits
    if (q.includes('health') || q.includes('why natural') || q.includes('benefit') || q.includes('good for') || q.includes('nutrition') || q.includes('body')) {
      return {
        text: "Living, unadulterated botanical foods provide bio-available micronutrients and active enzymes that industrial foods destroy. Here is why our natural offerings excel:\n\n1. Cellular Energy: Clean, sustained fuel without glucose spikes.\n2. Gut Microbiome: Fermented sourdough and botanical prebiotics nurture beneficial gut flora.\n3. Antioxidant Shield: Raw cold-pressed herbs, matcha, and wild berries neutralize oxidative stress.\n4. Pure Transparency: 100% free of synthetic preservatives and refined sugars.",
        action: null
      };
    }

    // Matcha and Coffee
    if (q.includes('matcha') || q.includes('coffee') || q.includes('brew') || q.includes('caffeine')) {
      return {
        text: "Our Ceremonial Uji Matcha pairs slow-release caffeine with high concentrations of L-Theanine, fostering a state of calm focus without coffee jitters. Meanwhile, our 24-hour slow cold-drip coffee reduces harsh acidity while preserving delicate antioxidant polyphenols.",
        action: null
      };
    }

    // Sourdough and Fermentation
    if (q.includes('sourdough') || q.includes('bread') || q.includes('focaccia') || q.includes('gluten') || q.includes('digest')) {
      return {
        text: "Our hearth breads undergo a 36-hour wild lactobacillus fermentation. This natural process pre-digests phytic acid and gluten proteins, making the bread remarkably light on the stomach and rich in bio-available minerals.",
        action: null
      };
    }

    // Hours, Location and Info
    if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('location') || q.includes('where') || q.includes('address') || q.includes('contact')) {
      return {
        text: "Shuto-Shoili Botanical Cafe is located in Dhaka, Bangladesh. We are welcoming guests daily from 08:00 AM to 10:00 PM. You can reach our team anytime at +880 1234-567890 or via hello@shuto-shoili.com.",
        action: 'location'
      };
    }

    // Default Botanical Advice
    return {
      text: "Every botanical element we source is crafted with living intention. Whether you are seeking sustained vitality through adaptogens, digestive balance through sourdough, or clean anti-inflammatory fuel, nature provides the antidote. How else may I guide your nourishment today?",
      action: null
    };
  };

  const handleSend = (textToSend) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageContent.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(messageContent);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply.text,
          action: botReply.action,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = [
    "Why is natural food good for health?",
    "Opening hours & location?",
    "Benefits of Ceremonial Matcha?",
    "Can I book a table or order here?"
  ];

  return (
    <>
      {/* Floating Toggle Pill Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#01472e] text-[#fefae0] px-5 py-3.5 rounded-full shadow-forest hover:scale-105 transition-all duration-300 border-2 border-[#ccd5ae]/40 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div 
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          className="fixed bottom-6 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[85vh] bg-[#fefae0] rounded-2-5rem border-2 border-[#01472e]/20 shadow-forest flex flex-col overflow-hidden animate-reveal"
        >
          {/* Header */}
          <div className="bg-[#01472e] text-[#fefae0] p-5 flex items-center justify-between border-b border-[#ccd5ae]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ccd5ae] text-[#01472e] flex items-center justify-center font-bold text-sm">
                🌿
              </div>
              <div>
                <h4 className="font-anton text-lg tracking-wider uppercase text-[#fefae0] leading-none">
                  SHUTO SHOILI
                </h4>
                <p className="font-inter text-[9px] uppercase tracking-[0.25em] text-[#ccd5ae] mt-0.5">
                  Natural Food & Wellness Guide
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#fefae0] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Guidance Chips */}
          <div className="bg-[#e9edc9] px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-b border-[#01472e]/10 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 bg-[#fefae0] hover:bg-[#01472e] text-[#01472e] hover:text-[#fefae0] rounded-full text-[10px] font-inter font-bold tracking-wider uppercase transition-colors shrink-0 border border-[#01472e]/15 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs font-inter leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#01472e] text-[#fefae0] rounded-tr-none'
                      : 'bg-[#ccd5ae]/40 text-[#01472e] border border-[#01472e]/15 rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Contextual Action Button if bot suggested calling */}
                  {msg.action === 'call' && (
                    <div className="mt-3 pt-3 border-t border-[#01472e]/15">
                      <a
                        href="tel:+8801234567890"
                        className="inline-flex items-center gap-2 bg-[#01472e] text-[#fefae0] px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm hover:opacity-90"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call +880 1234-567890
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-inter text-[#01472e]/50 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-[#ccd5ae]/30 text-[#01472e] p-3 rounded-2xl w-24 border border-[#01472e]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#01472e] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#01472e] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#01472e] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#e9edc9] border-t border-[#01472e]/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about health, natural food, cafe hours..."
              className="flex-1 bg-[#fefae0] text-[#01472e] text-xs font-inter placeholder-[#01472e]/50 px-4 py-3 rounded-full border border-[#01472e]/20 focus:outline-none focus:border-[#01472e]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#01472e] text-[#fefae0] flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
