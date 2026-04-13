import Razorpay from "razorpay";

// Server-side Razorpay instance
export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials not configured");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

// Create order
export async function createRazorpayOrder(amount: number, receipt: string) {
  const razorpay = getRazorpayInstance();
  
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt,
    notes: {
      company: "ARA Skincare",
    },
  });

  return order;
}

// Verify payment signature
import crypto from "crypto";

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Razorpay key secret not configured");
  }

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

// Fetch payment details
export async function getPaymentDetails(paymentId: string) {
  const razorpay = getRazorpayInstance();
  return await razorpay.payments.fetch(paymentId);
}

// Client-side configuration
export function getRazorpayConfig() {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    currency: "INR",
    name: "ARA Skincare",
    description: "Cold Therapy Products",
    image: "/logo.png",
    theme: {
      color: "#b8dfe8",
    },
  };
}
