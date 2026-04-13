import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { createOrder } from "@/lib/db";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, items, shippingAddress } = body;

    // Validate required fields
    if (!amount || !items || !shippingAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => 
        sum + item.price * item.quantity,
      0
    );

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(amount, orderNumber);

    // Create order in database
    const order = await createOrder({
      orderNumber,
      items,
      shippingAddress,
      subtotal,
      shipping: 0,
      discount: 0,
      total: amount,
      paymentStatus: "pending",
      razorpayOrderId: razorpayOrder.id,
      orderStatus: "pending",
    });

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
      orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
