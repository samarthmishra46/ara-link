"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { addOns } from "@/data/products";


interface AddOnSectionProps {
  selectedAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
}

export default function AddOnSection({ selectedAddOns, onToggleAddOn }: AddOnSectionProps) {
  return (
    <div className="py-5 px-5 bg-[#05080a] border-t border-[rgba(184,223,232,0.07)]">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
          Complete The Ritual
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]" />
      </div>

      {/* Add-on Cards */}
      <div className="space-y-2.5">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          
          return (
            <div
              key={addOn.id}
              onClick={() => onToggleAddOn(addOn.id)}
              className={`border bg-[#0b1014] p-4 flex gap-3.5 items-start relative overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? "border-[#b8dfe8] bg-[rgba(184,223,232,0.04)]"
                  : "border-[rgba(184,223,232,0.14)] hover:border-[rgba(184,223,232,0.22)]"
              }`}
            >
              {/* Badge */}
              <div
                className={`absolute top-0 right-0 font-mono text-[8px] tracking-[0.15em] px-2.5 py-0.5 ${
                  isSelected
                    ? "bg-[#b8dfe8] text-[#05080a]"
                    : "bg-[#c9a96e] text-[#05080a]"
                }`}
              >
                {isSelected ? "✓ ADDED" : "ADD-ON"}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-[#10181e] border border-[rgba(184,223,232,0.07)] flex items-center justify-center text-2xl flex-shrink-0">
                {addOn.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] text-[#edeae4] font-normal mb-1">{addOn.name}</h4>
                <p className="text-[11px] text-[#5a6670] leading-relaxed mb-2 line-clamp-2">
                  {addOn.description}
                  {addOn.amazonLink && (
                    <a
                      href={addOn.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6aafbf] ml-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on Amazon →
                    </a>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg text-[#edeae4]">
                    {formatPrice(addOn.price)}
                  </span>
                  <span className="text-xs text-[#3a4550] line-through">
                    {formatPrice(addOn.originalPrice)}
                  </span>
                  <span className="badge badge-ice text-[9px]">
                    Save {formatPrice(addOn.originalPrice - addOn.price)}
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <div
                className={`w-5 h-5 border flex items-center justify-center text-[11px] flex-shrink-0 mt-5 transition-all ${
                  isSelected
                    ? "bg-[#b8dfe8] border-[#b8dfe8] text-[#05080a]"
                    : "border-[rgba(184,223,232,0.14)] text-transparent"
                }`}
              >
                ✓
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// FOMO Section
export function FomoSection() {
  const [seconds, setSeconds] = useState(587);
  const viewers = 27;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 1799 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="bg-gradient-to-r from-[rgba(224,90,90,0.08)] via-[rgba(224,90,90,0.12)] to-[rgba(224,90,90,0.08)] border-y border-[rgba(224,90,90,0.2)] py-3.5 px-5 flex items-center gap-3 flex-wrap">
      <div className="w-2 h-2 bg-[#e05a5a] rounded-full animate-pulse-dot flex-shrink-0" />
      <div className="text-xs text-[#edeae4] flex-1">
        <strong className="text-[#e05a5a]">{viewers} people</strong> are looking at this right now. Current batch ends in:
      </div>
      <div className="font-mono text-sm text-[#edeae4] font-normal bg-[rgba(224,90,90,0.15)] py-1.5 px-3 border border-[rgba(224,90,90,0.3)]">
        {timeStr}
      </div>
    </div>
  );
}

// Stock Bar
export function StockBar({ stock, total = 100 }: { stock: number; total?: number }) {
  const percentage = (stock / total) * 100;

  return (
    <div className="py-4 px-5 bg-[#0b1014]">
      <div className="flex justify-between text-xs text-[#5a6670] mb-2">
        <span>Stock remaining</span>
        <span className="text-[#e05a5a]">{stock} / {total} units left</span>
      </div>
      <div className="h-1 bg-[rgba(184,223,232,0.14)] rounded-sm">
        <div
          className="h-1 bg-gradient-to-r from-[#e05a5a] to-[#ff8a8a] rounded-sm transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
