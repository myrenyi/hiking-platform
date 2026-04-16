-- ============================================================
-- hiking-platform Supabase Schema
-- Run this in Supabase SQL Editor to create all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- profiles 表（扩展 Supabase auth.users）
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  hiking_level SMALLINT CHECK (hiking_level BETWEEN 1 AND 5) DEFAULT 1,
  total_distance NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- routes 表
-- ============================================================
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5) NOT NULL,
  days SMALLINT NOT NULL,
  location TEXT NOT NULL,
  start_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  highlight TEXT,
  rating NUMERIC(2, 1) CHECK (rating BETWEEN 0 AND 5) DEFAULT 0,
  image TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  best_season TEXT,
  distance TEXT,
  elevation TEXT,
  description TEXT,
  suitable_for TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]'::jsonb,
  gear_list JSONB DEFAULT '{}'::jsonb,
  safety_tips TEXT[] DEFAULT '{}',
  reviews JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- activities 表
-- ============================================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  end_date TEXT DEFAULT '',
  location TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  participants SMALLINT DEFAULT 0,
  max_participants SMALLINT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image TEXT,
  organizer TEXT NOT NULL,
  phone TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  schedule JSONB DEFAULT '[]'::jsonb,
  requirements TEXT[] DEFAULT '{}',
  includes TEXT[] DEFAULT '{}',
  excludes TEXT[] DEFAULT '{}',
  notes TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- registrations 表
-- ============================================================
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  count SMALLINT DEFAULT 1,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  agree_terms BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- route_reviews 表
-- ============================================================
CREATE TABLE IF NOT EXISTS route_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) 策略
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_reviews ENABLE ROW LEVEL SECURITY;

-- profiles: 用户只能读写自己的 profile
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- routes: 所有人都可以查看已发布的路线
CREATE POLICY "Anyone can view published routes"
  ON routes FOR SELECT USING (is_published = true);
-- 只有认证用户可以增删改
CREATE POLICY "Authenticated users can insert routes"
  ON routes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update routes"
  ON routes FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete routes"
  ON routes FOR DELETE USING (auth.role() = 'authenticated');

-- activities: 所有人都可以查看已发布的活动
CREATE POLICY "Anyone can view published activities"
  ON activities FOR SELECT USING (is_published = true);
CREATE POLICY "Authenticated users can insert activities"
  ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update activities"
  ON activities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete activities"
  ON activities FOR DELETE USING (auth.role() = 'authenticated');

-- registrations: 用户只能查看自己的报名记录
CREATE POLICY "Users can view own registrations"
  ON registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert registrations (public sign-up)"
  ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own registrations"
  ON registrations FOR UPDATE USING (auth.uid() = user_id);

-- route_reviews: 所有人可以查看评论，认证用户可以发表评论
CREATE POLICY "Anyone can view route reviews"
  ON route_reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert route reviews"
  ON route_reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own reviews"
  ON route_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews"
  ON route_reviews FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 自动创建 profile 的 trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_routes_difficulty ON routes(difficulty);
CREATE INDEX IF NOT EXISTS idx_routes_location ON routes(location);
CREATE INDEX IF NOT EXISTS idx_routes_is_published ON routes(is_published);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
CREATE INDEX IF NOT EXISTS idx_activities_is_published ON activities(is_published);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_activity_id ON registrations(activity_id);
CREATE INDEX IF NOT EXISTS idx_route_reviews_route_id ON route_reviews(route_id);
