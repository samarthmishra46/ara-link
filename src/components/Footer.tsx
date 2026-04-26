import Link from "next/link";

const shopLinks = [
  { href: "/products",              label: "All Products" },
  { href: "/products/ara-ice-bowl", label: "Ice Bowl" },
  { href: "/products/ara-ritual-kit", label: "Ritual Kit" },
];

const supportLinks = [
  { href: "/track",   label: "Track Order" },
  { href: "/returns", label: "Returns" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms",   label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#faf8ff] border-t border-[rgba(124,58,237,0.1)]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand — full width on xs, single col on md */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl font-bold tracking-[0.35em] text-[#7c3aed] mb-3">
                         <img src="Pastedimage.png" alt="" className="w-20 px-2"/>

            </div>
            <p className="text-sm text-[#6b7280] leading-relaxed max-w-[200px]">
              Premium cold therapy skincare for the modern ritual.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#7c3aed] mb-4">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {shopLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#7c3aed] mb-4">
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#7c3aed] mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(124,58,237,0.1)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#9ca3af]">
            © 2025 ARA Cold Therapy Skincare · All rights reserved
          </p>
          <p className="text-xs text-[#9ca3af]">Made with care in India</p>
        </div>
      </div>
    </footer>
  );
}
