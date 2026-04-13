"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Truck, Shield, RotateCcw, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { indianStates, addOns } from "@/data/products";


declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, getSubtotal, clearCart, removeItem, updateQuantity } = useCart();
  const { items } = state;
  
  const [loading, setLoading] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = getSubtotal();
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const total = subtotal + addOnsTotal;

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Toggle add-on
  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter valid 10-digit number";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ""))) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window.Razorpay !== "undefined") {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment
  const handlePayment = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // Create order in backend
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        variant: item.variant?.name,
        sku: item.product.sku,
      }));

      // Add selected add-ons
      selectedAddOns.forEach((id) => {
        const addon = addOns.find((a) => a.id === id);
        if (addon) {
          orderItems.push({
            productId: addon.id,
            productName: addon.name,
            quantity: 1,
            price: addon.price,
            variant: undefined,
            sku: `ADDON-${addon.id.toUpperCase()}`,
          });
        }
      });

      // Create Razorpay order
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          items: orderItems,
          shippingAddress: {
            ...formData,
            country: "India",
          },
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      // Load Razorpay
      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error("Failed to load payment gateway");
      }

      // Open Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: total * 100,
        currency: "INR",
        name: "ARA Skincare",
        description: "Cold Therapy Products",
        order_id: data.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            clearCart();
            router.push(`/track?order=${data.orderNumber}`);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#b8dfe8",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#05080a] min-h-screen flex flex-col items-center justify-center p-5 text-center">
        <div className="text-6xl md:text-8xl mb-6">🧊</div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#edeae4] mb-3">Your cart is empty</h1>
        <p className="text-sm md:text-base text-[#5a6670] mb-6">Add some products to get started</p>
        <Link href="/products" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#05080a] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#05080a]/95 backdrop-blur-xl border-b border-[rgba(184,223,232,0.07)] px-5 md:px-10 lg:px-16 py-4">
        <div className="flex items-center gap-4 max-w-[1400px] mx-auto">
          <Link href="/products" className="text-[#5a6670] hover:text-[#edeae4] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-serif text-lg md:text-xl text-[#edeae4]">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-5 md:p-10 lg:p-16">
        {/* Desktop: Two column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Column - Form */}
          <div className="lg:flex-1 lg:max-w-xl order-2 lg:order-1">
            {/* Delivery Details */}
            <div className="mb-6">
              <h2 className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
                Delivery Details
              </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`input ${errors.fullName ? "border-[#e05a5a]" : ""}`}
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="text-xs text-[#e05a5a] mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${errors.phone ? "border-[#e05a5a]" : ""}`}
                  placeholder="10-digit mobile"
                />
                {errors.phone && (
                  <p className="text-xs text-[#e05a5a] mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? "border-[#e05a5a]" : ""}`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-[#e05a5a] mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`input ${errors.address ? "border-[#e05a5a]" : ""}`}
                placeholder="House/Flat, Street, Area"
              />
              {errors.address && (
                <p className="text-xs text-[#e05a5a] mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input ${errors.city ? "border-[#e05a5a]" : ""}`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-xs text-[#e05a5a] mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`input ${errors.pincode ? "border-[#e05a5a]" : ""}`}
                  placeholder="6-digit PIN"
                />
                {errors.pincode && (
                  <p className="text-xs text-[#e05a5a] mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6670] mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`input ${errors.state ? "border-[#e05a5a]" : ""}`}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-xs text-[#e05a5a] mt-1">{errors.state}</p>
              )}
            </div>
          </div>
        </div>

        {/* Guarantees - Desktop only */}
        <div className="hidden lg:grid grid-cols-3 gap-px bg-[rgba(184,223,232,0.07)] mt-6">
          <div className="bg-[#0b1014] py-4 px-2 text-center">
            <Truck size={16} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
              Free Shipping
            </p>
          </div>
          <div className="bg-[#0b1014] py-4 px-2 text-center">
            <RotateCcw size={16} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
              30-Day Returns
            </p>
          </div>
          <div className="bg-[#0b1014] py-4 px-2 text-center">
            <Shield size={16} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
              Secure Pay
            </p>
          </div>
        </div>
      </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-[400px] xl:w-[440px] order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 bg-[#0b1014] lg:border lg:border-[rgba(184,223,232,0.07)] lg:p-6">
            <h2 className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-[#10181e] border border-[rgba(184,223,232,0.07)]">
                  <div className="w-14 h-14 bg-[#05080a] flex items-center justify-center text-xl flex-shrink-0">
                    🧊
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-[#edeae4] truncate">{item.product.name}</p>
                        {item.variant && (
                          <p className="text-xs text-[#5a6670]">{item.variant.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-[#5a6670] hover:text-[#e05a5a] p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[rgba(184,223,232,0.14)]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#edeae4] hover:bg-[rgba(184,223,232,0.05)]"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-7 text-center text-xs font-mono text-[#edeae4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#edeae4] hover:bg-[rgba(184,223,232,0.05)]"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span className="font-serif text-[#edeae4]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mb-6">
              <h3 className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#5a6670] mb-3">
                Add to Your Order
              </h3>
              <div className="space-y-2">
                {addOns.slice(0, 2).map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                      selectedAddOns.includes(addon.id)
                        ? "bg-[rgba(184,223,232,0.04)] border-[#b8dfe8]"
                        : "bg-[#10181e] border-[rgba(184,223,232,0.07)] hover:border-[rgba(184,223,232,0.2)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 border flex items-center justify-center text-xs ${
                        selectedAddOns.includes(addon.id)
                          ? "bg-[#b8dfe8] border-[#b8dfe8] text-[#05080a]"
                          : "border-[rgba(184,223,232,0.14)]"
                      }`}
                    >
                      {selectedAddOns.includes(addon.id) && "✓"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#edeae4]">{addon.name}</p>
                      <p className="text-xs text-[#5a6670]">
                        {formatPrice(addon.price)}{" "}
                        <span className="line-through">{formatPrice(addon.originalPrice)}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[rgba(184,223,232,0.07)] my-4" />

            {/* Order Total */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#5a6670]">Subtotal</span>
                <span className="text-[#edeae4]">{formatPrice(subtotal)}</span>
              </div>
              {addOnsTotal > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#5a6670]">Add-ons</span>
                  <span className="text-[#edeae4]">{formatPrice(addOnsTotal)}</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#5a6670]">Shipping</span>
                <span className="text-[#6aafbf]">FREE</span>
              </div>
              <div className="h-px bg-[rgba(184,223,232,0.07)] my-3" />
              <div className="flex justify-between items-center">
                <span className="text-[#edeae4]">Total</span>
                <span className="font-serif text-2xl text-[#b8dfe8]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock size={14} />
              {loading ? "Processing..." : `Pay Securely — ${formatPrice(total)}`}
            </button>

            <p className="text-center text-xs text-[#5a6670] mt-4 leading-relaxed">
              Secured by Razorpay · 30-day returns · Your data is safe
            </p>

            {/* Guarantees - Mobile only */}
            <div className="lg:hidden grid grid-cols-3 gap-px bg-[rgba(184,223,232,0.07)] mt-6">
              <div className="bg-[#10181e] py-4 px-2 text-center">
                <Truck size={16} className="mx-auto mb-1 text-[#5a6670]" />
                <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
                  Free Shipping
                </p>
              </div>
              <div className="bg-[#10181e] py-4 px-2 text-center">
                <RotateCcw size={16} className="mx-auto mb-1 text-[#5a6670]" />
                <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
                  30-Day Returns
                </p>
              </div>
              <div className="bg-[#10181e] py-4 px-2 text-center">
                <Shield size={16} className="mx-auto mb-1 text-[#5a6670]" />
                <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#5a6670]">
                  Secure Pay
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
