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
      <div className="sticky top-0 z-40 w-full bg-[#05080a]/95 backdrop-blur-xl border-b border-[rgba(184,223,232,0.07)]">
      <nav className="h-[58px] md:h-[68px] px-5 md:px-10 lg:px-16 flex items-center justify-between max-w-[1400px] mx-auto">
        <Link 
          href="/" 
          className="font-serif text-[19px] md:text-[22px] font-light tracking-[0.45em] text-[#edeae4] no-underline hover:text-[#b8dfe8] transition-colors"
        >
          ARA
        </Link>
        
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link 
            href="/products" 
            className="text-[#5a6670] hover:text-[#edeae4] text-sm tracking-wider transition-colors"
          >
            Shop
          </Link>
          <Link 
            href="/about" 
            className="text-[#5a6670] hover:text-[#edeae4] text-sm tracking-wider transition-colors"
          >
            Our Story
          </Link>
          <Link 
            href="/track" 
            className="text-[#5a6670] hover:text-[#edeae4] text-sm tracking-wider transition-colors"
          >
            Track Order
          </Link>
        </div>

        <div className="flex gap-4 md:gap-5 items-center">
          <button 
            className="hidden md:flex bg-transparent border-none text-[#5a6670] cursor-pointer text-lg p-1.5 transition-colors hover:text-[#edeae4]"
            title="Search"
          >
            <Search size={18} />
          </button>
          <button 
            className="hidden md:flex bg-transparent border-none text-[#5a6670] cursor-pointer text-lg p-1.5 transition-colors hover:text-[#edeae4]"
            title="Account"
          >
            <User size={18} />
          </button>
          <button 
            className="bg-transparent border-none text-[#5a6670] cursor-pointer text-lg p-1.5 transition-colors hover:text-[#edeae4] relative"
            title="Cart"
            onClick={toggleCart}
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b8dfe8] text-[#05080a] text-[10px] font-medium rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden bg-transparent border-none text-[#5a6670] cursor-pointer text-lg p-1.5 transition-colors hover:text-[#edeae4]"
            title="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[58px] z-30 bg-[#05080a]/98 backdrop-blur-xl">
          <div className="flex flex-col p-6 gap-6">
            <Link 
              href="/products" 
              className="text-[#edeae4] text-xl font-light tracking-wider py-3 border-b border-[rgba(184,223,232,0.07)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className="text-[#edeae4] text-xl font-light tracking-wider py-3 border-b border-[rgba(184,223,232,0.07)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link 
              href="/track" 
              className="text-[#edeae4] text-xl font-light tracking-wider py-3 border-b border-[rgba(184,223,232,0.07)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Order
            </Link>
            <div className="flex gap-6 pt-4">
              <button className="text-[#5a6670] hover:text-[#edeae4] transition-colors">
                <Search size={20} />
              </button>
              <button className="text-[#5a6670] hover:text-[#edeae4] transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={state.isOpen} />
    </>
  );
}
