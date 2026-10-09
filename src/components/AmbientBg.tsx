import { motion } from "motion/react";

export default function AmbientBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <motion.div className="absolute rounded-full"
        style={{ width: 800, height: 800, top: -250, left: -200, background: "radial-gradient(circle,rgba(174,236,1,0.06) 0%,transparent 70%)", filter: "blur(60px)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute rounded-full"
        style={{ width: 700, height: 700, top: "35%", right: -150, background: "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)", filter: "blur(70px)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute rounded-full"
        style={{ width: 600, height: 600, bottom: -100, left: "45%", background: "radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)", filter: "blur(60px)" }}
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}
