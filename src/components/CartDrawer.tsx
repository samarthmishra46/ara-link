"use client";

import Link from "next/link";
import { X, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white border-l border-[rgba(124,58,237,0.12)] shadow-[-8px_0_40px_rgba(124,58,237,0.08)] z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(124,58,237,0.1)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#7c3aed]" />
            <h2 className="font-serif text-lg font-semibold text-[#0f0a1e]">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#a78bfa]" />
              </div>
              <div>
                <p className="font-medium text-[#0f0a1e] mb-1">Your cart is empty</p>
                <p className="text-sm text-[#6b7280]">Add something beautiful to get started.</p>
              </div>
              <Link href="/products" onClick={closeCart} className="btn-primary mt-2">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-4 bg-[#faf8ff] border border-[rgba(124,58,237,0.1)] rounded-xl"
                >
                  {/* Image placeholder */}
                  <div className="w-[60px] h-[60px] bg-[#f5f3ff] border border-[rgba(124,58,237,0.12)] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    🧊
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-[#0f0a1e] truncate">{item.product.name}</h3>
                        {item.variant && (
                          <p className="text-xs text-[#6b7280] mt-0.5">{item.variant.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-[#9ca3af] hover:text-[#dc2626] hover:bg-red-50 rounded transition-colors flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Qty + Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[rgba(124,58,237,0.2)] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#0f0a1e]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#7c3aed] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-semibold text-[#0f0a1e]">
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
          <div className="px-5 py-4 border-t border-[rgba(124,58,237,0.1)] bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[#6b7280]">Subtotal</span>
              <span className="font-semibold text-[#0f0a1e]">{formatPrice(getSubtotal())}</span>
            </div>
            <p className="text-xs text-[#9ca3af] mb-4 text-center">
              Free shipping on all orders · Taxes included
            </p>
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
