"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/cart";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { getItemCount, toggleCart, state } = useCart();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[rgba(124,58,237,0.1)] shadow-[0_1px_16px_rgba(124,58,237,0.06)]">
        {/*
          Layout trick: relative container, logo flush-left, icons flush-right,
          nav absolutely centred so it never shifts with asymmetric side widths.
        */}
        <div className="relative h-16 md:h-17.5 w-full max-w-350 mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between">

          {/* Logo — left */}
          <Link
            href="/"
            className="font-serif text-[22px] md:text-[26px] font-bold tracking-[0.35em] text-[#7c3aed] hover:text-[#5b21b6] transition-colors z-10"
          >
            <img src="Pastedimage.png" alt="" className="w-20 px-2"/>
          </Link>

          {/* Nav — dead-centre via absolute positioning */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {[
              { href: "/products", label: "Shop" },
              { href: "/about",    label: "Our Story" },
              { href: "/track",    label: "Track Order" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#374151] hover:text-[#7c3aed] text-sm font-medium tracking-wide transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Icons — right */}
          <div className="flex items-center gap-0.5 md:gap-1 z-10">
            <button
              className="hidden md:flex p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors"
              title="Search"
            >
              <Search size={18} />
            </button>
            <button
              className="hidden md:flex p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors"
              title="Account"
            >
              <User size={18} />
            </button>
            <button
              className="relative p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors"
              title="Cart"
              onClick={toggleCart}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#7c3aed] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors"
              title="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-white border-b border-[rgba(124,58,237,0.12)] shadow-[0_8px_32px_rgba(124,58,237,0.08)]">
          <nav className="flex flex-col px-6 py-4">
            {[
              { href: "/products", label: "Shop" },
              { href: "/about",    label: "Our Story" },
              { href: "/track",    label: "Track Order" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#0f0a1e] text-[17px] font-medium py-4 border-b border-[rgba(124,58,237,0.08)] last:border-0 hover:text-[#7c3aed] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 pt-5 pb-2">
              <button className="p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2.5 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f5f3ff] rounded-lg transition-colors">
                <User size={20} />
              </button>
            </div>
          </nav>
        </div>
      )}

      <CartDrawer isOpen={state.isOpen} />
    </>
  );
}
