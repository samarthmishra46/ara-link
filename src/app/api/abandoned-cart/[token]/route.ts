import { NextRequest, NextResponse } from "next/server";
import { getDraftByToken } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await ctx.params;
    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    }

    const draft = await getDraftByToken(token);
    if (!draft) {
      return NextResponse.json({ success: false, error: "Draft not found or expired" }, { status: 404 });
    }

    // TTL index removes expired docs but there can be a small lag — double-check.
    if (draft.expiresAt && new Date(draft.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ success: false, error: "Draft expired" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      draft: {
        items: draft.items,
        shippingAddress: draft.shippingAddress,
        amount: draft.amount,
        paymentMethod: draft.paymentMethod,
        freeGift: draft.freeGift,
      },
    });
  } catch (error) {
    console.error("Abandoned cart fetch error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch draft";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
