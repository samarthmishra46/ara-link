"use client";

import Link from "next/link";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
}

export default function CartDrawer({ isOpen }: CartDrawerProps) {
  const { state, closeCart, removeItem, updateQuantity, getSubtotal, getTotal } = useCart();
  const { items } = state;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0b1014] border-l border-[rgba(184,223,232,0.07)] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(184,223,232,0.07)]">
          <h2 className="font-serif text-lg font-light text-[#edeae4]">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="bg-transparent border-none text-[#5a6670] cursor-pointer p-1 hover:text-[#edeae4] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🧊</div>
              <p className="text-[#5a6670] text-sm mb-6">Your cart is empty</p>
              <Link 
                href="/products"
                onClick={closeCart}
                className="btn-primary inline-block"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex gap-4 p-4 bg-[#10181e] border border-[rgba(184,223,232,0.07)]"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-16 h-16 bg-[#0b1014] border border-[rgba(184,223,232,0.07)] flex items-center justify-center text-2xl flex-shrink-0">
                    🧊
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-[#edeae4] text-sm font-normal mb-1 truncate">
                          {item.product.name}
                        </h3>
                        {item.variant && (
                          <p className="text-[#5a6670] text-xs">{item.variant.name}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="bg-transparent border-none text-[#5a6670] cursor-pointer p-1 hover:text-[#e05a5a] transition-colors flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0 border border-[rgba(184,223,232,0.14)]">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 bg-transparent border-none text-[#edeae4] cursor-pointer hover:bg-[rgba(184,223,232,0.05)] transition-colors flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-mono text-sm text-[#edeae4]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 bg-transparent border-none text-[#edeae4] cursor-pointer hover:bg-[rgba(184,223,232,0.05)] transition-colors flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-serif text-lg text-[#edeae4]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[rgba(184,223,232,0.07)] bg-[#0b1014]">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#5a6670] text-sm">Subtotal</span>
              <span className="text-[#edeae4] font-serif text-lg">
                {formatPrice(getSubtotal())}
              </span>
            </div>
            
            {/* Shipping Note */}
            <p className="text-[#5a6670] text-xs mb-4 text-center">
              Free shipping on all orders · Taxes included
            </p>
            
            {/* Checkout Button */}
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Checkout — {formatPrice(getTotal())}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
