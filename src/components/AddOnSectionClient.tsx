"use client";

import { useState } from "react";
import AddOnCard from "@/components/AddOnCard";
import type { AddOn } from "@/types";

interface AddOnSectionClientProps {
  addOns: AddOn[];
}

export default function AddOnSectionClient({ addOns }: AddOnSectionClientProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  const handleToggle = (id: string, selected: boolean) => {
    setSelectedAddOns((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-5 px-5 bg-[#05080a]">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
          Complete The Ritual
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]" />
      </div>
      <div className="space-y-3">
        {addOns.map((addon) => (
          <AddOnCard 
            key={addon.id} 
            addon={addon} 
            onToggle={handleToggle} 
            selected={selectedAddOns.has(addon.id)}
          />
        ))}
      </div>
    </section>
  );
}
