import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET /api/admin/activities — list all activities
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/admin/activities — upsert activity
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (id) {
      const { data, error } = await supabaseAdmin
        .from("activities")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      const newId = fields.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
      const { data, error } = await supabaseAdmin
        .from("activities")
        .insert({ ...fields, id: newId })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/admin/activities — delete activity
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabaseAdmin.from("activities").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
