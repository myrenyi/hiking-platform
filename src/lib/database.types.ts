// Database TypeScript Types for hiking-platform
// 与 Supabase schema.sql 一一对应

export type HikingLevel = 1 | 2 | 3 | 4 | 5

export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'

// ============================================================
// profiles 表（扩展 Supabase auth.users）
// ============================================================
export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  hiking_level: HikingLevel
  total_distance: number // 公里
  created_at: string
}

// ============================================================
// routes 表
// ============================================================
export interface ItineraryDay {
  day: number
  title: string
  content: string
  meals: string
  accommodation: string
}

export interface GearList {
  must: string[]
  optional: string[]
}

export interface RouteReview {
  user: string
  rating: number
  content: string
  date: string
}

export interface Route {
  id: string
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
  reviews: RouteReview[]
  is_published: boolean
  created_at: string
}

// ============================================================
// activities 表
// ============================================================
export interface ScheduleItem {
  time: string
  activity: string
}

export interface Activity {
  id: string
  title: string
  date: string
  end_date: string
  location: string
  difficulty: string
  participants: number
  max_participants: number
  price: number
  image: string
  organizer: string
  phone: string
  tags: string[]
  schedule: ScheduleItem[]
  requirements: string[]
  includes: string[]
  excludes: string[]
  notes: string[]
  is_published: boolean
  created_at: string
}

// ============================================================
// registrations 表
// ============================================================
export interface Registration {
  id: string
  user_id: string | null
  activity_id: string
  name: string
  phone: string
  count: number
  status: RegistrationStatus
  agree_terms: boolean
  created_at: string
}

// ============================================================
// route_reviews 表
// ============================================================
export interface RouteReviewRecord {
  id: string
  route_id: string
  user_id: string | null
  rating: HikingLevel
  content: string
  created_at: string
}
