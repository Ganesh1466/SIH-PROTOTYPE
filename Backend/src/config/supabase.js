import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder-sih.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.SUPABASE_URL && 
    process.env.SUPABASE_ANON_KEY && 
    !process.env.SUPABASE_URL.includes('placeholder')
  );
};
