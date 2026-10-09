import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import SectionLabel from "../../components/ui/SectionLabel";
import MarketingFooter from "../../components/MarketingFooter";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="pt-32 pb-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>About Oceanier</SectionLabel>
          <h1 className="text-5xl font-extrabold text-foreground mt-4 mb-12">We believe every business<br />deserves an AI workforce</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-foreground/55 leading-relaxed mb-5 text-sm">Oceanier was built on a simple belief: AI should work for every business, not just ones with engineering teams and million-dollar budgets.</p>
              <p className="text-foreground/55 leading-relaxed mb-5 text-sm">We built the platform we wished existed — where deploying a production-ready AI workflow takes minutes, not months. Where you own the ship, and we provide the crew.</p>
              <p className="text-foreground/55 leading-relaxed mb-10 text-sm">Every AI workflow in Oceanier is a Crew — a specialized agent built to do one job exceptionally well.</p>
              <Btn onClick={() => navigate("/register")}>Start Building <ArrowRight size={15} /></Btn>
            </div>
            <GlassCard className="p-8">
              {[{ val: "2024", label: "Founded" }, { val: "500+", label: "Businesses served" }, { val: "10M+", label: "Messages handled" }, { val: "6", label: "AI providers integrated" }].map((s, i, arr) => (
                <div key={s.label} className={`flex justify-between items-center py-5 ${i < arr.length - 1 ? "border-b border-white/05" : ""}`}>
                  <span className="text-foreground/40 text-xs">{s.label}</span>
                  <span className="text-2xl font-extrabold text-foreground">{s.val}</span>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
