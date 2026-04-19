// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  stock: number;
  sku: string;
  features: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  badges: string[];
  isFeatured: boolean;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorCode: string;
  additionalPrice: number;
  stock: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  variant?: string;
  sku: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  paymentMethod: string;
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delhiveryOrderRef?: string;
  awbCode?: string;
  courierName?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Delhivery Types
export interface DelhiveryShipmentPayload {
  name: string;
  add: string;
  pin: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  order: string;
  payment_mode: 'Prepaid' | 'COD';
  return_pin: string;
  return_city: string;
  return_phone: string;
  return_add: string;
  return_name: string;
  return_email: string;
  return_state: string;
  return_country: string;
  products_desc: string;
  hsn_code: string;
  cod_amount: string;
  order_date: string | null;
  total_amount: string;
  seller_add: string;
  seller_name: string;
  seller_inv: string;
  quantity: number;
  waybill: string;
  shipment_width: number;
  shipment_height: number;
  weight: number;
  shipment_length: number;
  seller_gst_tin: string;
  shipping_mode: 'Surface' | 'Express';
  address_type: 'home' | 'office';
}

export interface DelhiveryPackage {
  status: string;
  package_count: number;
  remarks: string[];
  refnum: string;
  sort_code: string;
  cash_pickups: number;
  prepaid: boolean;
  cod: boolean;
  waybill: string;
  client_name: string;
  documents: unknown[];
}

export interface DelhiveryCreateResponse {
  cash_pickups_count: number;
  prepaid_pickups_count: number;
  cod_count: number;
  prepaid_count: number;
  package_count: number;
  upload_wbn: string;
  packages: DelhiveryPackage[];
}

export interface DelhiveryScanDetail {
  ScanDateTime: string;
  Scan: string;
  ScanType: string;
  ScannedLocation: string;
  Instructions: string;
  StatusDateTime: string;
}

export interface DelhiveryShipment {
  AWB: string;
  Destination: string;
  DestinationName: string;
  Origin: string;
  OriginName: string;
  PickUpDate: string;
  DeliveryDate: string;
  ReceivedBy: string;
  Status: {
    Status: string;
    Instructions: string;
    StatusDateTime: string;
    StatusLocation: string;
    StatusType: string;
  };
  Scans: Array<{ ScanDetail: DelhiveryScanDetail }>;
}

export interface DelhiveryTrackingResponse {
  ShipmentData: Array<{ Shipment: DelhiveryShipment }>;
}

// Razorpay Types
export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// Add-on Types
export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  icon: string;
  amazonLink?: string;
}
