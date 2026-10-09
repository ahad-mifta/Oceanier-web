import type { ReactNode } from "react";

type BtnVariant = "primary" | "ghost" | "glass" | "danger";
type BtnSize = "sm" | "md" | "lg";

export default function Btn({ children, variant = "primary", size = "md", className = "", onClick, type = "button", disabled }: {
  children: ReactNode; variant?: BtnVariant; size?: BtnSize; className?: string;
  onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  const sizes: Record<BtnSize, string> = {
    sm: "px-4 py-2 text-xs rounded-[14px]",
    md: "px-6 py-3 text-sm rounded-[18px]",
    lg: "px-8 py-4 text-base rounded-[20px]",
  };
  const variants: Record<BtnVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:brightness-110 active:scale-95 shadow-[0_0_24px_rgba(174,236,1,0.2)]",
    ghost: "text-foreground/60 hover:text-foreground hover:bg-white/5",
    glass: "border border-white/10 bg-white/5 text-foreground hover:bg-white/10 backdrop-blur-sm",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}>
      {children}
    </button>
  );
}
