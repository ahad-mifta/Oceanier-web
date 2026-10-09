import { Eye, Edit } from "lucide-react";
import { LIME } from "../../constants";
import type { BadgeColor } from "../../components/ui/Badge";
import AppTopBar from "../../components/AppTopBar";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function AdminRequestsPage() {
  const requests = [
    { id: 1, org: "RetailPlus", contact: "Sara Lee", desc: "AI-powered inventory management and automatic reorder system", status: "Under Review", date: "Jul 18, 2026" },
    { id: 2, org: "TechStart", contact: "Mike Chen", desc: "Custom lead scoring model integrated with HubSpot CRM", status: "New", date: "Jul 20, 2026" },
    { id: 3, org: "MedCenter", contact: "Dr. Patel", desc: "Patient intake automation and symptom pre-screening", status: "Quoted", date: "Jul 10, 2026" },
    { id: 4, org: "Global Agency", contact: "Tom Baker", desc: "Multi-language social media content calendar automation", status: "Accepted", date: "Jul 5, 2026" },
  ];
  const statusColor = (s: string): BadgeColor => ({ "New": "lime", "Under Review": "amber", "Quoted": "blue", "Accepted": "green" }[s] as BadgeColor ?? "gray");
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Custom Requests" subtitle="Manage custom AI solution requests" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[{ label: "New", count: 2, color: LIME }, { label: "Under Review", count: 1, color: "#f59e0b" }, { label: "Quoted", count: 1, color: "#3b82f6" }, { label: "Accepted", count: 1, color: "#10b981" }].map(s => (
            <GlassCard key={s.label} className="p-5 text-center">
              <div className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.count}</div>
              <div className="text-[10px] text-foreground/35">{s.label}</div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/05">
                {["Organization", "Contact", "Request", "Status", "Date", ""].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-foreground/30 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/03">
              {requests.map(r => (
                <tr key={r.id} className="hover:bg-white/02 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-foreground">{r.org}</td>
                  <td className="px-5 py-4 text-xs text-foreground/55">{r.contact}</td>
                  <td className="px-5 py-4 text-xs text-foreground/45 max-w-xs truncate">{r.desc}</td>
                  <td className="px-5 py-4"><Badge color={statusColor(r.status)}>{r.status}</Badge></td>
                  <td className="px-5 py-4 text-[10px] text-foreground/35">{r.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-foreground/25 hover:text-foreground transition-colors"><Eye size={13} /></button>
                      <button className="text-foreground/25 hover:text-foreground transition-colors"><Edit size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
