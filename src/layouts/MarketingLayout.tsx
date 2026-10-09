import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import AmbientBg from "../components/AmbientBg";
import MarketingNav from "../components/MarketingNav";

export default function MarketingLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AmbientBg />
      <MarketingNav />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}>
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
