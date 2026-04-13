import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { updateOrder } from "@/lib/db";
import { createShiprocketOrder } from "@/lib/shiprocket";

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

    // Create Shiprocket order (auto-ship)
    try {
      const shiprocketResponse = await createShiprocketOrder(updatedOrder);
      
      // Update order with Shiprocket details
      await updateOrder(orderId, {
        shiprocketOrderId: shiprocketResponse.order_id?.toString(),
        shiprocketShipmentId: shiprocketResponse.shipment_id?.toString(),
        awbCode: shiprocketResponse.awb_code,
        courierName: shiprocketResponse.courier_name,
        orderStatus: shiprocketResponse.awb_code ? "processing" : "confirmed",
      });
    } catch (shiprocketError) {
      // Log but don't fail the payment verification
      console.error("Shiprocket order creation failed:", shiprocketError);
      // Order is still confirmed, can be manually pushed to Shiprocket later
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
