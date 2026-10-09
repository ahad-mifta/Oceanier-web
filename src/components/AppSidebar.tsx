import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, ChevronRight, ChevronLeft, Settings, Users, BookOpen,
  MessageCircle, LogOut, Building, BarChart2, Zap, Package, Sparkles, User,
} from "lucide-react";
import type { Profile } from "../lib/database.types";
import { LIME } from "../constants";
import darkLogo from "../imports/Dark_BG-1.png";

export default function AppSidebar({ isAdmin, profile, onLogout }: {
  isAdmin: boolean; profile: Profile | null; onLogout: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = isAdmin ? [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Building, label: "Organizations", path: "/admin/orgs" },
    { icon: Package, label: "Solutions", path: "/admin/solutions" },
    { icon: MessageCircle, label: "Requests", path: "/admin/requests" },
    { icon: BarChart2, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ] : [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Package, label: "Solutions", path: "/solutions" },
    { icon: BookOpen, label: "Knowledge", path: "/knowledge" },
    { icon: Sparkles, label: "Parley", path: "/parley" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Zap, label: "Fuel", path: "/fuel" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="flex flex-col shrink-0 h-screen sticky top-0 border-r transition-all duration-300"
      style={{ width: collapsed ? 64 : 216, background: "rgba(6,16,32,0.97)", borderColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/05">
        {!collapsed && <img src={darkLogo} alt="Oceanier" className="h-5 w-auto" />}
        <button onClick={() => setCollapsed(!collapsed)} className="text-foreground/25 hover:text-foreground p-1 rounded-lg hover:bg-white/05 transition-colors ml-auto">
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
      <nav className="flex-1 p-2.5 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-all text-xs font-semibold ${active ? "" : "text-foreground/35 hover:text-foreground hover:bg-white/04"}`}
              style={active ? { background: "rgba(174,236,1,0.1)", color: LIME } : {}}>
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      {!collapsed && !isAdmin && (
        <div className="mx-3 mb-3 p-3 rounded-[14px] border border-white/05 bg-white/02">
          <div className="flex justify-between text-[10px] text-foreground/30 mb-2">
            <span className="flex items-center gap-1"><Zap size={9} style={{ color: LIME }} />Fuel</span>
            <span>12,400 left</span>
          </div>
          <div className="h-1 rounded-full bg-white/06 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "41%", background: LIME }} />
          </div>
        </div>
      )}
      <div className="p-2.5 border-t border-white/05">
        <div className="flex items-center gap-3 p-2 rounded-[12px] hover:bg-white/04 transition-colors cursor-pointer" onClick={onLogout}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(174,236,1,0.12)", border: "1px solid rgba(174,236,1,0.18)" }}>
            <User size={13} style={{ color: LIME }} />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-foreground truncate">{profile?.full_name ?? (isAdmin ? "Admin User" : "User")}</div>
              <div className="text-[9px] text-foreground/25 truncate">{isAdmin ? "Super Admin" : (profile?.email ?? "")}</div>
            </div>
          )}
          {!collapsed && <LogOut size={12} className="text-foreground/20 shrink-0" />}
        </div>
      </div>
    </aside>
  );
}
