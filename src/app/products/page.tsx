import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop All Products — ARA Cold Therapy",
  description: "Browse our collection of premium cold therapy skincare products.",
};

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-4">Shop</div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#0f0a1e] mb-3">
              The Cold<br />
              <em className="italic text-[#7c3aed]">Collection</em>
            </h1>
            <p className="text-sm md:text-base text-[#6b7280] leading-relaxed max-w-lg">
              Premium cold therapy tools designed for the modern skincare ritual. Each product engineered for results, not routine.
            </p>
          </div>
          <div className="font-mono text-xs text-[#9ca3af]">
            {products.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-t border-b border-[rgba(124,58,237,0.1)] bg-[#faf8ff]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-3">
          {[
            { icon: "🚚", title: "Free Shipping", sub: "Across India" },
            { icon: "↩️", title: "30-Day Returns",  sub: "No questions asked" },
            { icon: "🔒", title: "Secure Payments", sub: "Razorpay encrypted" },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="py-7 px-4 text-center border-b sm:border-b-0 sm:border-r last:border-r-0 border-[rgba(124,58,237,0.08)]">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-sm font-semibold text-[#0f0a1e]">{title}</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
