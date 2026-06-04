import axios from "axios";

const WATI_BASE_URL = process.env.WATI_BASE_URL || "";

function getWatiClient() {
  const token = process.env.WATI_API_KEY;
  if (!token) {
    throw new Error("WATI API key not configured");
  }
  if (!WATI_BASE_URL) {
    throw new Error("WATI base URL not configured");
  }

  return axios.create({
    baseURL: WATI_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// WhatsApp requires the number in international format without "+".
// We assume India (+91) for 10-digit local numbers.
function normalizePhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

export async function sendAbandonedCartMessage(
  phone: string,
  fullName: string,
  amount: number,
  resumeUrl: string,
) {
  const templateName = process.env.WATI_TEMPLATE_NAME || "ara_abandoned_cart";
  const client = getWatiClient();
  const whatsappNumber = normalizePhoneE164(phone);

  // WATI sendTemplateMessage — see https://docs.wati.io
  return await client.post(
    `/api/v1/sendTemplateMessage?whatsappNumber=${whatsappNumber}`,
    {
      template_name: templateName,
      broadcast_name: `abandoned_cart_${Date.now()}`,
      parameters: [
        { name: "1", value: fullName },
        { name: "2", value: String(amount) },
        { name: "3", value: resumeUrl },
      ],
    },
  );
}
