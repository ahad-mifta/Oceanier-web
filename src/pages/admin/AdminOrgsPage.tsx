import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { LIME } from "../../constants";
import { mockOrgs } from "../../data/mockData";
import type { BadgeColor } from "../../components/ui/Badge";
import AppTopBar from "../../components/AppTopBar";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function AdminOrgsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockOrgs.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  const planColor = (p: string): BadgeColor => p === "Enterprise" ? "purple" : p === "Business" ? "blue" : p === "Growth" ? "lime" : "gray";
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Organizations" subtitle={`${mockOrgs.length} total`} />
      <div className="p-8 space-y-6">
        <div className="relative max-w-sm">
          <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..."
            className="w-full pl-10 pr-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground text-xs outline-none focus:border-primary/40 placeholder-foreground/25" />
        </div>
        <GlassCard className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/05">
                {["Organization", "Plan", "Fuel", "Solutions", "Members", "Status", "Created", ""].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-foreground/30 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/03">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-white/02 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-extrabold shrink-0"
                        style={{ background: "rgba(174,236,1,0.07)", color: LIME }}>{o.name[0]}</div>
                      <span className="text-xs font-bold text-foreground">{o.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge color={planColor(o.plan)}>{o.plan}</Badge></td>
                  <td className="px-5 py-4 text-xs font-mono text-foreground/60">{o.fuel.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-foreground/55">{o.solutions}</td>
                  <td className="px-5 py-4 text-xs text-foreground/55">{o.members}</td>
                  <td className="px-5 py-4"><Badge color={o.status === "active" ? "green" : o.status === "trial" ? "amber" : "red" as BadgeColor}>{o.status}</Badge></td>
                  <td className="px-5 py-4 text-[10px] text-foreground/35">{o.created}</td>
                  <td className="px-5 py-4"><button className="text-foreground/25 hover:text-foreground transition-colors"><Eye size={13} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
