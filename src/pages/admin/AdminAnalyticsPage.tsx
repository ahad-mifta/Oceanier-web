import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart2, Target, Activity } from "lucide-react";
import { LIME } from "../../constants";
import { orgData } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import GlassCard from "../../components/ui/GlassCard";
import KPICard from "../../components/ui/KPICard";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Platform Analytics" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="MRR" value="$8,420" delta="+23%" icon={TrendingUp} color={LIME} />
          <KPICard label="ARR Run Rate" value="$101K" icon={BarChart2} color="#3b82f6" />
          <KPICard label="Trial → Paid" value="68%" delta="+5pts" icon={Target} color="#8b5cf6" />
          <KPICard label="Churn Rate" value="2.1%" icon={Activity} color="#10b981" />
        </div>
        <GlassCard className="p-6">
          <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Organization Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orgData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0B2742", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#E8F4F8", fontSize: 11 }} />
              <Bar dataKey="orgs" fill={LIME} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
