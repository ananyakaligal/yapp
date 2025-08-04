import { createClient } from '@supabase/supabase-js'

// Make sure these are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// If you're not using generated types, this is sufficient:
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
