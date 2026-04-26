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
  key: string; amount: number; currency: string;
  name: string; description: string; order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance { open: () => void }
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
    fullName: "", phone: "", email: "",
    address: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const total = subtotal + addOnsTotal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Name is required";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) e.phone = "Enter valid 10-digit number";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter valid email";
    if (!formData.address.trim()) e.address = "Address is required";
    if (!formData.city.trim()) e.city = "City is required";
    if (!formData.state) e.state = "State is required";
    if (!formData.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ""))) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadRazorpay = () => new Promise<boolean>((resolve) => {
    if (typeof window.Razorpay !== "undefined") { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (items.length === 0) { alert("Your cart is empty"); return; }
    setLoading(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id, productName: item.product.name,
        quantity: item.quantity, price: item.product.price,
        variant: item.variant?.name, sku: item.product.sku,
      }));
      selectedAddOns.forEach((id) => {
        const addon = addOns.find((a) => a.id === id);
        if (addon) orderItems.push({
          productId: addon.id, productName: addon.name, quantity: 1,
          price: addon.price, variant: undefined, sku: `ADDON-${addon.id.toUpperCase()}`,
        });
      });
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, items: orderItems, shippingAddress: { ...formData, country: "India" } }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to create order");
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load payment gateway");
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: total * 100, currency: "INR",
        name: "ARA Skincare", description: "Cold Therapy Products",
        order_id: data.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderId, ...response }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) { clearCart(); router.push(`/track?order=${data.orderNumber}`); }
          else alert("Payment verification failed. Please contact support.");
        },
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        theme: { color: "#7c3aed" },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl md:text-8xl mb-6">🧊</div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#0f0a1e] mb-3">Your cart is empty</h1>
        <p className="text-sm md:text-base text-[#6b7280] mb-6">Add some products to get started</p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `input${errors[field] ? " !border-[#dc2626]" : ""}`;

  const trustItems = [
    { icon: <Truck size={16} />,     label: "Free Shipping" },
    { icon: <RotateCcw size={16} />, label: "30-Day Returns" },
    { icon: <Shield size={16} />,    label: "Secure Pay" },
  ];

  return (
    <div className="bg-[#faf8ff] min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[rgba(124,58,237,0.1)] shadow-[0_1px_8px_rgba(124,58,237,0.06)] px-5 md:px-10 lg:px-16 py-4">
        <div className="flex items-center gap-4 max-w-[1400px] mx-auto">
          <Link href="/products" className="text-[#9ca3af] hover:text-[#7c3aed] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-serif text-lg md:text-xl text-[#0f0a1e]">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 py-8 md:px-10 md:py-12 lg:px-16 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Left — Form ─────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-xl order-2 lg:order-1">
            <div className="bg-white border border-[rgba(124,58,237,0.1)] rounded-2xl p-6 md:p-8 shadow-[0_2px_16px_rgba(124,58,237,0.06)]">
              <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#7c3aed] mb-5">
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className={inputClass("fullName")} placeholder="Your full name" />
                  {errors.fullName && <p className="text-xs text-[#dc2626] mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className={inputClass("phone")} placeholder="10-digit mobile" />
                    {errors.phone && <p className="text-xs text-[#dc2626] mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className={inputClass("email")} placeholder="your@email.com" />
                    {errors.email && <p className="text-xs text-[#dc2626] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange}
                    className={inputClass("address")} placeholder="House/Flat, Street, Area" />
                  {errors.address && <p className="text-xs text-[#dc2626] mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                      className={inputClass("city")} placeholder="City" />
                    {errors.city && <p className="text-xs text-[#dc2626] mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">PIN Code *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                      className={inputClass("pincode")} placeholder="6-digit PIN" />
                    {errors.pincode && <p className="text-xs text-[#dc2626] mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-[#6b7280] mb-1.5">State *</label>
                  <select name="state" value={formData.state} onChange={handleChange} className={inputClass("state")}>
                    <option value="">Select State</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-[#dc2626] mt-1">{errors.state}</p>}
                </div>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-3 divide-x divide-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.1)] rounded-xl overflow-hidden mt-6">
                {trustItems.map(({ icon, label }) => (
                  <div key={label} className="bg-[#faf8ff] py-3 px-2 text-center">
                    <div className="flex justify-center mb-1 text-[#7c3aed]">{icon}</div>
                    <p className="font-mono text-[8px] tracking-wide uppercase text-[#6b7280]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Order Summary ─────────────────────────── */}
          <div className="lg:w-[400px] xl:w-[440px] order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 bg-white border border-[rgba(124,58,237,0.1)] rounded-2xl p-6 shadow-[0_2px_16px_rgba(124,58,237,0.06)]">
              <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#7c3aed] mb-4">
                Order Summary
              </h2>

              {/* Cart items */}
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 p-3 bg-[#faf8ff] border border-[rgba(124,58,237,0.08)] rounded-xl">
                    <div className="w-14 h-14 bg-[#f5f3ff] rounded-lg flex items-center justify-center text-xl shrink-0">
                      🧊
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#0f0a1e] truncate">{item.product.name}</p>
                          {item.variant && <p className="text-xs text-[#6b7280]">{item.variant.name}</p>}
                        </div>
                        <button onClick={() => removeItem(item.product.id)}
                          className="text-[#9ca3af] hover:text-[#dc2626] p-1 rounded transition-colors shrink-0">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-[rgba(124,58,237,0.2)] rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors">
                            <Minus size={10} />
                          </button>
                          <span className="w-7 text-center text-xs font-mono font-medium text-[#0f0a1e]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors">
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="font-semibold text-[#0f0a1e]">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-ons */}
              <div className="mb-5">
                <h3 className="font-mono text-[9px] tracking-widest uppercase text-[#9ca3af] mb-3">Add to Your Order</h3>
                <div className="space-y-2">
                  {addOns.slice(0, 2).map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div key={addon.id} onClick={() => toggleAddOn(addon.id)}
                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#faf8ff] border-[#7c3aed] shadow-[0_0_0_2px_rgba(124,58,237,0.08)]"
                            : "bg-white border-[rgba(124,58,237,0.12)] hover:border-[rgba(124,58,237,0.28)]"
                        }`}>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs shrink-0 transition-all ${
                          isSelected ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "border-[rgba(124,58,237,0.25)]"
                        }`}>
                          {isSelected && "✓"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0f0a1e] truncate">{addon.name}</p>
                          <p className="text-xs text-[#6b7280]">
                            {formatPrice(addon.price)}{" "}
                            <span className="line-through text-[#9ca3af]">{formatPrice(addon.originalPrice)}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-[rgba(124,58,237,0.08)] my-4" />

              {/* Totals */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="font-medium text-[#0f0a1e]">{formatPrice(subtotal)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Add-ons</span>
                    <span className="font-medium text-[#0f0a1e]">{formatPrice(addOnsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className="text-[#7c3aed] font-semibold">FREE</span>
                </div>
                <div className="h-px bg-[rgba(124,58,237,0.08)]" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#0f0a1e]">Total</span>
                  <span className="font-serif text-2xl font-light text-[#0f0a1e]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Pay button */}
              <button onClick={handlePayment} disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                <Lock size={14} />
                {loading ? "Processing..." : `Pay Securely — ${formatPrice(total)}`}
              </button>
              <p className="text-center text-xs text-[#9ca3af] mt-3 leading-relaxed">
                Secured by Razorpay · 30-day returns · Your data is safe
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
