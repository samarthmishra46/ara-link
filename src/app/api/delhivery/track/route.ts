import { NextRequest, NextResponse } from "next/server";
import { trackDelhiveryShipment } from "@/lib/delhivery";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const awb = searchParams.get("awb");

    if (!awb) {
      return NextResponse.json(
        { success: false, error: "AWB/waybill code is required" },
        { status: 400 }
      );
    }

    const trackingData = await trackDelhiveryShipment(awb);
    const shipment = trackingData.ShipmentData?.[0]?.Shipment;

    if (!shipment) {
      return NextResponse.json(
        { success: false, error: "No tracking data found for this waybill" },
        { status: 404 }
      );
    }

    const tracking = (shipment.Scans || []).map((s) => ({
      date: s.ScanDetail.StatusDateTime || s.ScanDetail.ScanDateTime,
      status: s.ScanDetail.Scan,
      activity: s.ScanDetail.Instructions,
      location: s.ScanDetail.ScannedLocation,
    }));

    return NextResponse.json({
      success: true,
      tracking,
      currentStatus: shipment.Status?.Status || "Unknown",
      shipmentDetails: {
        awb: shipment.AWB,
        origin: shipment.OriginName,
        destination: shipment.DestinationName,
        pickUpDate: shipment.PickUpDate,
        deliveryDate: shipment.DeliveryDate,
        receivedBy: shipment.ReceivedBy,
      },
    });
  } catch (error) {
    console.error("Delhivery tracking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track shipment" },
      { status: 500 }
    );
  }
}
