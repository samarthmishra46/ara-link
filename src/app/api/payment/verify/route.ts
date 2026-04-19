import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { updateOrder } from "@/lib/db";
import { createDelhiveryShipment } from "@/lib/delhivery";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Update order with payment details
    const updatedOrder = await updateOrder(orderId, {
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
      orderStatus: "confirmed",
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Create Delhivery shipment (auto-ship)
    try {
      const delhiveryResponse = await createDelhiveryShipment(updatedOrder);
      const pkg = delhiveryResponse.packages[0];

      await updateOrder(orderId, {
        delhiveryOrderRef: pkg.refnum,
        awbCode: pkg.waybill,
        courierName: "Delhivery",
        trackingUrl: `https://www.delhivery.com/track/package/${pkg.waybill}`,
        orderStatus: pkg.waybill ? "processing" : "confirmed",
      });
    } catch (delhiveryError) {
      // Log but don't fail the payment verification
      console.error("Delhivery shipment creation failed:", delhiveryError);
      // Order is still confirmed, can be manually pushed to Delhivery later
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderId,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
