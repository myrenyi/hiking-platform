import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Admin Client — uses Service Role Key to bypass RLS
 * 用于后台管理操作
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
