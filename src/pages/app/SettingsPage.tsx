import { useState } from "react";
import { Settings, Upload } from "lucide-react";
import { LIME } from "../../constants";
import AppTopBar from "../../components/AppTopBar";
import Btn from "../../components/ui/Btn";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  return (
    <div className="flex-1 overflow-y-auto">
      <AppTopBar title="Settings" />
      <div className="flex">
        <div className="w-44 p-5 space-y-0.5 border-r border-white/05 shrink-0 min-h-full">
          {["profile", "organization", "billing", "security", "notifications"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium capitalize transition-colors ${tab === t ? "text-primary" : "text-foreground/35 hover:text-foreground hover:bg-white/04"}`}
              style={tab === t ? { background: "rgba(174,236,1,0.07)" } : {}}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 p-8">
          {tab === "profile" && (
            <GlassCard className="p-8 max-w-md space-y-4">
              <h3 className="text-sm font-extrabold text-foreground mb-6">Profile Settings</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold"
                  style={{ background: "rgba(174,236,1,0.1)", border: "1px solid rgba(174,236,1,0.18)", color: LIME }}>J</div>
                <Btn size="sm" variant="glass"><Upload size={12} />Change Photo</Btn>
              </div>
              <Input label="Full Name" value="Jane Smith" />
              <Input label="Email" type="email" value="jane@acmecorp.com" />
              <Btn className="mt-2">Save Changes</Btn>
            </GlassCard>
          )}
          {tab === "organization" && (
            <GlassCard className="p-8 max-w-md space-y-4">
              <h3 className="text-sm font-extrabold text-foreground mb-6">Organization Settings</h3>
              <Input label="Organization Name" value="Acme Corp" />
              <Input label="Website" value="https://acmecorp.com" />
              <Input label="Support Email" value="support@acmecorp.com" />
              <Btn className="mt-2">Save Changes</Btn>
            </GlassCard>
          )}
          {["billing", "security", "notifications"].includes(tab) && (
            <GlassCard className="p-12 text-center max-w-md">
              <Settings size={28} className="mx-auto mb-3 text-foreground/20" />
              <p className="text-xs text-foreground/30 capitalize">{tab} settings coming soon.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
