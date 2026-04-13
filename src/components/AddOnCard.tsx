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
  const handleClick = () => {
    onToggle(addon.id, !selected);
  };

  return (
    <div 
      onClick={handleClick}
      className={`border cursor-pointer p-4 flex gap-4 items-start relative overflow-hidden transition-all duration-300 ${
        selected 
          ? "bg-[rgba(184,223,232,0.04)] border-[#b8dfe8]" 
          : "bg-[#0b1014] border-[rgba(184,223,232,0.14)] hover:border-[rgba(184,223,232,0.22)]"
      }`}
    >
      {/* Badge */}
      <div 
        className={`absolute top-0 right-0 font-mono text-[8px] tracking-[0.15em] py-1 px-2.5 ${
          selected 
            ? "bg-[#b8dfe8] text-[#05080a]" 
            : "bg-[#c9a96e] text-[#05080a]"
        }`}
      >
        {selected ? "✓ ADDED" : "ADD-ON"}
      </div>

      {/* Icon */}
      <div className="w-16 h-16 bg-[#10181e] border border-[rgba(184,223,232,0.07)] flex items-center justify-center text-2xl flex-shrink-0">
        {addon.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm text-[#edeae4] font-normal mb-1">
          {addon.name}
        </h4>
        <p className="text-xs text-[#5a6670] leading-relaxed mb-2">
          {addon.description}
          {addon.amazonLink && (
            <a 
              href={addon.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#6aafbf] ml-1 no-underline hover:underline"
            >
              View on Amazon →
            </a>
          )}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg text-[#edeae4]">
            {formatPrice(addon.price)}
          </span>
          <span className="text-xs text-[#3a4550] line-through">
            {formatPrice(addon.originalPrice)}
          </span>
          <span className="badge badge-ice text-[8px] py-0.5 px-2">
            Save {formatPrice(addon.originalPrice - addon.price)}
          </span>
        </div>
      </div>

      {/* Checkbox */}
      <div 
        className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 mt-5 transition-all duration-200 ${
          selected
            ? "bg-[#b8dfe8] border-[#b8dfe8] text-[#05080a]"
            : "border-[rgba(184,223,232,0.14)]"
        }`}
      >
        {selected && <Check size={12} />}
      </div>
    </div>
  );
}
