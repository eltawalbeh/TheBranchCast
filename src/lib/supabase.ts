import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = 'https://ushplpeghxebhdjcktbp.supabase.co';
const supabasePublishableKey = 'sb_publishable_7x0XvSFLoPcAr0rzAMAkmw_67ggaSdf';

export const isSupabaseConfigured = true;

export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
