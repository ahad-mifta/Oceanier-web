import type { ReactNode } from "react";
import { Bell } from "lucide-react";

export default function AppTopBar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between h-14 px-8 border-b shrink-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div>
        <h1 className="text-sm font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-[10px] text-foreground/35">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="relative p-2 rounded-[10px] hover:bg-white/05 transition-colors text-foreground/35 hover:text-foreground">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </div>
  );
}
