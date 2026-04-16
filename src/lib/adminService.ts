// ============================================================
// Admin Service — bypasses RLS via Service Role client
// ============================================================

import { supabaseAdmin } from './supabase-admin'
import type {
  Route,
  Activity,
  Registration,
  RegistrationStatus,
  ItineraryDay,
  GearList,
  HikingLevel,
} from './database.types'

// ============================================================
// Routes Admin
// ============================================================

export async function getRoutesAdmin(): Promise<Route[]> {
  const { data, error } = await supabaseAdmin
    .from('routes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as Route[]) ?? []
}

export async function upsertRoute(data: Partial<Route> & { id?: string }): Promise<Route> {
  const { id, ...fields } = data
  if (id) {
    const { data: updated, error } = await supabaseAdmin
      .from('routes')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return updated as Route
  } else {
    const { data: inserted, error } = await supabaseAdmin
      .from('routes')
      .insert(fields)
      .select()
      .single()
    if (error) throw error
    return inserted as Route
  }
}

export async function toggleRoutePublished(id: string, isPublished: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from('routes')
    .update({ is_published: isPublished })
    .eq('id', id)
  if (error) throw error
}

export async function deleteRoute(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('routes').delete().eq('id', id)
  if (error) throw error
}

// ============================================================
// Activities Admin
// ============================================================

export async function getActivitiesAdmin(): Promise<Activity[]> {
  const { data, error } = await supabaseAdmin
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as Activity[]) ?? []
}

export async function upsertActivity(data: Partial<Activity> & { id?: string }): Promise<Activity> {
  const { id, ...fields } = data
  if (id) {
    const { data: updated, error } = await supabaseAdmin
      .from('activities')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return updated as Activity
  } else {
    const { data: inserted, error } = await supabaseAdmin
      .from('activities')
      .insert(fields)
      .select()
      .single()
    if (error) throw error
    return inserted as Activity
  }
}

export async function deleteActivity(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('activities').delete().eq('id', id)
  if (error) throw error
}

// ============================================================
// Registrations Admin
// ============================================================

export async function getRegistrationsAdmin(filter?: {
  status?: RegistrationStatus
  activityTitle?: string
}): Promise<(Registration & { activity_title?: string })[]> {
  let query = supabaseAdmin
    .from('registrations')
    .select('*, activity:activities(title)')
    .order('created_at', { ascending: false })

  if (filter?.status) {
    query = query.eq('status', filter.status)
  }

  const { data, error } = await query
  if (error) throw error

  return (data as (Registration & { activity?: { title: string } })[])?.map((r) => ({
    ...r,
    activity_title: r.activity?.title,
  })) ?? []
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('registrations')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

// ============================================================
// Statistics
// ============================================================

export interface AdminStats {
  routeCount: number
  activityCount: number
  registrationCount: number
  totalRevenue: number
}

export async function getAdminStats(): Promise<AdminStats> {
  const [routes, activities, registrations] = await Promise.all([
    supabaseAdmin.from('routes').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('activities').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('registrations').select('*'),
  ])

  const registrationCount = registrations.data?.length ?? 0
  const totalRevenue = (registrations.data as Registration[] ?? []).reduce(
    (sum, r) => {
      const activity = (activities.data as Activity[] | null)?.find(
        (a) => a.id === r.activity_id
      )
      return sum + (activity?.price ?? 0) * r.count
    },
    0
  )

  return {
    routeCount: routes.count ?? 0,
    activityCount: activities.count ?? 0,
    registrationCount,
    totalRevenue,
  }
}

// ============================================================
// Types for form data
// ============================================================

export interface RouteFormData {
  id?: string
  name: string
  difficulty: HikingLevel
  days: number
  location: string
  start_location: string
  destination: string
  highlight: string
  rating: number
  image: string
  price: number
  best_season: string
  distance: string
  elevation: string
  description: string
  suitable_for: string[]
  itinerary: ItineraryDay[]
  gear_list: GearList
  safety_tips: string[]
  is_published: boolean
}

export interface ActivityFormData {
  id?: string
  title: string
  date: string
  end_date: string
  location: string
  difficulty: string
  max_participants: number
  price: number
  image: string
  organizer: string
  phone: string
  tags: string[]
  schedule: { time: string; activity: string }[]
  requirements: string[]
  includes: string[]
  excludes: string[]
  notes: string[]
  is_published: boolean
}
