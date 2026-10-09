import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Building, Clock, CreditCard, TrendingUp, Package, Activity, Zap, MessageCircle } from "lucide-react";
import { LIME } from "../../constants";
import { orgData, mockOrgs } from "../../data/mockData";
import type { BadgeColor } from "../../components/ui/Badge";
import AppTopBar from "../../components/AppTopBar";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import KPICard from "../../components/ui/KPICard";

export default function AdminDashboard() {
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Admin Dashboard" subtitle="Platform-wide overview" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Total Organizations" value="93" delta="+12 this mo" icon={Building} color="#3b82f6" />
          <KPICard label="Active Trials" value="18" icon={Clock} color="#f59e0b" />
          <KPICard label="Paid Organizations" value="71" delta="+8%" icon={CreditCard} color={LIME} />
          <KPICard label="Monthly Revenue" value="$8,420" delta="+23%" icon={TrendingUp} color="#10b981" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Active Solutions" value="312" icon={Package} color="#8b5cf6" />
          <KPICard label="Total Executions" value="142K" sub="This month" icon={Activity} color="#ec4899" />
          <KPICard label="Fuel Consumed" value="8.2M" sub="This month" icon={Zap} color="#f59e0b" />
          <KPICard label="Open Requests" value="7" icon={MessageCircle} color="#ef4444" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Organization Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={orgData}>
                <defs>
                  <linearGradient id="orgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
                <Area type="monotone" dataKey="orgs" stroke="#3b82f6" strokeWidth={2} fill="url(#orgGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-5">Recent Organizations</h3>
            <div className="space-y-3">
              {mockOrgs.slice(0, 4).map(o => (
                <div key={o.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-foreground">{o.name}</div>
                    <div className="text-[10px] text-foreground/35">{o.plan} · {o.created}</div>
                  </div>
                  <Badge color={o.status === "active" ? "green" : o.status === "trial" ? "amber" : "red" as BadgeColor}>{o.status}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
