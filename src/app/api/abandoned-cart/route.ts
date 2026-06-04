import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createDraftCheckout } from "@/lib/db";

const TOKEN_TTL_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, amount, paymentMethod, freeGift } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing or empty items" },
        { status: 400 }
      );
    }
    if (!shippingAddress?.phone || !shippingAddress?.email || !shippingAddress?.fullName) {
      return NextResponse.json(
        { success: false, error: "Shipping address requires fullName, phone, email" },
        { status: 400 }
      );
    }
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid amount" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000);

    await createDraftCheckout({
      token,
      items,
      shippingAddress: { ...shippingAddress, country: shippingAddress.country || "India" },
      amount,
      paymentMethod: paymentMethod === "cod" ? "cod" : "razorpay",
      freeGift: freeGift || null,
      expiresAt,
    });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Abandoned cart save error:", error);
    const message = error instanceof Error ? error.message : "Failed to save draft";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
