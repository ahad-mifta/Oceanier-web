import { useState } from "react";
import { FileText, Globe, Database, Eye, Trash2, Upload, Link } from "lucide-react";
import { LIME } from "../../constants";
import { knowledgeItems } from "../../data/mockData";
import type { BadgeColor } from "../../components/ui/Badge";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function KnowledgePage() {
  const [tab, setTab] = useState("all");
  const [dragging, setDragging] = useState(false);
  const statColor = (s: string): BadgeColor => s === "Ready" ? "green" : "amber";
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Knowledge Base" subtitle="Manage documents, websites, and FAQs"
        actions={<div className="flex gap-2"><Btn size="sm" variant="glass"><Link size={13} />Add Website</Btn><Btn size="sm"><Upload size={13} />Upload Files</Btn></div>} />
      <div className="p-8 space-y-6">
        <div className={`rounded-[24px] border-2 border-dashed p-12 text-center transition-all cursor-pointer ${dragging ? "border-primary/60 bg-primary/04" : "border-white/08 hover:border-white/16"}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={() => setDragging(false)}>
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: "rgba(174,236,1,0.07)", border: "1px solid rgba(174,236,1,0.12)" }}>
            <Upload size={20} style={{ color: LIME }} />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Drop files here or click to upload</p>
          <p className="text-xs text-foreground/35">PDF, DOCX, TXT — Max 50MB per file</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ label: "Total Documents", val: "5", icon: FileText }, { label: "Website Sources", val: "1", icon: Globe }, { label: "Storage Used", val: "8.4 MB", icon: Database }].map(s => {
            const Icon = s.icon;
            return (
              <GlassCard key={s.label} className="p-5 flex items-center gap-3">
                <Icon size={16} style={{ color: LIME }} className="opacity-50" />
                <div><div className="text-lg font-extrabold text-foreground">{s.val}</div><div className="text-[10px] text-foreground/35">{s.label}</div></div>
              </GlassCard>
            );
          })}
        </div>
        <div className="flex gap-1 border-b border-white/05">
          {["all", "documents", "websites", "faqs"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-colors -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-foreground/35 hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/05">
                  {["Name", "Type", "Size", "Status", "Solutions", "Date", ""].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-foreground/30 uppercase tracking-wider px-5 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/03">
                {knowledgeItems.map(item => (
                  <tr key={item.id} className="hover:bg-white/02 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <FileText size={13} className="text-foreground/25 shrink-0" />
                        <span className="text-xs font-semibold text-foreground">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="text-[10px] font-mono text-foreground/40">{item.type}</span></td>
                    <td className="px-5 py-3.5 text-[10px] text-foreground/35">{item.size}</td>
                    <td className="px-5 py-3.5"><Badge color={statColor(item.status)}>{item.status}</Badge></td>
                    <td className="px-5 py-3.5 text-[10px] text-foreground/35">{item.linked.join(", ") || "—"}</td>
                    <td className="px-5 py-3.5 text-[10px] text-foreground/35">{item.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="text-foreground/25 hover:text-foreground transition-colors"><Eye size={13} /></button>
                        <button className="text-foreground/25 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
