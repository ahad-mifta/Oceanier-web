import { useNavigate } from "react-router";
import { Zap, Download } from "lucide-react";
import { LIME } from "../../constants";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";

export default function FuelPage() {
  const navigate = useNavigate();
  const pkgs = [
    { name: "Starter Pack", fuel: "10,000", price: 9 },
    { name: "Growth Pack", fuel: "30,000", price: 24, popular: true },
    { name: "Business Pack", fuel: "100,000", price: 69 },
    { name: "Enterprise Pack", fuel: "500,000", price: 299 },
  ];
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Fuel & Billing" subtitle="Manage your AI execution tokens" />
      <div className="p-8 space-y-8">
        <GlassCard className="p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(circle,rgba(174,236,1,0.05) 0%,transparent 70%)", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div>
              <div className="text-[10px] text-foreground/35 uppercase tracking-[0.15em] mb-2 flex items-center gap-1">
                <Zap size={10} style={{ color: LIME }} />Fuel Balance
              </div>
              <div className="text-5xl font-extrabold text-foreground mb-1">12,400</div>
              <div className="text-xs text-foreground/35">of 30,000 monthly allocation</div>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="flex justify-between text-[10px] text-foreground/35 mb-2">
                <span>Used this month</span><span>17,600 (59%)</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/06 overflow-hidden mb-3">
                <div className="h-full rounded-full" style={{ width: "59%", background: LIME }} />
              </div>
              <div className="text-[10px] text-foreground/25">~13 days remaining at current usage</div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Btn><Zap size={13} />Buy More Fuel</Btn>
              <Btn variant="glass" onClick={() => navigate("/settings")}>Upgrade Plan</Btn>
            </div>
          </div>
        </GlassCard>
        <div>
          <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-4">Fuel Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pkgs.map((pkg, i) => (
              <GlassCard key={i} className={`p-6 relative ${pkg.popular ? "ring-1 ring-primary/40" : ""}`}>
                {pkg.popular && <div className="absolute top-0 left-4 right-4 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${LIME},transparent)` }} />}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-bold text-foreground">{pkg.name}</h3>
                  {pkg.popular && <Badge color="lime">Best Value</Badge>}
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-0.5">${pkg.price}</div>
                <div className="text-xs text-foreground/35 mb-6 flex items-center gap-1"><Zap size={10} style={{ color: LIME }} />{pkg.fuel} Fuel</div>
                <Btn variant={pkg.popular ? "primary" : "glass"} className="w-full justify-center" size="sm">Purchase</Btn>
              </GlassCard>
            ))}
          </div>
        </div>
        <GlassCard>
          <div className="px-6 py-4 border-b border-white/05 flex justify-between items-center">
            <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Transaction History</h3>
            <Btn size="sm" variant="ghost"><Download size={13} />Export</Btn>
          </div>
          <div className="divide-y divide-white/03">
            {[
              { type: "Monthly Allocation", fuel: "+30,000", date: "Jul 1, 2026" },
              { type: "Workflow Consumption", fuel: "-17,600", date: "Jul 1–20, 2026" },
              { type: "Fuel Purchase (Growth Pack)", fuel: "+30,000", date: "Jun 28, 2026" },
              { type: "Monthly Allocation", fuel: "+30,000", date: "Jun 1, 2026" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="text-xs font-semibold text-foreground">{tx.type}</div>
                  <div className="text-[10px] text-foreground/35">{tx.date}</div>
                </div>
                <div className={`text-sm font-extrabold ${tx.fuel.startsWith("+") ? "text-emerald-400" : "text-foreground/50"}`}>{tx.fuel}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
