import { NextRequest, NextResponse } from "next/server";
import { trackShipment } from "@/lib/shiprocket";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const awb = searchParams.get("awb");

    if (!awb) {
      return NextResponse.json(
        { success: false, error: "AWB code is required" },
        { status: 400 }
      );
    }

    const trackingData = await trackShipment(awb);

    // Format tracking activities
    const tracking = trackingData.tracking_data?.shipment_track_activities?.map(
      (activity) => ({
        date: activity.date,
        status: activity.status,
        activity: activity.activity,
        location: activity.location,
      })
    ) || [];

    const currentStatus = trackingData.tracking_data?.shipment_status_object?.status || "Unknown";

    return NextResponse.json({
      success: true,
      tracking,
      currentStatus,
      shipmentDetails: trackingData.tracking_data?.shipment_track?.[0] || null,
    });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track shipment" },
      { status: 500 }
    );
  }
}
