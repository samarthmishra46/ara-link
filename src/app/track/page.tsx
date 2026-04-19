"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package, Truck, CheckCircle, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

interface TrackingActivity {
  date: string;
  status: string;
  activity: string;
  location: string;
}

interface OrderDetails {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
  };
  awbCode?: string;
  courierName?: string;
  tracking?: TrackingActivity[];
  createdAt: string;
}

function OrderTracker() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  
  const [orderNumber, setOrderNumber] = useState(orderParam || "");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState("");

  const handleTrack = useCallback(async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/orders?orderNumber=${orderNumber}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
        
        // If shipped, fetch tracking
        if (data.order.awbCode) {
          const trackRes = await fetch(`/api/delhivery/track?awb=${data.order.awbCode}`);
          const trackData = await trackRes.json();
          if (trackData.success) {
            setOrder((prev) => prev ? { ...prev, tracking: trackData.tracking } : null);
          }
        }
      } else {
        setError("Order not found. Please check your order number.");
      }
    } catch {
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  }, [orderNumber]);

  useEffect(() => {
    if (orderParam) {
      handleTrack();
    }
  }, [orderParam, handleTrack]);

  const getStatusStep = (status: string) => {
    const steps = ["confirmed", "processing", "shipped", "delivered"];
    return steps.indexOf(status.toLowerCase()) + 1;
  };

  return (
    <div className="bg-[#05080a] min-h-screen">
      <div className="section">
        <div className="eyebrow mb-5">Order Tracking</div>
        <h1 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#edeae4] mb-4">
          Track your<br />
          <em className="italic text-[#b8dfe8]">order</em>
        </h1>

        {/* Search Form */}
        <div className="mb-10">
          <div className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter order number (e.g., ARA-XXXXX)"
              className="input flex-1"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="btn-primary px-6"
            >
              {loading ? "..." : "Track"}
            </button>
          </div>
          {error && <p className="text-xs text-[#e05a5a] mt-2">{error}</p>}
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6 animate-fadeIn">
            {/* Order Success Message */}
            {order.paymentStatus === "paid" && order.status === "confirmed" && (
              <div className="bg-[rgba(106,175,191,0.1)] border border-[rgba(106,175,191,0.2)] p-5 text-center">
                <div className="text-4xl mb-3">🧊</div>
                <h3 className="font-serif text-xl text-[#edeae4] mb-2">Order Confirmed!</h3>
                <p className="text-sm text-[#5a6670]">
                  Your ARA products are being prepared. You&apos;ll receive tracking updates soon.
                </p>
              </div>
            )}

            {/* Order Info */}
            <div className="card p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6aafbf] mb-1">
                    Order Number
                  </p>
                  <p className="font-serif text-lg text-[#edeae4]">{order.orderNumber}</p>
                </div>
                <span className={`badge ${
                  order.status === "delivered" ? "badge-ice" :
                  order.status === "shipped" ? "badge-gold" :
                  "badge-red"
                }`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="text-xs text-[#5a6670] mb-4">
                Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              {/* Progress Steps */}
              <div className="relative mb-6">
                <div className="flex justify-between mb-2">
                  {["Confirmed", "Processing", "Shipped", "Delivered"].map((step, i) => {
                    const currentStep = getStatusStep(order.status);
                    const isActive = i + 1 <= currentStep;
                    const isCurrent = i + 1 === currentStep;
                    
                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          isActive ? "bg-[#b8dfe8] text-[#05080a]" : "bg-[#10181e] text-[#5a6670]"
                        } ${isCurrent ? "ring-2 ring-[#b8dfe8] ring-offset-2 ring-offset-[#0b1014]" : ""}`}>
                          {i === 0 && <CheckCircle size={14} />}
                          {i === 1 && <Package size={14} />}
                          {i === 2 && <Truck size={14} />}
                          {i === 3 && <MapPin size={14} />}
                        </div>
                        <span className={`text-[8px] font-mono tracking-wider uppercase ${
                          isActive ? "text-[#edeae4]" : "text-[#5a6670]"
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress Line */}
                <div className="absolute top-4 left-8 right-8 h-px bg-[rgba(184,223,232,0.14)]">
                  <div 
                    className="h-full bg-[#b8dfe8] transition-all"
                    style={{ width: `${((getStatusStep(order.status) - 1) / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Courier Info */}
              {order.awbCode && (
                <div className="bg-[#10181e] p-4 border border-[rgba(184,223,232,0.07)]">
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                    Shipment Details
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-[#edeae4]">{order.courierName || "Delhivery"}</p>
                      <p className="text-xs text-[#5a6670]">AWB: {order.awbCode}</p>
                    </div>
                    <a
                      href={`https://www.delhivery.com/track/package/${order.awbCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#6aafbf] flex items-center gap-1 hover:underline"
                    >
                      Track on Delhivery
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Tracking Activities */}
            {order.tracking && order.tracking.length > 0 && (
              <div className="card p-5">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
                  Tracking History
                </p>
                <div className="space-y-4">
                  {order.tracking.map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${
                          i === 0 ? "bg-[#b8dfe8]" : "bg-[#3a4550]"
                        }`} />
                        {i < order.tracking!.length - 1 && (
                          <div className="absolute top-3 left-1.5 w-px h-full -translate-x-1/2 bg-[rgba(184,223,232,0.14)]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-[#edeae4]">{activity.status}</p>
                        <p className="text-xs text-[#5a6670] mt-1">{activity.activity}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-[#5a6670]">
                          <span>{activity.date}</span>
                          {activity.location && (
                            <>
                              <span>•</span>
                              <span>{activity.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="card p-5">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
                Order Items
              </p>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[rgba(184,223,232,0.07)] last:border-0">
                    <div>
                      <p className="text-sm text-[#edeae4]">{item.productName}</p>
                      <p className="text-xs text-[#5a6670]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-serif text-[#edeae4]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(184,223,232,0.07)] flex justify-between items-center">
                <span className="text-[#5a6670]">Total</span>
                <span className="font-serif text-lg text-[#b8dfe8]">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-5">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
                Delivery Address
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-[#edeae4]">{order.shippingAddress.fullName}</p>
                <p className="text-[#5a6670]">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <div className="flex items-center gap-2 text-[#5a6670] pt-2">
                  <Phone size={12} />
                  <span>{order.shippingAddress.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5a6670]">
                  <Mail size={12} />
                  <span>{order.shippingAddress.email}</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="text-center py-4">
              <p className="text-sm text-[#5a6670] mb-2">Need help with your order?</p>
              <a 
                href="mailto:support@ara-skincare.com" 
                className="text-[#6aafbf] text-sm hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!order && !loading && !orderParam && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-[#5a6670] mb-6">
              Enter your order number above to track your shipment
            </p>
            <Link href="/products" className="btn-secondary inline-block">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#05080a] min-h-screen flex items-center justify-center">
        <div className="text-[#5a6670]">Loading...</div>
      </div>
    }>
      <OrderTracker />
    </Suspense>
  );
}
