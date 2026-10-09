import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { getProfile, provisionNewUser, signOut } from "../lib/auth";
import type { Profile } from "../lib/database.types";
import OceanierSplash from "../components/OceanierSplash";

interface AuthCtx {
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({
  session: null,
  profile: null,
  isAdmin: false,
  handleLogout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const authDoneRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (authDoneRef.current) setAuthLoading(false);
      else {
        const poll = setInterval(() => {
          if (authDoneRef.current) { setAuthLoading(false); clearInterval(poll); }
        }, 100);
      }
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        let p = await getProfile(s.user.id);
        if (!p) {
          try { p = await provisionNewUser(s.user.id, s.user.email!, s.user.user_metadata?.full_name ?? s.user.email!); } catch (_) {}
          p = await getProfile(s.user.id);
        }
        setProfile(p);
      }
      authDoneRef.current = true;
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      if (event === "SIGNED_IN" && s?.user) {
        let p = await getProfile(s.user.id);
        if (!p) {
          try { p = await provisionNewUser(s.user.id, s.user.email!, s.user.user_metadata?.full_name ?? s.user.email!); } catch (_) {}
          p = await getProfile(s.user.id);
        }
        setProfile(p);
      }
      if (event === "SIGNED_OUT") setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setSession(null);
    setProfile(null);
  };

  if (authLoading) return <OceanierSplash />;

  return (
    <AuthContext.Provider value={{ session, profile, isAdmin: profile?.role === "admin", handleLogout }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
