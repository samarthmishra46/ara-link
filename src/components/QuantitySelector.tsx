"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  max = 10, 
  min = 1 
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-0 border border-[rgba(184,223,232,0.14)] w-fit">
      <button 
        onClick={decrease}
        disabled={quantity <= min}
        className="w-10 h-10 bg-transparent border-none text-[#edeae4] text-lg cursor-pointer transition-colors hover:bg-[rgba(184,223,232,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      <div className="w-11 text-center font-mono text-sm text-[#edeae4]">
        {quantity}
      </div>
      <button 
        onClick={increase}
        disabled={quantity >= max}
        className="w-10 h-10 bg-transparent border-none text-[#edeae4] text-lg cursor-pointer transition-colors hover:bg-[rgba(184,223,232,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
