import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-[10px] font-bold tracking-[0.12em] text-primary uppercase">{children}</span>
    </div>
  );
}
