export default function Input({ label, placeholder, type = "text", value, onChange, className = "" }: {
  label?: string; placeholder?: string; type?: string; value?: string; onChange?: (v: string) => void; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">{label}</label>}
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)}
        className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground placeholder-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" />
    </div>
  );
}
