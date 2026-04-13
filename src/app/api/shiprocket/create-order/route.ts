import { NextRequest, NextResponse } from "next/server";
import { createShiprocketOrder } from "@/lib/shiprocket";
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

    // Get order from database
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

    // Create Shiprocket order
    const shiprocketResponse = await createShiprocketOrder(order);

    // Update order with Shiprocket details
    await updateOrder(orderId, {
      shiprocketOrderId: shiprocketResponse.order_id?.toString(),
      shiprocketShipmentId: shiprocketResponse.shipment_id?.toString(),
      awbCode: shiprocketResponse.awb_code,
      courierName: shiprocketResponse.courier_name,
      orderStatus: "processing",
    });

    return NextResponse.json({
      success: true,
      shiprocketOrderId: shiprocketResponse.order_id,
      shipmentId: shiprocketResponse.shipment_id,
      awbCode: shiprocketResponse.awb_code,
      courierName: shiprocketResponse.courier_name,
    });
  } catch (error) {
    console.error("Shiprocket order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Shiprocket order" },
      { status: 500 }
    );
  }
}
