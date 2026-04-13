import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MongoDB URI not found. Please set MONGODB_URI in your .env.local file");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Order Schema
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [{
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    variant: { type: String },
    sku: { type: String, required: true },
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: { type: String },
  razorpayOrderId: { type: String },
  paymentMethod: { type: String, default: 'razorpay' },
  orderStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shiprocketOrderId: { type: String },
  shiprocketShipmentId: { type: String },
  awbCode: { type: String },
  courierName: { type: String },
  trackingUrl: { type: String },
  notes: { type: String },
}, {
  timestamps: true,
});

export const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

// Helper functions
export async function createOrder(orderData: Record<string, unknown>) {
  await connectDB();
  const order = new OrderModel(orderData);
  return await order.save();
}

export async function getOrderByNumber(orderNumber: string) {
  await connectDB();
  return await OrderModel.findOne({ orderNumber });
}

export async function getOrderById(id: string) {
  await connectDB();
  return await OrderModel.findById(id);
}

export async function updateOrder(id: string, updateData: Record<string, unknown>) {
  await connectDB();
  return await OrderModel.findByIdAndUpdate(id, updateData, { new: true });
}

export async function updateOrderByNumber(orderNumber: string, updateData: Record<string, unknown>) {
  await connectDB();
  return await OrderModel.findOneAndUpdate({ orderNumber }, updateData, { new: true });
}

export async function getOrdersByEmail(email: string) {
  await connectDB();
  return await OrderModel.find({ "shippingAddress.email": email }).sort({ createdAt: -1 });
}

export async function getAllOrders(limit = 50, skip = 0) {
  await connectDB();
  return await OrderModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
}
