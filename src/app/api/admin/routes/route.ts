import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// POST /api/admin/routes — upsert route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (id) {
      const { data, error } = await supabaseAdmin
        .from("routes")
        .update({ ...fields, created_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      const newId = fields.name?.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      const { data, error } = await supabaseAdmin
        .from("routes")
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

// DELETE /api/admin/routes — delete route
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabaseAdmin.from("routes").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/admin/routes — toggle published
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isPublished } = body;
    const { error } = await supabaseAdmin
      .from("routes")
      .update({ is_published: isPublished })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
