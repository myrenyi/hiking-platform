import type { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient as supabaseCreateBrowserClient, createServerClient as supabaseCreateServerClient } from '@supabase/ssr'

/**
 * Supabase Client for Browser (Client Components)
 * 后缀 -cls 标记（命名空间区分，同一模块内可共存）
 */
export function createBrowserClientCls(): SupabaseClient {
  return supabaseCreateBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Supabase Client for Server Components / Route Handlers
 * 后缀 -cls 标记（命名空间区分，同一模块内可共存）
 */
export function createServerClientCls(config: {
  cookies: {
    getAll(): Array<{ name: string; value: string }>
    setAll(
      cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>
    ): void
  }
}): SupabaseClient {
  return supabaseCreateServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: config.cookies,
    }
  )
}

/**
 * Browser client singleton for use in Client Components
 * 必须仅在 'use client' 组件中使用
 */
let browserClient: SupabaseClient | null = null

export function getBrowserClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createBrowserClientCls()
  }
  return browserClient
}
