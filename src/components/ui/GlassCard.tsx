import type { ReactNode } from "react";
import { CARD_BG, CARD_BORDER } from "../../constants";

export default function GlassCard({ children, className = "", hover = false, onClick }: {
  children: ReactNode; className?: string; hover?: boolean; onClick?: () => void;
}) {
  return (
    <div onClick={onClick}
      className={`rounded-[24px] border transition-all duration-300 ${hover ? "cursor-pointer hover:border-white/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] hover:-translate-y-1" : ""} ${className}`}
      style={{ background: CARD_BG, borderColor: CARD_BORDER, backdropFilter: "blur(20px)" }}>
      {children}
    </div>
  );
}
