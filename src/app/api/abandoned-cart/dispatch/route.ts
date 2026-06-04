import { NextRequest, NextResponse } from "next/server";
import { getPendingDrafts, markDraftWhatsappSent } from "@/lib/db";
import { sendAbandonedCartMessage } from "@/lib/wati";

const DEFAULT_DELAY_MINUTES = 15;

export async function POST(request: NextRequest) {
  // Auth — bearer token check protects this endpoint from public abuse.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { success: false, error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  if (!appUrl) {
    return NextResponse.json(
      { success: false, error: "NEXT_PUBLIC_APP_URL not configured" },
      { status: 500 }
    );
  }

  const delayMinutes = Number(process.env.ABANDONED_CART_DELAY_MINUTES) || DEFAULT_DELAY_MINUTES;

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  try {
    const drafts = await getPendingDrafts(delayMinutes);

    for (const draft of drafts) {
      const resumeUrl = `${appUrl}/checkout?resume=${draft.token}`;
      try {
        await sendAbandonedCartMessage(
          draft.shippingAddress.phone,
          draft.shippingAddress.fullName,
          draft.amount,
          resumeUrl,
        );
        await markDraftWhatsappSent(draft.token);
        sent++;
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : "unknown error";
        errors.push(`${draft.token}: ${msg}`);
        console.error(`WATI send failed for draft ${draft.token}:`, err);
      }
    }

    return NextResponse.json({ success: true, sent, failed, errors });
  } catch (error) {
    console.error("Abandoned cart dispatch error:", error);
    const message = error instanceof Error ? error.message : "Dispatch failed";
    return NextResponse.json({ success: false, error: message, sent, failed }, { status: 500 });
  }
}
