import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// These environment variables are set after connecting to Supabase
// via the "Connect to Supabase" button in the StackBlitz interface
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);