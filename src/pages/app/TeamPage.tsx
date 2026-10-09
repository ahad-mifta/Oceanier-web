import { Plus, Trash2 } from "lucide-react";
import { LIME } from "../../constants";
import type { BadgeColor } from "../../components/ui/Badge";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function TeamPage() {
  const members = [
    { name: "Jane Smith", email: "jane@acmecorp.com", role: "Owner", joined: "May 12, 2026", status: "active" },
    { name: "Alex Johnson", email: "alex@acmecorp.com", role: "Admin", joined: "May 15, 2026", status: "active" },
    { name: "Maria Garcia", email: "maria@acmecorp.com", role: "Member", joined: "Jun 2, 2026", status: "active" },
    { name: "pending@acmecorp.com", email: "pending@acmecorp.com", role: "Member", joined: "Invited Jul 18", status: "pending" },
  ];
  const roleColor = (r: string): BadgeColor => r === "Owner" ? "lime" : r === "Admin" ? "blue" : "gray";
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Team" subtitle="Manage organization members"
        actions={<Btn size="sm"><Plus size={13} />Invite Member</Btn>} />
      <div className="p-8">
        <GlassCard className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/05">
                {["Member", "Role", "Joined", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-foreground/30 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/03">
              {members.map((m, i) => (
                <tr key={i} className="hover:bg-white/02 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: m.status === "pending" ? "rgba(255,255,255,0.04)" : "rgba(174,236,1,0.1)", color: m.status === "pending" ? "rgba(255,255,255,0.2)" : LIME }}>
                        {m.status === "pending" ? "?" : m.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{m.status === "pending" ? "Pending Invitation" : m.name}</div>
                        <div className="text-[10px] text-foreground/35">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge color={roleColor(m.role)}>{m.role}</Badge></td>
                  <td className="px-5 py-4 text-[10px] text-foreground/35">{m.joined}</td>
                  <td className="px-5 py-4"><Badge color={m.status === "active" ? "green" : "amber"}>{m.status}</Badge></td>
                  <td className="px-5 py-4">
                    {m.role !== "Owner" && (
                      <button className="text-foreground/25 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    )}
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
