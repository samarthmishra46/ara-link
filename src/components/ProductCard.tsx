"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card overflow-hidden h-full flex flex-col">
        {/* Image area */}
        <div className="aspect-square bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff] relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute inset-0 glow-center" />

          {/* Product emoji/image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500 animate-float">
              🧊
            </span>
          </div>

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badges.includes("Limited Stock") && (
              <span className="badge badge-gold text-[8px]">🔥 Limited</span>
            )}
            {product.stock < 20 && (
              <span className="badge badge-red text-[8px]">Only {product.stock} Left</span>
            )}
          </div>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-purple text-[8px]">-{discount}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#7c3aed] mb-1.5">
            {product.category}
          </p>
          <h3 className="font-serif text-base md:text-lg font-medium text-[#0f0a1e] mb-1 group-hover:text-[#7c3aed] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-[#6b7280] mb-3 line-clamp-2 flex-1">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-[#c9a96e] text-[#c9a96e]"
                      : "text-[#e5e7eb] fill-[#e5e7eb]"
                  }
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#6b7280]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-semibold text-lg text-[#0f0a1e]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-[#9ca3af] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
