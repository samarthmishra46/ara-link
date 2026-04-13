"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-[#070d12] via-[#0a1520] to-[#060c10] relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-overlay opacity-50" />
          
          {/* Glow */}
          <div className="absolute inset-0 glow-center" />
          
          {/* Product Icon/Image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl lg:text-7xl group-hover:scale-110 transition-transform duration-500 animate-float">
              🧊
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges.includes("Limited Stock") && (
              <span className="badge badge-gold text-[8px] sm:text-[9px]">🔥 Limited</span>
            )}
            {product.stock < 20 && (
              <span className="badge badge-red text-[8px] sm:text-[9px]">Only {product.stock} Left</span>
            )}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-ice text-[8px] sm:text-[9px]">-{discount}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {/* Category */}
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#6aafbf] mb-2">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="font-serif text-base md:text-lg font-light text-[#edeae4] mb-1 group-hover:text-[#b8dfe8] transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs md:text-sm text-[#5a6670] mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  className={i < Math.floor(product.rating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-[#3a4550]"} 
                />
              ))}
            </div>
            <span className="font-mono text-[10px] md:text-[11px] text-[#5a6670]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg md:text-xl text-[#edeae4]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-[#3a4550] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
