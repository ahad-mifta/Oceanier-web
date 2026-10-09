import { Plus, Edit, Eye } from "lucide-react";
import { solutions } from "../../data/mockData";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function AdminSolutionsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Solutions" subtitle="Manage and publish AI solutions"
        actions={<Btn size="sm"><Plus size={13} />Create Solution</Btn>} />
      <div className="p-8">
        <GlassCard className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/05">
                {["Solution", "Category", "Version", "Installs", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-foreground/30 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/03">
              {solutions.map(s => {
                const Icon = s.icon;
                return (
                  <tr key={s.id} className="hover:bg-white/02 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}12` }}>
                          <Icon size={13} style={{ color: s.color }} />
                        </div>
                        <span className="text-xs font-bold text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[10px] text-foreground/45">{s.category}</td>
                    <td className="px-5 py-4 text-[10px] font-mono text-foreground/45">v2.4.1</td>
                    <td className="px-5 py-4 text-xs text-foreground/60">{s.installs}</td>
                    <td className="px-5 py-4"><Badge color={s.status === "active" ? "green" : "lime"}>{s.status}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-foreground/25 hover:text-foreground transition-colors"><Edit size={13} /></button>
                        <button className="text-foreground/25 hover:text-foreground transition-colors"><Eye size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
