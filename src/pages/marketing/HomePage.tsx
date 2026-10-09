import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Sparkles, Headphones, Target, BookOpen, Share2, Cpu, Search,
  Check, Globe, TrendingUp, Bot, Activity, Zap, Shield, Clock, Send,
  User, ChevronDown, CheckCircle,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { LIME } from "../../constants";
import { PARLEY_CONVOS } from "../../data/mockData";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import SectionLabel from "../../components/ui/SectionLabel";
import Divider from "../../components/ui/Divider";
import Input from "../../components/ui/Input";
import MarketingFooter from "../../components/MarketingFooter";
import darkLogo from "../../imports/Dark_BG-1.png";
import shipIcon from "../../imports/Icon.png";

// ─── Command Center Visualization ─────────────────────────────────────────────

function CommandCenterViz() {
  const cx = 220, cy = 220;
  const crewCards = [
    { label: "Customer Support", stat: "245 conversations solved", icon: Headphones, color: "#3b82f6", angle: -90, r: 158 },
    { label: "Sales Navigator", stat: "68 leads qualified today", icon: Target, color: LIME, angle: -18, r: 158 },
    { label: "Marketing Crew", stat: "12 campaigns optimized", icon: Share2, color: "#ec4899", angle: 54, r: 158 },
    { label: "Operations", stat: "34 workflows automated", icon: Cpu, color: "#f59e0b", angle: 126, r: 158 },
    { label: "Knowledge Keeper", stat: "128 queries answered", icon: BookOpen, color: "#10b981", angle: 198, r: 158 },
  ];

  return (
    <>
      <style>{`
        @keyframes ccFloat0{0%,100%{transform:translateY(0px)}50%{transform:translateY(-6px)}}
        @keyframes ccFloat1{0%,100%{transform:translateY(0px)}50%{transform:translateY(-7px)}}
        @keyframes ccFloat2{0%,100%{transform:translateY(0px)}50%{transform:translateY(-5px)}}
        @keyframes ccFloat3{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
        @keyframes ccFloat4{0%,100%{transform:translateY(0px)}50%{transform:translateY(-6px)}}
        @keyframes ccShip {0%,100%{transform:translateY(0px)}50%{transform:translateY(-7px)}}
        .cc-float-0{animation:ccFloat0 3.8s ease-in-out infinite;}
        .cc-float-1{animation:ccFloat1 4.2s ease-in-out infinite 0.4s;}
        .cc-float-2{animation:ccFloat2 3.5s ease-in-out infinite 0.8s;}
        .cc-float-3{animation:ccFloat3 4.6s ease-in-out infinite 0.2s;}
        .cc-float-4{animation:ccFloat4 3.9s ease-in-out infinite 0.6s;}
        .cc-ship  {animation:ccShip  4.2s ease-in-out infinite;will-change:transform;}
      `}</style>
      <div className="relative select-none" style={{ width: 460, height: 460 }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at center, rgba(174,236,1,0.06) 0%, transparent 60%)",
        }} />
        <svg className="absolute inset-0" width="460" height="460" style={{ overflow: "visible" }}>
          <defs>
            <radialGradient id="ccGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={LIME} stopOpacity="0.2" />
              <stop offset="100%" stopColor={LIME} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r="152" fill="none" stroke="rgba(174,236,1,0.07)" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx={cx} cy={cy} r="78" fill="none" stroke="rgba(174,236,1,0.1)" strokeWidth="1" />
          {crewCards.map((c, i) => {
            const nx = cx + c.r * Math.cos(c.angle * Math.PI / 180);
            const ny = cy + c.r * Math.sin(c.angle * Math.PI / 180);
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={`${c.color}22`} strokeWidth="1.5" />
                <circle r="2.5" fill={c.color} opacity="0.9">
                  <animateMotion dur={`${3.2 + i * 0.5}s`} repeatCount="indefinite"
                    path={`M${cx},${cy} L${nx},${ny}`} />
                </circle>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="70" fill="url(#ccGlow)" />
          <circle cx={cx} cy={cy} r="58" fill="rgba(7,19,32,0.94)" stroke="rgba(174,236,1,0.4)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="42" fill="rgba(11,39,66,0.9)" stroke="rgba(174,236,1,0.12)" strokeWidth="1" />
        </svg>

        <div className="cc-ship absolute flex items-center justify-center"
          style={{ left: cx - 28, top: cy - 28, width: 56, height: 56 }}>
          <img src={shipIcon} alt="Oceanier" style={{ width: 40, height: 40, objectFit: "contain" }} />
        </div>

        {crewCards.map((c, i) => {
          const nx = cx + c.r * Math.cos(c.angle * Math.PI / 180);
          const ny = cy + c.r * Math.sin(c.angle * Math.PI / 180);
          const Icon = c.icon;
          return (
            <div key={i} className={`cc-float-${i} absolute rounded-[16px] p-3 flex flex-col gap-1`}
              style={{
                left: nx - 66, top: ny - 36, width: 132,
                background: "rgba(11,39,66,0.88)",
                border: `1px solid ${c.color}28`,
                backdropFilter: "blur(12px)",
                willChange: "transform",
              }}>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}18` }}>
                  <Icon size={11} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-bold text-white/80 leading-tight">{c.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full shrink-0 animate-pulse" style={{ background: c.color }} />
                <span className="text-[9px] text-white/40 leading-tight">{c.stat}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Scroll Section ────────────────────────────────────────────────────────────

function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }} className={`relative z-10 ${className}`}>
      {children}
    </motion.section>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVis, setStatsVis] = useState(false);
  const s1 = useCountUp(500, statsVis);
  const s2 = useCountUp(10, statsVis);
  const s3 = useCountUp(99, statsVis);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.5 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 mb-8">
            <Sparkles size={11} style={{ color: LIME }} />
            <span className="text-[10px] font-bold tracking-[0.12em] text-primary uppercase">AI Workforce Platform</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.06] mb-6">
            Build Your<br /><span style={{ color: LIME }}>AI Workforce.</span><br />Let Your Business<br />Run Smarter.
          </h1>
          <p className="text-lg text-foreground/50 leading-relaxed mb-10 max-w-lg">
            Deploy intelligent AI employees that handle customer support, sales, operations, and repetitive tasks — without coding or technical teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Btn size="lg" onClick={() => navigate("/register")} className="shadow-[0_0_40px_rgba(174,236,1,0.3)]">
              Start Your AI Crew <ArrowRight size={16} />
            </Btn>
            <Btn variant="glass" size="lg" onClick={() => navigate("/about")}>
              Request Custom AI Solution
            </Btn>
          </div>
          <div ref={statsRef} className="flex items-center gap-8">
            {[
              { val: `${s1}+`, label: "Businesses" },
              { val: `${s2}M+`, label: "Messages Handled" },
              { val: `${s3}.9%`, label: "Uptime" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-foreground">{stat.val}</div>
                <div className="text-xs text-foreground/35 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          className="flex justify-center lg:justify-end">
          <CommandCenterViz />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Ecosystem Slider ──────────────────────────────────────────────────────────

function EcosystemSlider() {
  const tools = [
    { name: "ChatGPT", cat: "AI" }, { name: "Claude", cat: "AI" }, { name: "Gemini", cat: "AI" },
    { name: "OpenAI API", cat: "AI" }, { name: "Google AI", cat: "AI" }, { name: "Kimi", cat: "AI" },
    { name: "Gmail", cat: "Comms" }, { name: "Slack", cat: "Comms" }, { name: "Meta Messenger", cat: "Comms" },
    { name: "WhatsApp", cat: "Comms" }, { name: "MS Teams", cat: "Comms" }, { name: "Discord", cat: "Comms" },
    { name: "HubSpot", cat: "CRM" }, { name: "Salesforce", cat: "CRM" }, { name: "Zoho CRM", cat: "CRM" },
    { name: "Shopify", cat: "Store" }, { name: "WordPress", cat: "Web" }, { name: "Stripe", cat: "Pay" },
    { name: "n8n", cat: "Auto" }, { name: "Zapier", cat: "Auto" }, { name: "Make", cat: "Auto" },
    { name: "Google Workspace", cat: "Biz" }, { name: "Notion", cat: "Docs" }, { name: "Airtable", cat: "Data" },
  ];
  const catColor: Record<string, string> = {
    AI: "#3b82f6", Comms: "#8b5cf6", CRM: LIME, Store: "#f59e0b",
    Web: "#06b6d4", Pay: "#10b981", Auto: "#ec4899", Biz: "#f97316", Docs: "#a78bfa", Data: "#34d399",
  };
  const doubled = [...tools, ...tools];
  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-6 mb-12">
        <SectionLabel>Technology Ecosystem</SectionLabel>
        <h2 className="text-3xl font-extrabold text-foreground mb-3">Connected With The Tools<br />Your Business Already Uses</h2>
        <p className="text-sm text-foreground/40 max-w-xl mx-auto">Oceanier connects your AI crews with the tools, platforms, and systems your business already depends on.</p>
      </div>
      <div className="mb-3 overflow-hidden">
        <motion.div className="flex gap-3 items-center"
          animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }}>
          {doubled.map((t, i) => (
            <div key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap shrink-0 hover:scale-105 hover:brightness-125 cursor-default transition-all duration-200"
              style={{ background: `${catColor[t.cat] || LIME}10`, borderColor: `${catColor[t.cat] || LIME}25` }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: catColor[t.cat] || LIME }} />
              <span className="text-xs font-semibold text-foreground/70">{t.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div className="flex gap-3 items-center"
          animate={{ x: ["-50%", "0%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
          {doubled.slice().reverse().map((t, i) => (
            <div key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap shrink-0 hover:scale-105 hover:brightness-125 cursor-default transition-all duration-200"
              style={{ background: `${catColor[t.cat] || LIME}08`, borderColor: `${catColor[t.cat] || LIME}18` }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: catColor[t.cat] || LIME }} />
              <span className="text-xs font-semibold text-foreground/60">{t.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{ background: "linear-gradient(90deg,rgba(7,19,32,1),transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: "linear-gradient(270deg,rgba(7,19,32,1),transparent)" }} />
    </section>
  );
}

// ─── Problem Section ───────────────────────────────────────────────────────────

function ProblemSection() {
  const problems = [
    { icon: Headphones, title: "Customer Support", before: "Answering the same questions every day.", after: "AI handles conversations 24/7 — instantly.", color: "#3b82f6" },
    { icon: Target, title: "Sales", before: "Manually following up on every lead.", after: "AI qualifies and nurtures prospects automatically.", color: LIME },
    { icon: Cpu, title: "Operations", before: "Moving data between systems by hand.", after: "AI automates workflows without human input.", color: "#8b5cf6" },
    { icon: BookOpen, title: "Internal Work", before: "Searching through documents for answers.", after: "AI finds and delivers answers instantly.", color: "#f59e0b" },
  ];
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground">Businesses Are Drowning<br />In Repetitive Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }} viewport={{ once: true }}>
                <GlassCard className="p-7 h-full overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle,${p.color}08 0%,transparent 70%)`, transform: "translate(30%,-30%)" }} />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${p.color}14`, border: `1px solid ${p.color}22` }}>
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <h3 className="text-sm font-extrabold text-foreground">{p.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[16px] p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-red-400/70 mb-2">Before</div>
                      <p className="text-xs text-foreground/55 leading-relaxed">{p.before}</p>
                    </div>
                    <div className="rounded-[16px] p-4" style={{ background: `${p.color}08`, border: `1px solid ${p.color}18` }}>
                      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: `${p.color}aa` }}>After</div>
                      <p className="text-xs text-foreground/80 leading-relaxed font-medium">{p.after}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── What Is Section ───────────────────────────────────────────────────────────

function WhatIsSection() {
  const [active, setActive] = useState(0);
  const nodes = [
    { icon: User, label: "Business Owner", sublabel: "You", color: "#3b82f6", detail: "You describe your business, goals, and the problems you want solved. No technical knowledge needed.", tags: ["Any industry", "Plain language", "Zero setup"] },
    { icon: Sparkles, label: "Parley Analysis", sublabel: "AI Consultant", color: LIME, detail: "Parley reads your website, documents, and business context. It maps out every automation opportunity.", tags: ["Website scan", "Doc analysis", "Gap mapping"] },
    { icon: Bot, label: "Your AI Crew", sublabel: "Deployed agents", color: "#8b5cf6", detail: "Specialized AI employees are deployed for support, sales, operations, and more — working 24/7.", tags: ["Support", "Sales", "Operations", "Research"] },
    { icon: TrendingUp, label: "Business Growth", sublabel: "Measurable results", color: "#10b981", detail: "More handled, less manual work. Track conversations, leads, hours saved, and ROI in real time.", tags: ["70% faster", "24/7 active", "0 coding"] },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % nodes.length), 2800);
    return () => clearInterval(t);
  }, [nodes.length]);

  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>What is Oceanier</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground mb-4">The Operating System<br /><span style={{ color: LIME }}>For Your AI Workforce</span></h2>
          <p className="text-sm text-foreground/40 max-w-xl mx-auto">From business owner to measurable growth — Oceanier orchestrates the entire journey automatically.</p>
        </div>

        <div className="relative mb-12">
          <div className="hidden md:block absolute top-[44px] left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(174,236,1,0.3), rgba(139,92,246,0.2), rgba(16,185,129,0.25))" }} />
          <style>{`
            @keyframes trackFlow{0%{left:12.5%}100%{left:87.5%}}
            .track-dot{animation:trackFlow 2.8s linear infinite;position:absolute;top:40px;width:8px;height:8px;border-radius:50%;margin-left:-4px;}
          `}</style>
          <div className="track-dot hidden md:block" style={{ background: LIME, boxShadow: `0 0 10px ${LIME}` }} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nodes.map((n, i) => {
              const Icon = n.icon;
              const isActive = active === i;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActive(i)}>
                  <div className="relative mb-4">
                    <motion.div className="w-[88px] h-[88px] rounded-3xl flex items-center justify-center transition-all duration-500"
                      animate={{
                        background: isActive ? `${n.color}18` : "rgba(255,255,255,0.03)",
                        borderColor: isActive ? `${n.color}50` : "rgba(255,255,255,0.07)",
                        boxShadow: isActive ? `0 0 32px ${n.color}22, inset 0 0 20px ${n.color}08` : "none",
                      }}
                      style={{ border: "1px solid" }}>
                      <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.4 }}>
                        <Icon size={28} style={{ color: isActive ? n.color : "rgba(255,255,255,0.25)", transition: "color 0.4s" }} />
                      </motion.div>
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                      style={{ background: isActive ? n.color : "rgba(255,255,255,0.1)", color: isActive ? "#011A2E" : "rgba(255,255,255,0.4)", transition: "all 0.4s" }}>
                      {i + 1}
                    </div>
                    {isActive && (
                      <motion.div className="absolute inset-0 rounded-3xl"
                        initial={{ opacity: 0.5, scale: 1 }} animate={{ opacity: 0, scale: 1.35 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ border: `2px solid ${n.color}` }} />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-extrabold text-foreground mb-0.5">{n.label}</div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold"
                      style={{ color: isActive ? n.color : "rgba(255,255,255,0.25)", transition: "color 0.4s" }}>
                      {n.sublabel}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}>
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 20% 50%, ${nodes[active].color}06 0%, transparent 60%)` }} />
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${nodes[active].color}50, transparent)` }} />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${nodes[active].color}14`, border: `1px solid ${nodes[active].color}25` }}>
                  {(() => { const Icon = nodes[active].icon; return <Icon size={22} style={{ color: nodes[active].color }} />; })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-foreground mb-2">{nodes[active].label}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed mb-4">{nodes[active].detail}</p>
                  <div className="flex flex-wrap gap-2">
                    {nodes[active].tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{ background: `${nodes[active].color}12`, border: `1px solid ${nodes[active].color}22`, color: nodes[active].color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 shrink-0">
                  {nodes.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: active === i ? 24 : 8, height: 8,
                        background: active === i ? nodes[active].color : "rgba(255,255,255,0.12)",
                      }} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </ScrollSection>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    { num: "01", icon: Sparkles, color: "#3b82f6", title: "Tell Parley About Your Business", desc: "Upload your website, documents, and business info. Parley instantly understands your operation.", items: ["Website analysis", "Document processing", "Business profiling"] },
    { num: "02", icon: Bot, color: LIME, title: "Get Your AI Crew", desc: "Parley recommends the exact AI crews your business needs. Install with one click — no config required.", items: ["Support Crew", "Sales Crew", "Marketing Crew", "Research Crew"] },
    { num: "03", icon: Activity, color: "#8b5cf6", title: "Deploy And Let Them Work", desc: "Connect your tools and channels. Your AI crew goes live and starts handling work immediately — 24/7.", items: ["Website widget", "API integration", "Business tools", "Live monitoring"] },
  ];
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Up and running in three steps.</h2>
          <p className="text-foreground/40 max-w-lg mx-auto text-sm">From signup to a fully deployed AI workforce in minutes — not months.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}>
                <GlassCard className="p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-[48px] font-black opacity-[0.04] text-foreground leading-none select-none">{s.num}</div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0"
                    style={{ background: `${s.color}14`, border: `1px solid ${s.color}22` }}>
                    <Icon size={26} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-3">{s.title}</h3>
                  <p className="text-xs text-foreground/45 leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map(item => (
                      <span key={item} className="text-[10px] px-2.5 py-1 rounded-full border font-semibold"
                        style={{ background: `${s.color}08`, borderColor: `${s.color}18`, color: s.color }}>{item}</span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── Crews Section ─────────────────────────────────────────────────────────────

function CrewsSection() {
  const navigate = useNavigate();
  const crew = [
    { title: "Customer Support Captain", icon: Headphones, color: "#3b82f6", role: "Frontline support specialist", handles: ["Customer questions 24/7", "FAQs & product info", "Ticket resolution & escalation"], tools: ["Website Chat", "Email", "Meta Messenger"], stat: "Resolves 80% of tickets automatically" },
    { title: "Sales Navigator", icon: Target, color: LIME, role: "Lead qualification expert", handles: ["Lead scoring & qualification", "Automated follow-ups", "Meeting booking"], tools: ["CRM", "Calendar", "Email"], stat: "Qualifies leads 10× faster" },
    { title: "Knowledge Keeper", icon: BookOpen, color: "#10b981", role: "Internal intelligence agent", handles: ["Employee document queries", "SOPs & policy lookup", "Instant knowledge retrieval"], tools: ["Slack", "Notion", "API"], stat: "Answers in under 2 seconds" },
    { title: "Marketing Assistant", icon: Share2, color: "#ec4899", role: "Content & campaign specialist", handles: ["Content workflow support", "Campaign optimization", "Social media automation"], tools: ["Meta", "Email", "Analytics"], stat: "3× faster campaign execution" },
    { title: "Operations Crew", icon: Cpu, color: "#f59e0b", role: "Workflow automation agent", handles: ["Cross-system data sync", "Repetitive task automation", "Process orchestration"], tools: ["n8n", "Zapier", "APIs"], stat: "Eliminates 90% of manual data entry" },
    { title: "Research Analyst", icon: Search, color: "#8b5cf6", role: "Intelligence & insights agent", handles: ["Web research & summarization", "Competitive analysis", "Structured reports"], tools: ["Web", "Reports", "API"], stat: "Research reports in minutes" },
  ];
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Your AI Crew</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Hire Your Digital Employees</h2>
          <p className="text-sm text-foreground/40 max-w-xl mx-auto">Each AI crew member is a specialized agent trained to do one job exceptionally well. Install the crew your business needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {crew.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                <GlassCard hover className="p-6 h-full flex flex-col" onClick={() => navigate("/register")}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}14`, border: `1px solid ${c.color}22` }}>
                      <Icon size={22} style={{ color: c.color }} />
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-foreground/30">{c.role}</div>
                  </div>
                  <h3 className="text-sm font-extrabold text-foreground mb-1">{c.title}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: c.color }} />
                    <span className="text-[10px] font-semibold" style={{ color: c.color }}>{c.stat}</span>
                  </div>
                  <ul className="space-y-1.5 flex-1 mb-5">
                    {c.handles.map(h => (
                      <li key={h} className="flex items-start gap-2 text-[11px] text-foreground/50">
                        <Check size={11} style={{ color: c.color }} className="mt-0.5 shrink-0" />{h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {c.tools.map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border font-semibold"
                          style={{ background: `${c.color}08`, borderColor: `${c.color}15`, color: "rgba(255,255,255,0.4)" }}>{t}</span>
                      ))}
                    </div>
                    <Btn size="sm">Hire</Btn>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── Parley Chat Demo ──────────────────────────────────────────────────────────

function ParleyChatDemo() {
  const [convoIdx, setConvoIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [tick, setTick] = useState(0);
  const [typedUser, setTypedUser] = useState("");
  const [typedReply, setTypedReply] = useState("");
  const [inputText, setInputText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charRef = useRef(0);
  const inView = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  const startConvo = useCallback((idx: number) => {
    clear();
    setConvoIdx(idx);
    setTypedUser("");
    setTypedReply("");
    setInputText("");
    charRef.current = 0;
    setPhase(1);
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    const full = PARLEY_CONVOS[convoIdx].user;
    if (charRef.current <= full.length) {
      timerRef.current = setTimeout(() => {
        setInputText(full.slice(0, charRef.current + 1));
        charRef.current++;
        setTick(t => t + 1);
      }, 48);
    } else {
      timerRef.current = setTimeout(() => {
        setTypedUser(full);
        setInputText("");
        charRef.current = 0;
        setPhase(2);
      }, 350);
    }
    return clear;
  }, [phase, convoIdx, tick]);

  useEffect(() => {
    if (phase !== 2) return;
    timerRef.current = setTimeout(() => {
      charRef.current = 0;
      setPhase(3);
    }, 1200);
    return clear;
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) return;
    const full = PARLEY_CONVOS[convoIdx].reply;
    if (charRef.current <= full.length) {
      timerRef.current = setTimeout(() => {
        setTypedReply(full.slice(0, charRef.current + 1));
        charRef.current++;
        setTick(t => t + 1);
      }, 18);
    } else {
      timerRef.current = setTimeout(() => setPhase(4), 2600);
    }
    return clear;
  }, [phase, convoIdx, tick]);

  useEffect(() => {
    if (phase !== 4) return;
    timerRef.current = setTimeout(() => {
      startConvo((convoIdx + 1) % PARLEY_CONVOS.length);
    }, 600);
    return clear;
  }, [phase, convoIdx, startConvo]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inView.current) {
        inView.current = true;
        timerRef.current = setTimeout(() => startConvo(0), 600);
      }
    }, { threshold: 0.4 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { obs.disconnect(); clear(); };
  }, [startConvo]);

  const isThinking = phase === 2;

  return (
    <div ref={containerRef}>
      <GlassCard className="p-6 overflow-hidden">
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/05">
          <div className="relative">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(174,236,1,0.12)", border: "1px solid rgba(174,236,1,0.22)" }}>
              <img src={shipIcon} alt="Parley" style={{ width: 22, height: 22, objectFit: "contain" }} />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-foreground">Parley</div>
            <div className="text-[10px] text-emerald-400 font-medium">AI Business Consultant · Online</div>
          </div>
          <div className="ml-auto flex gap-1">
            {PARLEY_CONVOS.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-500"
                style={{ width: convoIdx === i ? 16 : 4, background: convoIdx === i ? LIME : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>

        <div className="space-y-4 min-h-[200px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            {typedUser && (
              <motion.div key={`u-${convoIdx}`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.28 }}
                className="flex justify-end">
                <div className="max-w-[200px] px-4 py-2.5 rounded-[16px] rounded-tr-[4px] text-xs font-semibold leading-relaxed"
                  style={{ background: LIME, color: "#011A2E" }}>
                  {typedUser}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isThinking && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(174,236,1,0.1)", border: "1px solid rgba(174,236,1,0.18)" }}>
                  <Sparkles size={12} style={{ color: LIME }} />
                </div>
                <div className="px-4 py-3 rounded-[16px] rounded-tl-[4px] flex items-center gap-1.5"
                  style={{ background: "rgba(11,39,66,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {[0, 1, 2].map(j => (
                    <motion.div key={j} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(174,236,1,0.5)" }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.16 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {typedReply && (
              <motion.div key={`r-${convoIdx}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
                className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(174,236,1,0.1)", border: "1px solid rgba(174,236,1,0.18)" }}>
                  <Sparkles size={12} style={{ color: LIME }} />
                </div>
                <div className="max-w-[220px] px-4 py-3 rounded-[16px] rounded-tl-[4px] text-xs leading-relaxed whitespace-pre-line"
                  style={{ background: "rgba(11,39,66,0.88)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(232,244,248,0.78)" }}>
                  {typedReply}
                  {phase === 3 && <span className="inline-block w-0.5 h-3 ml-0.5 align-middle animate-pulse" style={{ background: LIME }} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 mt-5 px-3 py-2.5 rounded-[14px] border border-white/08 bg-white/03">
          <span className="flex-1 text-xs text-foreground/35 min-h-[16px]">
            {inputText || "Describe your business to Parley..."}
            {phase === 1 && <span className="inline-block w-0.5 h-3 ml-0.5 align-middle animate-pulse" style={{ background: LIME }} />}
          </span>
          <div className="w-7 h-7 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: LIME }}>
            <Send size={12} style={{ color: "#011A2E" }} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Parley Section ────────────────────────────────────────────────────────────

function ParleySection() {
  const navigate = useNavigate();
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <ParleyChatDemo />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}>
            <SectionLabel>Parley AI Consultant</SectionLabel>
            <h2 className="text-4xl font-extrabold text-foreground mb-4">
              Meet Parley.<br /><span style={{ color: LIME }}>Your AI Business Consultant.</span>
            </h2>
            <p className="text-sm text-foreground/45 leading-relaxed mb-8">
              Tell Parley about your business in plain language. It analyzes your operation, identifies automation opportunities, and builds your AI crew — all through a simple conversation.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: Globe, label: "Analyzes your website & documents" },
                { icon: Sparkles, label: "Identifies automation opportunities" },
                { icon: Bot, label: "Recommends the right AI crew" },
                { icon: Zap, label: "Deploys your workforce instantly" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(174,236,1,0.08)", border: "1px solid rgba(174,236,1,0.12)" }}>
                      <Icon size={14} style={{ color: LIME }} />
                    </div>
                    <span className="text-sm text-foreground/65">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <Btn size="lg" onClick={() => navigate("/register")} className="shadow-[0_0_30px_rgba(174,236,1,0.2)]">
              Talk With Parley <ArrowRight size={16} />
            </Btn>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── Custom Solutions Section ──────────────────────────────────────────────────

function CustomSolutionsSection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", website: "", type: "", problem: "" });
  const [sent, setSent] = useState(false);
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <SectionLabel>Custom AI Solutions</SectionLabel>
            <h2 className="text-4xl font-extrabold text-foreground mb-6">
              Need Something Built<br />Specifically For<br /><span style={{ color: LIME }}>Your Business?</span>
            </h2>
            <p className="text-sm text-foreground/45 leading-relaxed mb-8">Every business has unique workflows. Our AI engineers design custom AI solutions tailored to your specific operation — from concept to deployment.</p>
            <div className="space-y-5">
              {[
                { icon: Shield, title: "Enterprise-grade", desc: "Production-ready AI systems built to your specifications" },
                { icon: Globe, title: "Any integration", desc: "Connect to any system, API, or internal tool you use" },
                { icon: TrendingUp, title: "Fully managed", desc: "We monitor, maintain, and improve your custom solution" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(174,236,1,0.08)", border: "1px solid rgba(174,236,1,0.12)" }}>
                      <Icon size={16} style={{ color: LIME }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground mb-0.5">{item.title}</div>
                      <div className="text-xs text-foreground/40">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}>
            <GlassCard className="p-8">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle size={40} style={{ color: LIME }} className="mx-auto mb-4" />
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Request Received!</h3>
                  <p className="text-sm text-foreground/45">Our team will reach out within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-extrabold text-foreground mb-6">Request Custom AI Solution</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Name" placeholder="Jane Smith" value={form.name} onChange={v => setForm({ ...form, name: v })} />
                      <Input label="Company" placeholder="Acme Corp" value={form.company} onChange={v => setForm({ ...form, company: v })} />
                    </div>
                    <Input label="Email" type="email" placeholder="jane@acmecorp.com" value={form.email} onChange={v => setForm({ ...form, email: v })} />
                    <Input label="Website" placeholder="https://yoursite.com" value={form.website} onChange={v => setForm({ ...form, website: v })} />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Business Type</label>
                      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-[18px] border border-white/10 text-foreground text-sm outline-none focus:border-primary/50"
                        style={{ background: "#0B2742" }}>
                        <option value="">Select type</option>
                        {["E-commerce", "Healthcare", "Real Estate", "Finance", "Education", "Restaurant", "Agency", "SaaS", "Other"].map(t => (
                          <option key={t} value={t} style={{ background: "#0B2742" }}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Problem to Solve</label>
                      <textarea placeholder="Describe the workflow or problem you want AI to handle..." rows={3}
                        value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })}
                        className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground placeholder-foreground/20 text-sm outline-none focus:border-primary/40 resize-none" />
                    </div>
                    <Btn className="w-full justify-center mt-2" onClick={() => setSent(true)}>
                      Request Custom AI Solution <ArrowRight size={15} />
                    </Btn>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── Why Section ───────────────────────────────────────────────────────────────

function WhySection() {
  const { ref, inView } = useInView();
  const metrics = [
    { val: "70%", label: "Faster Customer Response", icon: Zap, color: LIME },
    { val: "24/7", label: "AI Availability", icon: Clock, color: "#3b82f6" },
    { val: "10×", label: "Faster Operations", icon: TrendingUp, color: "#8b5cf6" },
    { val: "0", label: "Coding Required", icon: Shield, color: "#10b981" },
  ];
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Business Results</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground">Real Business Impact</h2>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <GlassCard className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center,${m.color}06 0%,transparent 70%)` }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${m.color}14`, border: `1px solid ${m.color}22` }}>
                    <Icon size={18} style={{ color: m.color }} />
                  </div>
                  <div className="text-4xl font-black mb-2" style={{ color: m.color }}>{m.val}</div>
                  <div className="text-xs text-foreground/45 leading-tight">{m.label}</div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}

// ─── Pricing Section ───────────────────────────────────────────────────────────

function PricingSection() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: "Starter", subtitle: "For small teams", price: annual ? 49 : 59, credits: "10,000 AI Credits/mo", solutions: "2 Active AI Crew Members", members: "2 Team Members", highlight: false },
    { name: "Growth", subtitle: "For growing companies", price: annual ? 119 : 139, credits: "30,000 AI Credits/mo", solutions: "5 Active AI Crew Members", members: "5 Team Members", highlight: false },
    { name: "Business", subtitle: "For scaling automation", price: annual ? 249 : 289, credits: "80,000 AI Credits/mo", solutions: "Unlimited AI Crew Members", members: "15 Team Members", highlight: true },
    { name: "Enterprise", subtitle: "Custom AI workforce", price: null, credits: "Custom Credits", solutions: "Unlimited Everything", members: "Unlimited Members", highlight: false },
  ];
  return (
    <ScrollSection className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-4xl font-extrabold text-foreground mb-6">Simple Plans For Every Business</h2>
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
    </ScrollSection>
  );
}

// ─── FAQ Section ───────────────────────────────────────────────────────────────

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
    <ScrollSection className="py-32 px-6">
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
    </ScrollSection>
  );
}

// ─── Final CTA Section ─────────────────────────────────────────────────────────

function FinalCTASection() {
  const navigate = useNavigate();
  return (
    <ScrollSection className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(174,236,1,0.06) 0%, transparent 65%)" }} />
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${LIME}40, transparent)` }} />
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)" }} />
          </div>
          <div className="relative z-10 p-16 text-center">
            <motion.div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-3xl"
              style={{ background: "rgba(174,236,1,0.08)", border: "1px solid rgba(174,236,1,0.18)" }}
              animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <img src={shipIcon} alt="Oceanier" style={{ width: 52, height: 52, objectFit: "contain" }} />
            </motion.div>
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Your AI Crew Is Ready.</h2>
            <p className="text-foreground/45 mb-10 text-sm max-w-md mx-auto leading-relaxed">
              Start your 7-day free trial today. Deploy your first AI crew in minutes — no coding, no developers, no complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Btn size="lg" onClick={() => navigate("/register")} className="shadow-[0_0_40px_rgba(174,236,1,0.3)]">
                Start Building <ArrowRight size={16} />
              </Btn>
              <Btn variant="glass" size="lg" onClick={() => navigate("/about")}>
                Request Custom Solution
              </Btn>
            </div>
            <p className="text-[10px] text-foreground/25 mt-6">No credit card required · 7-day free trial · Cancel anytime</p>
          </div>
        </GlassCard>
      </div>
    </ScrollSection>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EcosystemSlider />
      <ProblemSection />
      <WhatIsSection />
      <HowItWorksSection />
      <CrewsSection />
      <ParleySection />
      <CustomSolutionsSection />
      <WhySection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <MarketingFooter />
    </>
  );
}
