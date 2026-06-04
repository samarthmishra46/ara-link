import { NextRequest, NextResponse } from "next/server";
import { markDraftRecovered } from "@/lib/db";

export async function POST(
  _request: NextRequest,
  ctx: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await ctx.params;
    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    }

    const draft = await markDraftRecovered(token);
    if (!draft) {
      return NextResponse.json({ success: false, error: "Draft not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Abandoned cart recover error:", error);
    const message = error instanceof Error ? error.message : "Failed to mark recovered";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
