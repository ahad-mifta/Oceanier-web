import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, RefreshCw, AlertCircle, Mail } from "lucide-react";
import { signUp, signInWithGoogle, provisionNewUser, createBusiness } from "../../lib/auth";
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [org, setOrg] = useState({ name: "", industry: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1 = () => {
    setError("");
    if (!form.name.trim()) { setError("Full name is required."); return; }
    if (!form.email.includes("@")) { setError("Enter a valid email address."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setStep(2);
  };

  const handleCreate = async () => {
    if (!org.name.trim()) { setError("Business name is required."); return; }
    setLoading(true); setError("");
    try {
      const { user } = await signUp(form.email, form.password, form.name);
      if (!user) throw new Error("Signup failed.");
      if (user.confirmed_at || user.email_confirmed_at) {
        const profile = await provisionNewUser(user.id, form.email, form.name);
        await createBusiness(profile.id, org.name, org.industry || undefined, org.website || undefined);
        navigate("/dashboard");
      } else {
        setStep(3);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true); setError("");
    try { await signInWithGoogle(); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Google sign-in failed."); setGoogleLoading(false); }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <img src={darkLogo} alt="Oceanier" className="h-8 w-auto mx-auto mb-8" />
            <h1 className="text-2xl font-extrabold text-foreground">Check your email</h1>
            <p className="text-foreground/40 mt-2 text-sm">We sent a verification link to your inbox</p>
          </div>
          <GlassCard className="p-8">
            <div className="text-center py-4 space-y-4">
              <Mail size={40} style={{ color: LIME }} className="mx-auto" />
              <p className="text-xs text-foreground/50 leading-relaxed">
                Click the link in the email we sent to <strong className="text-foreground">{form.email}</strong> to verify your account and complete signup.
              </p>
              <button onClick={() => navigate("/login")} className="text-primary text-sm hover:underline">← Back to login</button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <img src={darkLogo} alt="Oceanier" className="h-8 w-auto mx-auto mb-8" />
          <h1 className="text-2xl font-extrabold text-foreground">
            {step === 1 ? "Create your account" : "Set up your business"}
          </h1>
        </div>
        <GlassCard className="p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <AuthError msg={error} />
              <Input label="Full Name" placeholder="Jane Smith" value={form.name} onChange={v => setForm({ ...form, name: v })} />
              <Input label="Work Email" type="email" placeholder="you@company.com" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={v => setForm({ ...form, password: v })} />
              <Input label="Confirm Password" type="password" placeholder="Repeat password" value={form.confirm} onChange={v => setForm({ ...form, confirm: v })} />
              <div className="flex items-start gap-2 text-[10px] text-foreground/35 pt-1">
                <input type="checkbox" className="mt-0.5" defaultChecked />
                <span>I agree to the <button className="text-primary hover:underline">Terms</button> and <button className="text-primary hover:underline">Privacy Policy</button></span>
              </div>
              <Btn className="w-full justify-center" onClick={handleStep1}>Continue <ArrowRight size={15} /></Btn>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/05" /><span className="text-[10px] text-foreground/25">or</span><div className="flex-1 h-px bg-white/05" />
              </div>
              <GoogleBtn onClick={handleGoogle} loading={googleLoading} />
              <p className="text-center text-xs text-foreground/35">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="text-primary hover:underline">Sign in</button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] text-foreground/35 mb-2">
                <button onClick={() => { setStep(1); setError(""); }} className="hover:text-foreground">← Back</button>
                <span>Step 2 of 2 — Your Business</span>
              </div>
              <AuthError msg={error} />
              <Input label="Business Name" placeholder="Acme Corp" value={org.name} onChange={v => setOrg({ ...org, name: v })} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Industry</label>
                <select value={org.industry} onChange={e => setOrg({ ...org, industry: e.target.value })}
                  className="w-full px-4 py-3 rounded-[18px] bg-white/5 border border-white/10 text-foreground text-sm outline-none focus:border-primary/50"
                  style={{ background: "#0B2742" }}>
                  <option value="">Select industry</option>
                  {["E-commerce", "Healthcare", "Real Estate", "Education", "Restaurant", "Marketing Agency", "Finance", "SaaS", "Other"].map(i => (
                    <option key={i} value={i} style={{ background: "#0B2742" }}>{i}</option>
                  ))}
                </select>
              </div>
              <Input label="Website (Optional)" placeholder="https://yoursite.com" value={org.website} onChange={v => setOrg({ ...org, website: v })} />
              <Btn className="w-full justify-center" onClick={handleCreate} disabled={loading}>
                {loading ? <><RefreshCw size={13} className="animate-spin" /> Creating workspace...</> : "Create Business & Start Trial"}
              </Btn>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
