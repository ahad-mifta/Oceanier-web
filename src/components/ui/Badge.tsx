import type { ReactNode } from "react";

export type BadgeColor = "lime" | "blue" | "purple" | "amber" | "green" | "red" | "gray";

export default function Badge({ children, color = "gray" }: { children: ReactNode; color?: BadgeColor }) {
  const colors: Record<BadgeColor, string> = {
    lime: "bg-primary/15 text-primary border-primary/20",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/15 text-red-400 border-red-500/20",
    gray: "bg-white/5 text-foreground/50 border-white/08",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${colors[color]}`}>{children}</span>;
}
