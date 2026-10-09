import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const SUPABASE_URL = "https://dxuefktfpldhhnttmlga.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lYCqPuEwvs_WSjkTxRnXfw_I0cO1wMp";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
