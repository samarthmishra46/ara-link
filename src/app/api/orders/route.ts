import { NextRequest, NextResponse } from "next/server";
import { getOrderByNumber, getOrdersByEmail, getAllOrders } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");

    if (orderNumber) {
      // Get single order by order number
      const order = await getOrderByNumber(orderNumber);

      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        order: {
          orderNumber: order.orderNumber,
          status: order.orderStatus,
          paymentStatus: order.paymentStatus,
          total: order.total,
          items: order.items,
          shippingAddress: order.shippingAddress,
          awbCode: order.awbCode,
          courierName: order.courierName,
          createdAt: order.createdAt,
        },
      });
    }

    if (email) {
      // Get orders by email
      const orders = await getOrdersByEmail(email);

      return NextResponse.json({
        success: true,
        orders: orders.map((order) => ({
          orderNumber: order.orderNumber,
          status: order.orderStatus,
          paymentStatus: order.paymentStatus,
          total: order.total,
          itemCount: order.items.length,
          createdAt: order.createdAt,
        })),
      });
    }

    // Get all orders (admin only - should add auth here)
    const orders = await getAllOrders();

    return NextResponse.json({
      success: true,
      orders: orders.map((order) => ({
        orderNumber: order.orderNumber,
        customerName: order.shippingAddress?.fullName,
        status: order.orderStatus,
        paymentStatus: order.paymentStatus,
        total: order.total,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
