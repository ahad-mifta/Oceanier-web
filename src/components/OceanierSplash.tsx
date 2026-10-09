import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LIME } from "../constants";
import darkLogo from "../imports/Dark_BG-1.png";
import shipIcon from "../imports/Icon.png";

export default function OceanierSplash() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading 1=text 2=done

  useEffect(() => {
    const start = performance.now();
    const dur = 3800;
    const raf = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(raf);
      else setPhase(2);
    };
    requestAnimationFrame(raf);
    const t = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] overflow-hidden"
      style={{ background: "#071320" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(174,236,1,0.05) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
          <motion.div className="absolute rounded-full border"
            style={{ width: 120, height: 120, borderColor: "rgba(174,236,1,0.12)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute rounded-full border"
            style={{ width: 88, height: 88, borderColor: "rgba(174,236,1,0.2)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(174,236,1,0.08)", border: "1px solid rgba(174,236,1,0.25)" }}>
            <motion.img src={shipIcon} alt="Oceanier"
              style={{ width: 36, height: 36, objectFit: "contain" }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>

        <motion.div className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 12 }}
          transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}>
          <div className="flex items-baseline gap-2">
            <img src={darkLogo} alt="Oceanier" style={{ height: 22, objectFit: "contain" }} />
          </div>
          <p className="text-[11px] tracking-[0.18em] text-foreground/30 uppercase font-medium">AI Workforce Platform</p>
        </motion.div>

        <motion.p
          className="text-sm font-semibold tracking-wide"
          style={{ color: LIME }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 8 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0, 0, 1] }}>
          Anchors aweigh! Preparing your view...
        </motion.p>

        <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full" style={{ background: LIME }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.05, ease: "linear" }} />
        </div>

        <div className="flex items-center gap-1.5">
          {["Initializing", "Loading AI", "Ready"].map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <motion.div className="w-1 h-1 rounded-full"
                style={{ background: progress > (i + 1) / 3.5 ? LIME : "rgba(255,255,255,0.15)" }}
                animate={progress > (i + 1) / 3.5 ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }} />
              {i < 2 && <div className="w-4 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
