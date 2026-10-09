import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Send, Package, BarChart2, Zap, Upload } from "lucide-react";
import { LIME, CARD_BG, CARD_BORDER } from "../../constants";
import AppTopBar from "../../components/AppTopBar";

const initialParley = [
  { id: 0, role: "assistant" as const, content: "Welcome back! I'm Parley — your AI business assistant. I can help you install solutions, configure workflows, analyze your usage, or answer platform questions. What would you like to do today?" },
];

export default function ParleyPage() {
  const [messages, setMessages] = useState(initialParley);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const respond = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("install") || m.includes("solution")) return "To install a solution, head to the Solutions page and click Install. I can also recommend solutions based on your business. Would you like recommendations?";
    if (m.includes("fuel") || m.includes("balance")) return "Your current Fuel balance is 12,400. Based on your usage patterns, this will last approximately 18 more days. Would you like to purchase additional Fuel?";
    if (m.includes("support") || m.includes("ticket")) return "Your Customer Support AI is running smoothly — 847 conversations this month with an 82% resolution rate. Would you like to review the configuration or analytics?";
    if (m.includes("recommend") || m.includes("suggest") || m.includes("what can")) return "Based on your e-commerce profile, I'd recommend:\n\n1. **Customer Support AI** — Handle 80% of tickets automatically\n2. **Lead Qualifier** — Capture and score website leads\n3. **Appointment Scheduler** — Let customers book demos automatically\n\nShall I help you install any of these?";
    return "I can help with that! Could you tell me more about what you're looking to automate in your business?";
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 1100));
    setTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: respond(userMsg.content) }]);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const suggestions = ["What can I automate?", "How much Fuel do I have?", "Recommend solutions", "How's my Customer Support AI?"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AppTopBar title="Parley" subtitle="Your AI business assistant" />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-8 space-y-5">
            {messages.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(174,236,1,0.1)", border: "1px solid rgba(174,236,1,0.18)" }}>
                    <Sparkles size={13} style={{ color: LIME }} />
                  </div>
                )}
                <div className="max-w-lg px-4 py-3 rounded-[20px] text-xs leading-relaxed whitespace-pre-line"
                  style={m.role === "user"
                    ? { background: LIME, color: "#011A2E", fontWeight: 600, borderTopRightRadius: 4 }
                    : { background: CARD_BG, border: `1px solid ${CARD_BORDER}`, color: "rgba(232,244,248,0.75)", borderTopLeftRadius: 4 }}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(174,236,1,0.1)", border: "1px solid rgba(174,236,1,0.18)" }}>
                  <Sparkles size={13} style={{ color: LIME }} />
                </div>
                <div className="px-4 py-3 rounded-[20px] rounded-tl-[4px] flex items-center gap-1"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/25"
                      animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {messages.length <= 1 && (
            <div className="px-8 pb-4 flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)}
                  className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-white/08 bg-white/03 text-foreground/50 hover:text-foreground hover:border-white/16 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="p-6 border-t border-white/05">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-[18px] border border-white/10 bg-white/03 focus-within:border-primary/40 transition-colors">
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask Parley anything about your business..."
                  className="flex-1 bg-transparent text-foreground text-xs outline-none placeholder-foreground/25" />
              </div>
              <button onClick={send} className="w-11 h-11 rounded-[14px] flex items-center justify-center transition-all hover:brightness-110"
                style={{ background: LIME }}>
                <Send size={16} style={{ color: "#011A2E" }} />
              </button>
            </div>
          </div>
        </div>
        <div className="w-64 border-l border-white/05 p-6 overflow-y-auto hidden lg:block" style={{ background: "rgba(6,16,32,0.6)" }}>
          <h3 className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.15em] mb-4">Quick Actions</h3>
          <div className="space-y-1 mb-8">
            {[{ label: "Install a Solution", icon: Package }, { label: "View Analytics", icon: BarChart2 }, { label: "Buy Fuel", icon: Zap }, { label: "Upload Knowledge", icon: Upload }, { label: "Custom AI Request", icon: Sparkles }].map(a => {
              const Icon = a.icon;
              return (
                <button key={a.label} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-xs text-foreground/50 hover:text-foreground hover:bg-white/04 transition-colors text-left">
                  <Icon size={13} className="text-primary/60" />{a.label}
                </button>
              );
            })}
          </div>
          <h3 className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.15em] mb-4">Platform Status</h3>
          <div className="space-y-3 text-[10px]">
            {[{ label: "Active Solutions", val: "4" }, { label: "Fuel Balance", val: "12,400" }, { label: "Pending Knowledge", val: "1 file" }].map(s => (
              <div key={s.label} className="flex justify-between text-foreground/35">
                <span>{s.label}</span><span className="text-foreground/60 font-bold">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
