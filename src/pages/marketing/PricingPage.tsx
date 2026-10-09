import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { LIME } from "../../constants";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import SectionLabel from "../../components/ui/SectionLabel";
import MarketingFooter from "../../components/MarketingFooter";

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What is Oceanier?", a: "Oceanier is an AI workforce platform that lets businesses deploy specialized AI crews — intelligent agents that handle customer support, sales, marketing, operations, and more — without coding or technical expertise." },
    { q: "Do I need coding knowledge?", a: "No. Oceanier is built for business owners and operators. Install, configure, and deploy AI crews through simple guided flows — no developers required." },
    { q: "How does AI learn my business?", a: "Parley analyzes your website, documents, and business information to understand your operation. Your AI crew is then configured with your business context, tone, and rules automatically." },
    { q: "Can I create custom AI workflows?", a: "Yes. Beyond the ready-to-deploy AI crew marketplace, Oceanier's team builds fully custom AI solutions for businesses with unique workflow requirements." },
    { q: "What tools can Oceanier connect with?", a: "Oceanier connects with Gmail, Slack, HubSpot, Salesforce, Shopify, Meta Messenger, WhatsApp, Google Workspace, n8n, Zapier, and many more through our integrations library." },
    { q: "How secure is my data?", a: "All data is isolated per organization with row-level security. Documents are stored in encrypted storage. Your data is never used to train AI models or shared with other organizations." },
  ];
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground">Common questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <GlassCard key={i} className="overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-foreground text-sm pr-4">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} className="text-foreground/30 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                    <div className="px-6 pb-6 text-xs text-foreground/50 leading-relaxed border-t border-white/04 pt-4">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: "Starter", subtitle: "For small teams", price: annual ? 49 : 59, credits: "10,000 AI Credits/mo", solutions: "2 Active AI Crew Members", members: "2 Team Members", highlight: false },
    { name: "Growth", subtitle: "For growing companies", price: annual ? 119 : 139, credits: "30,000 AI Credits/mo", solutions: "5 Active AI Crew Members", members: "5 Team Members", highlight: false },
    { name: "Business", subtitle: "For scaling automation", price: annual ? 249 : 289, credits: "80,000 AI Credits/mo", solutions: "Unlimited AI Crew Members", members: "15 Team Members", highlight: true },
    { name: "Enterprise", subtitle: "Custom AI workforce", price: null, credits: "Custom Credits", solutions: "Unlimited Everything", members: "Unlimited Members", highlight: false },
  ];
  return (
    <>
      <section className="pt-32 pb-8 px-6 text-center relative z-10">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="text-5xl font-extrabold text-foreground mt-4 mb-4">Simple pricing. Real value.</h1>
        <p className="text-foreground/45 max-w-lg mx-auto text-sm">Start free for 7 days, then choose the plan that fits your team.</p>
      </section>
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5">
              <button onClick={() => setAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-primary text-primary-foreground" : "text-foreground/50"}`}>Monthly</button>
              <button onClick={() => setAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${annual ? "bg-primary text-primary-foreground" : "text-foreground/50"}`}>
                Annual <span className="text-[10px] text-emerald-400 ml-0.5">–20%</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <GlassCard className={`p-6 h-full flex flex-col relative overflow-hidden ${p.highlight ? "ring-1 ring-primary/40" : ""}`}>
                  {p.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${LIME},transparent)` }} />
                  )}
                  <div className="mb-4">
                    <h3 className="text-sm font-extrabold text-foreground mb-0.5">{p.name}</h3>
                    <p className="text-[10px] text-foreground/35">{p.subtitle}</p>
                    {p.highlight && <div className="mt-2"><Badge color="lime">Most Popular</Badge></div>}
                  </div>
                  <div className="mb-6">
                    {p.price ? (
                      <><span className="text-4xl font-black text-foreground">${p.price}</span><span className="text-foreground/30 text-xs">/mo</span></>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">Custom</span>
                    )}
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {[p.credits, p.solutions, p.members, "All Deployment Channels", "Real-time Analytics"].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/55">
                        <Check size={12} style={{ color: LIME }} className="mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Btn variant={p.highlight ? "primary" : "glass"} className="w-full justify-center" onClick={() => navigate("/register")}>
                    {p.price ? "Start Free Trial" : "Contact Sales"}
                  </Btn>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
      <MarketingFooter />
    </>
  );
}
