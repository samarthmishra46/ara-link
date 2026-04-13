import axios from "axios";
import type { 
  ShiprocketOrderPayload, 
  ShiprocketOrderResponse, 
  ShiprocketTrackingResponse,
  Order
} from "@/types";

const SHIPROCKET_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

// Get authentication token
async function getAuthToken(): Promise<string> {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error("Shiprocket credentials not configured");
  }

  try {
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data.token;
  } catch (error) {
    console.error("Shiprocket auth error:", error);
    throw new Error("Failed to authenticate with Shiprocket");
  }
}

// Create authenticated axios instance
async function getShiprocketClient() {
  const token = await getAuthToken();
  
  return axios.create({
    baseURL: SHIPROCKET_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Create order on Shiprocket
export async function createShiprocketOrder(
  order: Order
): Promise<ShiprocketOrderResponse> {
  const client = await getShiprocketClient();

  const orderItems = order.items.map((item) => ({
    name: item.productName,
    sku: item.sku,
    units: item.quantity,
    selling_price: item.price,
  }));

  const payload: ShiprocketOrderPayload = {
    order_id: order.orderNumber,
    order_date: new Date(order.createdAt).toISOString().split("T")[0],
    pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
    billing_customer_name: order.shippingAddress.fullName.split(" ")[0],
    billing_last_name: order.shippingAddress.fullName.split(" ").slice(1).join(" ") || "",
    billing_address: order.shippingAddress.address,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.pincode,
    billing_state: order.shippingAddress.state,
    billing_country: "India",
    billing_email: order.shippingAddress.email,
    billing_phone: order.shippingAddress.phone,
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: "Prepaid",
    sub_total: order.subtotal,
    length: 20, // in cm
    breadth: 15,
    height: 10,
    weight: 0.5, // in kg
  };

  try {
    const response = await client.post("/orders/create/adhoc", payload);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket create order error:", axiosError.response?.data || error);
    throw new Error("Failed to create Shiprocket order");
  }
}

// Track shipment
export async function trackShipment(
  awbCode: string
): Promise<ShiprocketTrackingResponse> {
  const client = await getShiprocketClient();

  try {
    const response = await client.get(`/courier/track/awb/${awbCode}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket tracking error:", axiosError.response?.data || error);
    throw new Error("Failed to track shipment");
  }
}

// Get available couriers for pincode
export async function getAvailableCouriers(
  pickupPincode: string,
  deliveryPincode: string,
  weight: number,
  cod: boolean = false
) {
  const client = await getShiprocketClient();

  try {
    const response = await client.get("/courier/serviceability/", {
      params: {
        pickup_postcode: pickupPincode,
        delivery_postcode: deliveryPincode,
        weight,
        cod: cod ? 1 : 0,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket courier check error:", axiosError.response?.data || error);
    throw new Error("Failed to check courier availability");
  }
}

// Cancel order
export async function cancelShiprocketOrder(orderId: string) {
  const client = await getShiprocketClient();

  try {
    const response = await client.post("/orders/cancel", {
      ids: [orderId],
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket cancel error:", axiosError.response?.data || error);
    throw new Error("Failed to cancel order");
  }
}

// Generate AWB (Airway Bill) for shipment
export async function generateAWB(shipmentId: number, courierId: number) {
  const client = await getShiprocketClient();

  try {
    const response = await client.post("/courier/assign/awb", {
      shipment_id: shipmentId,
      courier_id: courierId,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket AWB error:", axiosError.response?.data || error);
    throw new Error("Failed to generate AWB");
  }
}

// Request pickup
export async function requestPickup(shipmentId: number) {
  const client = await getShiprocketClient();

  try {
    const response = await client.post("/courier/generate/pickup", {
      shipment_id: [shipmentId],
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket pickup error:", axiosError.response?.data || error);
    throw new Error("Failed to request pickup");
  }
}

// Get shipping label
export async function getShippingLabel(shipmentId: number) {
  const client = await getShiprocketClient();

  try {
    const response = await client.post("/courier/generate/label", {
      shipment_id: [shipmentId],
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket label error:", axiosError.response?.data || error);
    throw new Error("Failed to generate shipping label");
  }
}

// Get invoice
export async function getInvoice(orderIds: string[]) {
  const client = await getShiprocketClient();

  try {
    const response = await client.post("/orders/print/invoice", {
      ids: orderIds,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    console.error("Shiprocket invoice error:", axiosError.response?.data || error);
    throw new Error("Failed to generate invoice");
  }
}
