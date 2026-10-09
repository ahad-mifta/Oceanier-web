import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { resetPassword } from "../../lib/auth";
import { LIME } from "../../constants";
import Btn from "../../components/ui/Btn";
import Input from "../../components/ui/Input";
import GlassCard from "../../components/ui/GlassCard";
import darkLogo from "../../imports/Dark_BG-1.png";

function AuthError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-[14px] text-xs text-red-300"
      style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
      <AlertCircle size={13} className="shrink-0 text-red-400" />
      {msg}
    </div>
  );
}

export default function ForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
    setLoading(true); setError("");
    try {
      await resetPassword(email);
      setSent(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <img src={darkLogo} alt="Oceanier" className="h-8 w-auto mx-auto mb-8" />
          <h1 className="text-2xl font-extrabold text-foreground">Reset password</h1>
          <p className="text-foreground/40 mt-2 text-sm">We'll send a reset link to your email</p>
        </div>
        <GlassCard className="p-8">
          {sent ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle size={40} style={{ color: LIME }} className="mx-auto" />
              <p className="text-foreground/55 text-sm">Reset link sent to <strong className="text-foreground">{email}</strong>.</p>
              <p className="text-xs text-foreground/35">Check your inbox and follow the link to set a new password.</p>
              <button onClick={() => navigate("/login")} className="text-primary text-sm mt-2 hover:underline">← Back to login</button>
            </div>
          ) : (
            <div className="space-y-4">
              <AuthError msg={error} />
              <Input label="Email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} />
              <Btn className="w-full justify-center" onClick={handleReset} disabled={loading}>
                {loading ? <><RefreshCw size={13} className="animate-spin" /> Sending...</> : "Send Reset Link"}
              </Btn>
              <button onClick={() => navigate("/login")} className="w-full text-center text-xs text-foreground/35 hover:text-foreground">← Back to login</button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
