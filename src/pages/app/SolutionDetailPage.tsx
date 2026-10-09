import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ChevronLeft, Pause, ExternalLink, Globe, Zap, Check, Server } from "lucide-react";
import { LIME } from "../../constants";
import { execData, solutions } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";

export default function SolutionDetailPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const s = solutions[0];
  const Icon = s.icon;
  const tabs = ["overview", "configuration", "ai-instructions", "analytics", "logs"];
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title={s.name} subtitle={s.category}
        actions={<Btn size="sm" variant="ghost" onClick={() => navigate("/solutions")}><ChevronLeft size={13} />Back</Btn>} />
      <div className="p-8 space-y-6">
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${s.color}12`, border: `1px solid ${s.color}22` }}>
              <Icon size={26} style={{ color: s.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h2 className="text-lg font-extrabold text-foreground">{s.name}</h2>
                <Badge color="green">Active</Badge>
                <Badge color="gray">v2.4.1</Badge>
              </div>
              <p className="text-xs text-foreground/45 max-w-2xl mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-4 text-[10px] text-foreground/35">
                <span className="flex items-center gap-1"><Zap size={10} style={{ color: LIME }} />~{s.fuel}</span>
                <span className="flex items-center gap-1"><Globe size={10} />Website · Messenger · API</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn size="sm" variant="glass"><Pause size={13} />Pause</Btn>
              <Btn size="sm">Open <ExternalLink size={13} /></Btn>
            </div>
          </div>
        </GlassCard>
        <div className="flex gap-1 border-b border-white/05 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-xs font-semibold capitalize whitespace-nowrap border-b-2 transition-colors -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-foreground/35 hover:text-foreground"}`}>
              {t.replace("-", " ")}
            </button>
          ))}
        </div>
        {tab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <GlassCard className="p-5"><div className="text-[10px] text-foreground/35 mb-1 uppercase tracking-wider">Status</div><div className="text-sm font-bold text-emerald-400">● Active</div></GlassCard>
            <GlassCard className="p-5"><div className="text-[10px] text-foreground/35 mb-1 uppercase tracking-wider">Fuel Used (Month)</div><div className="text-sm font-bold text-foreground">3,240 Fuel</div></GlassCard>
            <GlassCard className="p-5"><div className="text-[10px] text-foreground/35 mb-1 uppercase tracking-wider">Executions</div><div className="text-sm font-bold text-foreground">847 this month</div></GlassCard>
            <GlassCard className="md:col-span-3 p-6">
              <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">What this crew does</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Resolve 60–80% of support tickets automatically", "Available 24/7 with consistent quality responses", "Escalate complex issues to the right human agent", "Learn from your knowledge base and improve over time"].map(b => (
                  <div key={b} className="flex items-start gap-2 text-xs text-foreground/55">
                    <Check size={12} style={{ color: LIME }} className="mt-0.5 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
        {tab === "configuration" && (
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-6">Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Business Name" value="Acme Corp" />
              <Input label="Support Email" value="support@acmecorp.com" />
              <Input label="Welcome Message" value="Hi! How can I help you today?" />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Default Language</label>
                <select className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground text-sm outline-none" style={{ background: "#0B2742" }}>
                  <option>English</option><option>Arabic</option><option>French</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6"><Btn>Save Changes</Btn><Btn variant="glass">Reset to Default</Btn></div>
          </GlassCard>
        )}
        {tab === "ai-instructions" && (
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-6">AI Instructions</h3>
            <div className="space-y-4">
              {[
                { label: "Role", placeholder: "You are a professional customer support agent for Acme Corp..." },
                { label: "Business Context", placeholder: "Acme Corp sells premium software solutions..." },
                { label: "Tone", placeholder: "Professional, helpful, concise, empathetic..." },
                { label: "Rules", placeholder: "Always greet the user. Never share pricing without checking..." },
              ].map(f => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">{f.label}</label>
                  <textarea placeholder={f.placeholder} rows={3}
                    className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground placeholder-foreground/20 text-xs outline-none focus:border-primary/40 resize-none" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6"><Btn>Save Instructions</Btn><Btn variant="glass">Restore Default</Btn></div>
          </GlassCard>
        )}
        {tab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: "Conversations", value: "634" }, { label: "Resolutions", value: "518" }, { label: "Escalations", value: "116" }, { label: "Avg Response", value: "1.4s" }].map(m => (
                <GlassCard key={m.label} className="p-5">
                  <div className="text-[10px] text-foreground/35 mb-1 uppercase tracking-wider">{m.label}</div>
                  <div className="text-2xl font-extrabold text-foreground">{m.value}</div>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="p-6">
              <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Daily Executions</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={execData}>
                  <defs>
                    <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
                  <Area type="monotone" dataKey="executions" stroke="#3b82f6" strokeWidth={2} fill="url(#detGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        )}
        {tab === "logs" && (
          <GlassCard className="p-12 text-center text-foreground/25">
            <Server size={28} className="mx-auto mb-3 opacity-30" />
            <p className="text-xs">Execution logs will appear here.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
