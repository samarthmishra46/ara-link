import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "This endpoint has been removed. Use /api/delhivery/track instead.",
    },
    { status: 410 }
  );
}
