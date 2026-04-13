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
    <div className="bg-[#05080a]">
      {/* Media Section */}
      <div className="w-full bg-[#0b1014]">
        {/* Main Image */}
        <div className="w-full aspect-square max-h-[520px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#070d12] via-[#0a1520] to-[#060c10]">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute inset-0 glow-center" />
          
          {/* Ripple rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-[rgba(184,223,232,0.08)] rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[rgba(184,223,232,0.08)] rounded-full animate-ping opacity-10" style={{ animationDuration: '4s', animationDelay: '1.4s' }} />
          
          {/* Product Icon */}
          <div className="animate-float">
            <span className="text-[150px]">🧊</span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-1.5 p-3 bg-[#0b1014] overflow-x-auto">
          {["🧊", "💧", "❄️", "✨", "📦"].map((emoji, i) => (
            <div
              key={i}
              className={`w-16 h-16 flex-shrink-0 border bg-[#10181e] flex items-center justify-center cursor-pointer text-lg transition-colors ${
                i === 0 ? "border-[#b8dfe8]" : "border-[rgba(184,223,232,0.07)] hover:border-[#b8dfe8]"
              }`}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="badge">{product.category}</span>
          {product.badges.includes("Limited Stock") && (
            <span className="badge badge-gold">🔥 Limited Stock</span>
          )}
          <span className="badge badge-red">Only {product.stock} Left</span>
          <button className="ml-auto bg-transparent border-none text-[#5a6670] cursor-pointer p-1 hover:text-[#edeae4]">
            <Share2 size={16} />
          </button>
        </div>

        {/* Name & Description */}
        <h1 className="font-serif text-[32px] font-light leading-tight text-[#edeae4] mb-1.5">
          {product.name}
        </h1>
        <p className="text-[13px] text-[#5a6670] tracking-wide mb-5">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.floor(product.rating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-[#3a4550]"}
              />
            ))}
          </div>
          <span className="text-xs text-[#5a6670] font-mono">{product.rating}</span>
          <div className="w-px h-3.5 bg-[rgba(184,223,232,0.14)]" />
          <span className="text-xs text-[#5a6670] font-mono">{product.reviewCount} reviews</span>
          <div className="w-px h-3.5 bg-[rgba(184,223,232,0.14)]" />
          <span className="text-[11px] text-[#6aafbf]">✓ Verified</span>
        </div>

        <div className="h-px bg-[rgba(184,223,232,0.07)] my-5" />

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5a6670] mb-3">
              Colour
            </p>
            <div className="flex gap-2.5 flex-wrap mb-5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-11 h-11 rounded-full cursor-pointer transition-all relative ${
                    selectedVariant?.id === variant.id
                      ? "ring-2 ring-[#b8dfe8] ring-offset-2 ring-offset-[#05080a]"
                      : "ring-2 ring-[rgba(184,223,232,0.07)] hover:ring-[#b8dfe8]"
                  }`}
                  style={{ background: variant.colorCode }}
                  title={variant.name}
                />
              ))}
            </div>
          </>
        )}

        {/* Quantity */}
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5a6670] mb-3">
          Quantity
        </p>
        <div className="flex items-center gap-0 border border-[rgba(184,223,232,0.14)] w-fit mb-5">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 bg-transparent border-none text-[#edeae4] text-lg cursor-pointer hover:bg-[rgba(184,223,232,0.05)]"
          >
            −
          </button>
          <span className="w-11 text-center font-mono text-sm text-[#edeae4]">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 bg-transparent border-none text-[#edeae4] text-lg cursor-pointer hover:bg-[rgba(184,223,232,0.05)]"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="font-serif text-[40px] font-light text-[#edeae4] leading-none">
            {formatPrice(product.price)}
          </span>
          <span className="text-lg text-[#3a4550] line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="badge badge-ice">Save {formatPrice(product.originalPrice - product.price)}</span>
        </div>
        <p className="text-[11px] text-[#5a6670] mb-5">Inclusive of all taxes · Free shipping</p>

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

        {/* Shipping Badge */}
        <div className="flex items-center justify-center gap-2 bg-[rgba(184,223,232,0.05)] border border-[rgba(184,223,232,0.14)] py-3 px-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#6aafbf] mb-5">
          <Truck size={14} />
          Free shipping across India · Arrives in 3–5 days
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-3 gap-px bg-[rgba(184,223,232,0.07)]">
          <div className="bg-[#0b1014] py-3.5 px-2 text-center">
            <RotateCcw size={18} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[#5a6670] leading-relaxed">
              30-Day<br />Returns
            </p>
          </div>
          <div className="bg-[#0b1014] py-3.5 px-2 text-center">
            <Shield size={18} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[#5a6670] leading-relaxed">
              Secure<br />Payments
            </p>
          </div>
          <div className="bg-[#0b1014] py-3.5 px-2 text-center">
            <Check size={18} className="mx-auto mb-1 text-[#5a6670]" />
            <p className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[#5a6670] leading-relaxed">
              Derma<br />Tested
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
