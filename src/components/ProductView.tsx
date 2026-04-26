"use client";

import { useState } from "react";
import { Star, Share2, Heart, Check, Truck, Shield, RotateCcw } from "lucide-react";
import type { Product, ProductVariant } from "@/types";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
  };

  return (
    <div className="bg-white">
      {/* Image area */}
      <div className="w-full bg-[#faf8ff]">
        <div className="w-full aspect-square max-h-[520px] flex items-center justify-center relative overflow-hidden bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff]">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute inset-0 glow-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-[rgba(124,58,237,0.1)] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[rgba(124,58,237,0.06)] rounded-full" />
          <div className="animate-float">
            <span className="text-[150px] select-none">🧊</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 p-3 bg-[#faf8ff] overflow-x-auto border-t border-[rgba(124,58,237,0.08)]">
          {["🧊", "💧", "❄️", "✨", "📦"].map((emoji, i) => (
            <div
              key={i}
              className={`w-16 h-16 flex-shrink-0 border rounded-lg bg-white flex items-center justify-center cursor-pointer text-lg transition-all ${
                i === 0
                  ? "border-[#7c3aed] shadow-[0_0_0_2px_rgba(124,58,237,0.15)]"
                  : "border-[rgba(124,58,237,0.12)] hover:border-[#7c3aed]"
              }`}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="badge">{product.category}</span>
          {product.badges.includes("Limited Stock") && (
            <span className="badge badge-gold">🔥 Limited Stock</span>
          )}
          <span className="badge badge-red">Only {product.stock} Left</span>
          <button className="ml-auto p-2 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f5f3ff] rounded-lg transition-colors">
            <Share2 size={16} />
          </button>
        </div>

        {/* Name */}
        <h1 className="font-serif text-[32px] font-light leading-tight text-[#0f0a1e] mb-1.5">
          {product.name}
        </h1>
        <p className="text-[13px] text-[#6b7280] tracking-wide mb-5">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.floor(product.rating) ? "fill-[#c9a96e] text-[#c9a96e]" : "fill-[#e5e7eb] text-[#e5e7eb]"}
              />
            ))}
          </div>
          <span className="text-xs text-[#6b7280] font-mono">{product.rating}</span>
          <div className="w-px h-3.5 bg-[rgba(124,58,237,0.15)]" />
          <span className="text-xs text-[#6b7280] font-mono">{product.reviewCount} reviews</span>
          <div className="w-px h-3.5 bg-[rgba(124,58,237,0.15)]" />
          <span className="text-[11px] text-[#7c3aed] font-medium">✓ Verified</span>
        </div>

        <div className="h-px bg-[rgba(124,58,237,0.08)] my-5" />

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6b7280] mb-3">
              Colour
            </p>
            <div className="flex gap-2.5 flex-wrap mb-5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-11 h-11 rounded-full cursor-pointer transition-all ${
                    selectedVariant?.id === variant.id
                      ? "ring-2 ring-[#7c3aed] ring-offset-2 ring-offset-white"
                      : "ring-1 ring-[rgba(124,58,237,0.2)] hover:ring-[#7c3aed]"
                  }`}
                  style={{ background: variant.colorCode }}
                  title={variant.name}
                />
              ))}
            </div>
          </>
        )}

        {/* Quantity */}
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6b7280] mb-3">
          Quantity
        </p>
        <div className="flex items-center border border-[rgba(124,58,237,0.2)] rounded-lg w-fit mb-5 overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors text-lg"
          >
            −
          </button>
          <span className="w-11 text-center font-mono text-sm text-[#0f0a1e] font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors text-lg"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="font-serif text-[40px] font-light text-[#0f0a1e] leading-none">
            {formatPrice(product.price)}
          </span>
          <span className="text-lg text-[#9ca3af] line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="badge badge-purple">Save {formatPrice(product.originalPrice - product.price)}</span>
        </div>
        <p className="text-[11px] text-[#9ca3af] mb-5">Inclusive of all taxes · Free shipping</p>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5 mb-5">
          <button onClick={handleAddToCart} className="btn-primary w-full">
            Add to Cart — Order Now
          </button>
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Heart size={14} />
            Save to Wishlist
          </button>
        </div>

        {/* Shipping banner */}
        <div className="flex items-center justify-center gap-2 bg-[#f5f3ff] border border-[rgba(124,58,237,0.15)] rounded-lg py-3 px-4 font-mono text-[10px] tracking-[0.15em] uppercase text-[#7c3aed] mb-5">
          <Truck size={14} />
          Free shipping across India · Arrives in 3–5 days
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-3 divide-x divide-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.1)] rounded-xl overflow-hidden">
          {[
            { icon: <RotateCcw size={18} />, label: "30-Day\nReturns" },
            { icon: <Shield size={18} />,    label: "Secure\nPayments" },
            { icon: <Check size={18} />,     label: "Derma\nTested" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-[#faf8ff] py-3.5 px-2 text-center">
              <div className="flex justify-center mb-1 text-[#7c3aed]">{icon}</div>
              <p className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-[#6b7280] leading-relaxed whitespace-pre-line">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
