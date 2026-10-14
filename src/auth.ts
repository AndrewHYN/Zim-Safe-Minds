import { createClient } from "@supabase/supabase-js";
const url=import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey=import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
export const authEnabled=Boolean(url&&anonKey&&url.startsWith("https://"));
export const authClient=authEnabled?createClient(url!,anonKey!,{
 auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},
}):null;
// Only PUBLIC anon/publishable keys belong in a frontend app; never a service_role key.
