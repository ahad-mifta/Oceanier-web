import { Outlet, Navigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import AppSidebar from "../components/AppSidebar";

export default function AppLayout() {
  const { session, profile, isAdmin, handleLogout } = useAuth();
  const location = useLocation();
  if (!session) return <Navigate to="/login" replace />;
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar isAdmin={isAdmin} profile={profile} onLogout={handleLogout} />
      <main className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="flex-1 flex overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
