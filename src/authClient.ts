import { createClient } from "@supabase/supabase-js";
const url=import.meta.env.VITE_SUPABASE_URL?.trim();
const key=import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
/** Only publishable/anon keys belong in VITE_ variables. Never a service_role key. */
export const authConfigured=Boolean(url && key);
export const auth=authConfigured?createClient(url!,key!,{
 auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true},
}):null;
