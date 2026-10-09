import { useNavigate } from "react-router";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Plus, Zap, AlertCircle, ChevronRight, Package, Activity, MessageCircle, Target, Clock, Calendar } from "lucide-react";
import { LIME } from "../../constants";
import { execData, fuelPieData, solutions, activities } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import KPICard from "../../components/ui/KPICard";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Dashboard" subtitle="Acme Corp · Business Plan · Trial ends in 5 days"
        actions={
          <div className="flex gap-2">
            <Btn size="sm" variant="glass" onClick={() => navigate("/solutions")}><Plus size={13} />Install Solution</Btn>
            <Btn size="sm" onClick={() => navigate("/fuel")}><Zap size={13} />Buy Fuel</Btn>
          </div>
        } />
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-3 px-5 py-3 rounded-[16px] border border-amber-500/20 bg-amber-500/05">
          <AlertCircle size={15} className="text-amber-400 shrink-0" />
          <span className="text-xs text-amber-300 font-medium">Your trial ends in 5 days.</span>
          <span className="text-xs text-foreground/35">Upgrade now to keep your AI crews running.</span>
          <Btn size="sm" className="ml-auto" onClick={() => navigate("/fuel")}>Upgrade Plan</Btn>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Active Solutions" value="4" icon={Package} color={LIME} delta="+1 this week" />
          <KPICard label="Total Executions" value="1,842" sub="This month" icon={Activity} color="#3b82f6" delta="+24%" />
          <KPICard label="Conversations" value="634" sub="Last 30 days" icon={MessageCircle} color="#8b5cf6" delta="+18%" />
          <KPICard label="Fuel Remaining" value="12,400" sub="of 30,000 / mo" icon={Zap} color="#f59e0b" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Leads Captured" value="89" sub="This month" icon={Target} color="#ec4899" delta="+32%" />
          <KPICard label="Hours Saved" value="142" sub="Estimated" icon={Clock} color="#10b981" delta="This month" />
          <KPICard label="Meetings Booked" value="23" sub="via Scheduler" icon={Calendar} color="#06b6d4" />
          <KPICard label="Avg Response" value="1.4s" sub="AI response time" icon={Zap} color={LIME} delta="Excellent" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2 p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-6">Workflow Executions</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={execData}>
                <defs>
                  <linearGradient id="execGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={LIME} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={LIME} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
                <Area type="monotone" dataKey="executions" stroke={LIME} strokeWidth={2} fill="url(#execGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-5">Fuel by Solution</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={fuelPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {fuelPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {fuelPieData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-foreground/40">{d.name}</span>
                  </div>
                  <span className="text-foreground/60 font-bold">{d.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Active Solutions</h3>
              <Btn size="sm" variant="ghost" onClick={() => navigate("/solutions")}>View all <ChevronRight size={13} /></Btn>
            </div>
            <div className="space-y-2">
              {solutions.slice(0, 4).map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-[14px] hover:bg-white/03 transition-colors cursor-pointer" onClick={() => navigate("/solutions/detail")}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                      <Icon size={14} style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{s.name}</div>
                      <div className="text-[10px] text-foreground/35">{s.category}</div>
                    </div>
                    <Badge color="green">Active</Badge>
                  </div>
                );
              })}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map(a => {
                const Icon = a.icon;
                return (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${a.color}12` }}>
                      <Icon size={11} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground/65 leading-snug">{a.message}</div>
                      <div className="text-[9px] text-foreground/25 mt-0.5">{a.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
