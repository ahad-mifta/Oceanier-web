import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Bot, BookOpen, Globe, BarChart2, Users, Sparkles, Check } from "lucide-react";
import { LIME } from "../../constants";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import SectionLabel from "../../components/ui/SectionLabel";
import MarketingFooter from "../../components/MarketingFooter";

export default function FeaturesPage() {
  const navigate = useNavigate();
  const cats = [
    { title: "AI Workforce Management", icon: Bot, color: LIME, features: ["Install pre-built AI crews from the marketplace", "Configure AI instructions without coding", "Deploy to multiple channels simultaneously", "Version management & rollback"] },
    { title: "Knowledge Base", icon: BookOpen, color: "#3b82f6", features: ["Upload PDFs, DOCX, TXT documents", "Website crawling & auto-sync", "FAQ management", "Semantic search-powered retrieval"] },
    { title: "Multi-Channel Deployment", icon: Globe, color: "#8b5cf6", features: ["Website chat widget", "Meta Messenger integration", "REST API for custom integrations", "Scheduled automated workflows"] },
    { title: "Analytics & Reporting", icon: BarChart2, color: "#f59e0b", features: ["Real-time execution monitoring", "Fuel consumption tracking", "Lead & conversation analytics", "CSV & PDF export"] },
    { title: "Team & Organization", icon: Users, color: "#10b981", features: ["Role-based access control", "Multi-organization support", "Member invitation system", "Activity logs & audit trail"] },
    { title: "Parley AI Assistant", icon: Sparkles, color: "#ec4899", features: ["Natural language configuration", "Solution recommendations", "Onboarding guidance", "Platform navigation help"] },
  ];
  return (
    <>
      <section className="pt-32 pb-20 px-6 text-center relative z-10">
        <SectionLabel>Features</SectionLabel>
        <h1 className="text-5xl font-extrabold text-foreground mt-4 mb-6">Everything you need<br />to run an AI workforce</h1>
        <p className="text-lg text-foreground/45 max-w-2xl mx-auto mb-10">One platform. Unlimited AI power. Built for businesses that want results without the complexity.</p>
        <Btn onClick={() => navigate("/register")}>Start Free Trial <ArrowRight size={15} /></Btn>
      </section>
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                <GlassCard className="p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}20` }}>
                    <Icon size={22} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-4">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/50">
                        <Check size={12} style={{ color: cat.color }} className="mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
