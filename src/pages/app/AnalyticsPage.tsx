import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { Activity, MessageCircle, Target, Clock } from "lucide-react";
import { LIME } from "../../constants";
import { execData, fuelPieData, solutions } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import GlassCard from "../../components/ui/GlassCard";
import KPICard from "../../components/ui/KPICard";

export default function AnalyticsPage() {
  const [range, setRange] = useState("30d");
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Analytics" subtitle="Detailed workflow and business insights"
        actions={
          <div className="flex gap-0.5 p-1 rounded-full border border-white/08 bg-white/03">
            {["7d", "30d", "90d"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${range === r ? "bg-primary text-primary-foreground" : "text-foreground/40"}`}>{r}</button>
            ))}
          </div>
        } />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Executions" value="1,842" delta="+24%" icon={Activity} color="#3b82f6" />
          <KPICard label="Conversations" value="634" delta="+18%" icon={MessageCircle} color="#8b5cf6" />
          <KPICard label="Leads" value="89" delta="+32%" icon={Target} color={LIME} />
          <KPICard label="Hours Saved" value="142h" icon={Clock} color="#10b981" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Workflow Executions</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={execData}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={LIME} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={LIME} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
                <Area type="monotone" dataKey="executions" stroke={LIME} strokeWidth={2} fill="url(#aGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Fuel Consumption</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={execData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
                <Bar dataKey="fuel" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-5">Solution Performance</h3>
            <div className="space-y-4">
              {solutions.slice(0, 4).map((s, si) => {
                const pct = [82, 74, 68, 61][si];
                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}12` }}>
                      <s.icon size={11} style={{ color: s.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-1.5">
                        <span className="text-foreground/60">{s.name}</span>
                        <span className="text-foreground/35">{pct}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/06 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-5">Fuel by Solution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={fuelPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {fuelPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
