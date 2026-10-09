import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { signIn, signInWithGoogle, getProfile } from "../../lib/auth";
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

function GoogleBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <Btn variant="glass" className="w-full justify-center gap-2.5" onClick={onClick} disabled={loading}>
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {loading ? "Redirecting..." : "Continue with Google"}
    </Btn>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true); setError("");
    try {
      const { user } = await signIn(email, password);
      if (!user) throw new Error("Login failed.");
      const profile = await getProfile(user.id);
      navigate(profile?.role === "admin" ? "/admin" : "/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true); setError("");
    try { await signInWithGoogle(); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Google sign-in failed."); setGoogleLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <img src={darkLogo} alt="Oceanier" className="h-8 w-auto mx-auto mb-8" />
          <h1 className="text-2xl font-extrabold text-foreground">Welcome back</h1>
          <p className="text-foreground/40 mt-2 text-sm">Sign in to your Oceanier account</p>
        </div>
        <GlassCard className="p-8">
          <div className="space-y-4">
            <AuthError msg={error} />
            <Input label="Email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} />
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Password</label>
                <button onClick={() => navigate("/forgot-password")} className="text-[10px] text-primary hover:underline">Forgot?</button>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-primary/50 transition-all text-sm" />
            </div>
            <Btn className="w-full justify-center" onClick={handleLogin} disabled={loading}>
              {loading ? <><RefreshCw size={13} className="animate-spin" /> Signing in...</> : "Sign in"}
            </Btn>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/05" /><span className="text-[10px] text-foreground/25">or</span><div className="flex-1 h-px bg-white/05" />
            </div>
            <GoogleBtn onClick={handleGoogle} loading={googleLoading} />
            <p className="text-center text-xs text-foreground/35 mt-2">
              Don&apos;t have an account?{" "}
              <button onClick={() => navigate("/register")} className="text-primary hover:underline">Start free trial</button>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
