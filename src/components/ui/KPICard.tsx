import type { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";

export default function KPICard({ label, value, sub, icon: Icon, color, delta }: {
  label: string; value: string | number; sub?: string; icon: LucideIcon; color: string; delta?: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {delta && <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{delta}</span>}
      </div>
      <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
      <div className="text-xs text-foreground/50">{label}</div>
      {sub && <div className="text-[10px] text-foreground/30 mt-0.5">{sub}</div>}
    </GlassCard>
  );
}
