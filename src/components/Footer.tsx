import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 md:py-16 px-5 md:px-10 lg:px-16 border-t border-[rgba(184,223,232,0.07)] bg-[#05080a] max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-16">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <div className="font-serif text-xl tracking-[0.4em] text-[#edeae4] mb-2">
            ARA
          </div>
          <p className="text-xs text-[#5a6670] max-w-[200px] mx-auto md:mx-0">
            Premium cold therapy skincare for the modern ritual.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 text-center md:text-left">
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6aafbf] mb-4">Shop</h4>
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">All Products</Link>
              <Link href="/products/ara-ice-bowl" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Ice Bowl</Link>
              <Link href="/products/ara-ritual-kit" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Ritual Kit</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6aafbf] mb-4">Support</h4>
            <div className="flex flex-col gap-3">
              <Link href="/track" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Track Order</Link>
              <Link href="/returns" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Returns</Link>
              <Link href="/contact" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6aafbf] mb-4">Legal</h4>
            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-[#5a6670] hover:text-[#edeae4] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 pt-6 border-t border-[rgba(184,223,232,0.07)] text-center">
        <div className="font-mono text-[9px] tracking-[0.1em] text-[#3a4550]">
          © 2025 ARA Cold Therapy Skincare · All rights reserved
        </div>
      </div>
    </footer>
  );
}
