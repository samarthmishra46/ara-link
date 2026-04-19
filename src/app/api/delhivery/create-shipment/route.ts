import { NextRequest, NextResponse } from "next/server";
import { createDelhiveryShipment } from "@/lib/delhivery";
import { getOrderById, updateOrder } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.paymentStatus !== "paid") {
      return NextResponse.json(
        { success: false, error: "Order payment not completed" },
        { status: 400 }
      );
    }

    const delhiveryResponse = await createDelhiveryShipment(order);
    const pkg = delhiveryResponse.packages[0];

    await updateOrder(orderId, {
      delhiveryOrderRef: pkg.refnum,
      awbCode: pkg.waybill,
      courierName: "Delhivery",
      trackingUrl: `https://www.delhivery.com/track/package/${pkg.waybill}`,
      orderStatus: "processing",
    });

    return NextResponse.json({
      success: true,
      waybill: pkg.waybill,
      refnum: pkg.refnum,
      sortCode: pkg.sort_code,
    });
  } catch (error) {
    console.error("Delhivery create shipment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Delhivery shipment" },
      { status: 500 }
    );
  }
}
