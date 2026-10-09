import { supabase } from "./supabase";
import type { Profile, Business } from "./database.types";

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw error;
  return data;
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}`,
    },
  });
  if (error) throw error;
  return data;
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}?reset=true`,
  });
  if (error) throw error;
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ─── Profile helpers ──────────────────────────────────────────────────────────

export async function getProfile(authUserId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();
  if (error) return null;
  return data;
}

export async function createProfile(authUserId: string, email: string, fullName: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ auth_user_id: authUserId, email, full_name: fullName })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Business helpers ─────────────────────────────────────────────────────────

export async function getBusinesses(profileId: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("profile_id", profileId)
    .neq("status", "deleted")
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

export async function createBusiness(
  profileId: string,
  name: string,
  industry?: string,
  website?: string
): Promise<Business> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const { data, error } = await supabase
    .from("businesses")
    .insert({ profile_id: profileId, business_name: name, slug: `${slug}-${Date.now()}`, industry: industry ?? null, website: website ?? null })
    .select()
    .single();
  if (error) throw error;
  // create default settings
  await supabase.from("business_settings").insert({ business_id: data.id, language: "en" });
  return data;
}

// ─── Post-signup provisioning ─────────────────────────────────────────────────

export async function provisionNewUser(authUserId: string, email: string, fullName: string) {
  const profile = await createProfile(authUserId, email, fullName);

  // Create trial subscription (7 days)
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);
  await supabase.from("subscriptions").insert({
    profile_id: profile.id,
    plan: "trial",
    billing_cycle: "monthly",
    status: "trial",
    expires_at: trialEnd.toISOString(),
  });

  // Create fuel wallet with 1000 trial credits
  await supabase.from("fuel_wallet").insert({
    profile_id: profile.id,
    balance: 0,
    trial_balance: 1000,
  });

  return profile;
}
