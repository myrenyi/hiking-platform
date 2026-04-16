import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    if (type === "stats") {
      const [routes, activities, registrations] = await Promise.all([
        supabaseAdmin.from("routes").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("activities").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("registrations").select("count", { count: "exact", head: true }),
      ]);

      const revenueResult = await supabaseAdmin
        .from("registrations")
        .select("count, activities(price)")
        .eq("status", "confirmed");

      let totalRevenue = 0;
      if (revenueResult.data) {
        for (const reg of revenueResult.data as any[]) {
          totalRevenue += (reg.activities as any)?.price || 0;
        }
      }

      return NextResponse.json({
        routeCount: routes.count ?? 0,
        activityCount: activities.count ?? 0,
        registrationCount: registrations.count ?? 0,
        totalRevenue,
      });
    }

    if (type === "routes") {
      const { data, error } = await supabaseAdmin
        .from("routes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json(data);
    }

    if (type === "activities") {
      const { data, error } = await supabaseAdmin
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json(data);
    }

    if (type === "registrations") {
      const { data, error } = await supabaseAdmin
        .from("registrations")
        .select("*, activities(title, price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
