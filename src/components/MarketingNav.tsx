import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useScrollY } from "../hooks/useScrollY";
import Btn from "./ui/Btn";
import Divider from "./ui/Divider";
import darkLogo from "../imports/Dark_BG-1.png";

export default function MarketingNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 40;
  const links = [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
  ];
  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50"
      style={{ background: scrolled ? "rgba(7,19,32,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => navigate("/")}><img src={darkLogo} alt="Oceanier" className="h-7 w-auto" /></button>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l.path} onClick={() => navigate(l.path)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${location.pathname === l.path ? "text-foreground" : "text-foreground/50 hover:text-foreground"}`}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Btn variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Btn>
          <Btn size="sm" onClick={() => navigate("/register")}>Start Free Trial</Btn>
        </div>
        <button className="md:hidden text-foreground/70" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-white/06 px-6 py-4 flex flex-col gap-3"
            style={{ background: "rgba(7,19,32,0.98)" }}>
            {links.map(l => (
              <button key={l.path} onClick={() => { navigate(l.path); setOpen(false); }}
                className="text-left text-foreground/60 hover:text-foreground py-2 text-sm">{l.label}</button>
            ))}
            <Divider />
            <Btn variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Btn>
            <Btn size="sm" onClick={() => navigate("/register")}>Start Free Trial</Btn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
