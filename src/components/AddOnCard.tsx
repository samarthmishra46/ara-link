"use client";
import type { AddOn } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";

interface AddOnCardProps {
  addon: AddOn;
  onToggle: (id: string, selected: boolean) => void;
  selected?: boolean;
}

export default function AddOnCard({ addon, onToggle, selected = false }: AddOnCardProps) {
  return (
    <div
      onClick={() => onToggle(addon.id, !selected)}
      className={`border rounded-xl cursor-pointer p-4 flex gap-4 items-start relative overflow-hidden transition-all duration-200 ${
        selected
          ? "bg-[#faf8ff] border-[#7c3aed] shadow-[0_0_0_3px_rgba(124,58,237,0.08)]"
          : "bg-white border-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.3)] hover:shadow-sm"
      }`}
    >
      {/* Status badge */}
      <div
        className={`absolute top-0 right-0 font-mono text-[8px] tracking-[0.15em] py-1 px-2.5 rounded-bl-lg ${
          selected ? "bg-[#7c3aed] text-white" : "bg-[#c9a96e] text-white"
        }`}
      >
        {selected ? "✓ ADDED" : "ADD-ON"}
      </div>

      {/* Icon */}
      <div className="w-14 h-14 bg-[#f5f3ff] border border-[rgba(124,58,237,0.12)] rounded-lg flex items-center justify-center text-2xl shrink-0">
        {addon.icon}
      </div>

      {/* Content */}
      <div className="flex-1 pr-8">
        <h4 className="text-sm font-medium text-[#0f0a1e] mb-1">{addon.name}</h4>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-2">
          {addon.description}
          {addon.amazonLink && (
            <a
              href={addon.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#7c3aed] ml-1 hover:underline"
            >
              View on Amazon →
            </a>
          )}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-base text-[#0f0a1e]">{formatPrice(addon.price)}</span>
          <span className="text-xs text-[#9ca3af] line-through">{formatPrice(addon.originalPrice)}</span>
          <span className="badge badge-purple text-[9px]">
            Save {formatPrice(addon.originalPrice - addon.price)}
          </span>
        </div>
      </div>

      {/* Checkbox */}
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-5 transition-all ${
          selected ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "border-[rgba(124,58,237,0.25)]"
        }`}
      >
        {selected && <Check size={12} />}
      </div>
    </div>
  );
}
