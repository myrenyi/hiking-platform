// ============================================================
// Data Service - 优先从 Supabase 获取，失败时回退到 mockData
// ============================================================

import type { Route, Activity } from './database.types'
import { routes as mockRoutes, activities as mockActivities } from './mockData'

// 懒加载 Supabase 客户端（避免在非服务端环境报错）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabaseServerClient: any = null
let _supabaseUrl: string | undefined
let _supabaseAnonKey: string | undefined

function getSupabaseConfig() {
  if (!_supabaseUrl) {
    _supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    _supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
  return { url: _supabaseUrl, anonKey: _supabaseAnonKey }
}

function hasSupabaseConfig() {
  const { url, anonKey } = getSupabaseConfig()
  return Boolean(url && anonKey && url !== 'your_supabase_project_url')
}

// 延迟创建 server client，避免 top-level await
async function getSupabaseServerClient() {
  if (!hasSupabaseConfig()) return null
  if (!_supabaseServerClient) {
    const { createServerClient } = await import('@supabase/ssr')
    const { url, anonKey } = getSupabaseConfig()
    _supabaseServerClient = createServerClient(url!, anonKey!, {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    })
  }
  return _supabaseServerClient
}

// ============================================================
// Routes
// ============================================================

/**
 * 获取所有路线列表
 */
export async function getRoutes(): Promise<Route[]> {
  try {
    const client = await getSupabaseServerClient()
    if (!client) throw new Error('No Supabase config')

    const { data, error } = await client
      .from('routes')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) throw new Error('No data')

    return data as Route[]
  } catch {
    // 回退到 mockData
    return mockRoutes as unknown as Route[]
  }
}

/**
 * 根据 ID 获取路线详情
 */
export async function getRouteById(id: string): Promise<Route | null> {
  try {
    const client = await getSupabaseServerClient()
    if (!client) throw new Error('No Supabase config')

    const { data, error } = await client
      .from('routes')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single()

    if (error) throw error
    return data as Route
  } catch {
    return (mockRoutes.find((r) => r.id === id) as unknown as Route) ?? null
  }
}

// ============================================================
// Activities
// ============================================================

/**
 * 获取所有活动列表
 */
export async function getActivities(): Promise<Activity[]> {
  try {
    const client = await getSupabaseServerClient()
    if (!client) throw new Error('No Supabase config')

    const { data, error } = await client
      .from('activities')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) throw new Error('No data')

    return data as Activity[]
  } catch {
    return mockActivities as unknown as Activity[]
  }
}

/**
 * 根据 ID 获取活动详情
 */
export async function getActivityById(id: string): Promise<Activity | null> {
  try {
    const client = await getSupabaseServerClient()
    if (!client) throw new Error('No Supabase config')

    const { data, error } = await client
      .from('activities')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single()

    if (error) throw error
    return data as Activity
  } catch {
    return (mockActivities.find((a) => a.id === id) as unknown as Activity) ?? null
  }
}

// ============================================================
// Re-export types for convenience
// ============================================================
export type { Route, Activity }
