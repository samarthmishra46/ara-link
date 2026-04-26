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
    <div className="py-5 px-5 bg-[#faf8ff] border-t border-[rgba(124,58,237,0.1)]">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#c9a96e]" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#7c3aed]">
          Complete The Ritual
        </span>
        <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#c9a96e]" />
      </div>

      {/* Add-on Cards */}
      <div className="space-y-2.5">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);

          return (
            <div
              key={addOn.id}
              onClick={() => onToggleAddOn(addOn.id)}
              className={`border rounded-xl bg-white p-4 flex gap-3.5 items-start relative overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? "border-[#7c3aed] bg-[#faf8ff] shadow-[0_0_0_3px_rgba(124,58,237,0.08)]"
                  : "border-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.3)] hover:shadow-sm"
              }`}
            >
              {/* Status badge */}
              <div
                className={`absolute top-0 right-0 font-mono text-[8px] tracking-[0.15em] px-2.5 py-1 rounded-bl-lg ${
                  isSelected
                    ? "bg-[#7c3aed] text-white"
                    : "bg-[#c9a96e] text-white"
                }`}
              >
                {isSelected ? "✓ ADDED" : "ADD-ON"}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#f5f3ff] border border-[rgba(124,58,237,0.12)] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {addOn.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pr-10">
                <h4 className="text-sm font-medium text-[#0f0a1e] mb-1">{addOn.name}</h4>
                <p className="text-[11px] text-[#6b7280] leading-relaxed mb-2 line-clamp-2">
                  {addOn.description}
                  {addOn.amazonLink && (
                    <a
                      href={addOn.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7c3aed] ml-1 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on Amazon →
                    </a>
                  )}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-base text-[#0f0a1e]">
                    {formatPrice(addOn.price)}
                  </span>
                  <span className="text-xs text-[#9ca3af] line-through">
                    {formatPrice(addOn.originalPrice)}
                  </span>
                  <span className="badge badge-purple text-[9px]">
                    Save {formatPrice(addOn.originalPrice - addOn.price)}
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center text-[11px] flex-shrink-0 mt-5 transition-all ${
                  isSelected
                    ? "bg-[#7c3aed] border-[#7c3aed] text-white"
                    : "border-[rgba(124,58,237,0.25)] text-transparent"
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

// ── FOMO Section ─────────────────────────────────────────────────────────────
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
    <div className="bg-[#fff7f7] border-y border-[rgba(220,38,38,0.15)] py-3 px-5 flex items-center gap-3 flex-wrap justify-center md:justify-start">
      <div className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse-dot flex-shrink-0" />
      <p className="text-xs text-[#374151] flex-1 min-w-[180px]">
        <strong className="text-[#dc2626]">{viewers} people</strong> are viewing this right now. Current batch ends in:
      </p>
      <div className="font-mono text-sm font-semibold text-[#dc2626] bg-[rgba(220,38,38,0.07)] py-1.5 px-3 rounded-lg border border-[rgba(220,38,38,0.2)]">
        {timeStr}
      </div>
    </div>
  );
}

// ── Stock Bar ─────────────────────────────────────────────────────────────────
export function StockBar({ stock, total = 100 }: { stock: number; total?: number }) {
  const percentage = (stock / total) * 100;

  return (
    <div className="py-4 px-5 bg-white border-b border-[rgba(124,58,237,0.08)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between text-xs text-[#6b7280] mb-2">
          <span>Stock remaining</span>
          <span className="text-[#dc2626] font-medium">{stock} / {total} units left</span>
        </div>
        <div className="h-1.5 bg-[#f3f0ff] rounded-full">
          <div
            className="h-1.5 bg-linear-to-r from-[#dc2626] to-[#f87171] rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
