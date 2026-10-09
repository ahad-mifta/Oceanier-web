import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Zap, Users, ArrowRight, Headphones } from "lucide-react";
import { LIME } from "../../constants";
import { solutions } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function SolutionsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", "Customer Support", "Lead Generation", "Appointment Booking", "Research", "Internal Knowledge", "Meta Automation"];
  const filtered = solutions.filter(s =>
    (cat === "All" || s.category === cat) &&
    (s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Solutions" subtitle="Browse and install AI workflow solutions" />
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search solutions..."
              className="w-full pl-10 pr-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground text-xs outline-none focus:border-primary/40 placeholder-foreground/25" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3.5 py-2 rounded-full text-[10px] font-semibold transition-all border ${cat === c ? "border-primary/40 bg-primary/10 text-primary" : "border-white/07 bg-white/03 text-foreground/40 hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <GlassCard className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#3b82f615", border: "1px solid #3b82f622" }}>
            <Headphones size={24} style={{ color: "#3b82f6" }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-base font-bold text-foreground">Customer Support AI</h3>
              <Badge color="lime">Most Popular</Badge>
            </div>
            <p className="text-xs text-foreground/45 mb-3 max-w-xl">24/7 AI-powered customer support that resolves tickets, answers FAQs, and escalates complex issues.</p>
            <div className="flex items-center gap-4 text-[10px] text-foreground/35">
              <span className="flex items-center gap-1"><Zap size={10} style={{ color: LIME }} />1,200 Fuel/mo</span>
              <span className="flex items-center gap-1"><Users size={10} />234 installs</span>
            </div>
          </div>
          <Btn onClick={() => navigate("/solutions/detail")}>Install <ArrowRight size={14} /></Btn>
        </GlassCard>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-foreground/25 text-sm">No solutions match your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <GlassCard hover className="p-6 h-full flex flex-col" onClick={() => navigate("/solutions/detail")}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                        <Icon size={18} style={{ color: s.color }} />
                      </div>
                      <Badge color="gray">{s.category}</Badge>
                    </div>
                    <h3 className="text-xs font-bold text-foreground mb-2">{s.name}</h3>
                    <p className="text-[11px] text-foreground/45 leading-relaxed flex-1 mb-4">{s.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground/30 flex items-center gap-1"><Zap size={9} style={{ color: LIME }} />{s.fuel}</span>
                      <Btn size="sm">Install</Btn>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
