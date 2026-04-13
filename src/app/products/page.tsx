import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop All Products — ARA Cold Therapy",
  description: "Browse our collection of premium cold therapy skincare products.",
};

export default function ProductsPage() {
  return (
    <div className="bg-[#05080a] min-h-screen">
      <section className="section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-5">Shop</div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#edeae4] mb-4">
              The Cold<br />
              <em className="italic text-[#b8dfe8]">Collection</em>
            </h1>
            <p className="text-sm md:text-base text-[#5a6670] leading-relaxed max-w-lg">
              Premium cold therapy tools designed for the modern skincare ritual. Each product engineered for results, not routine.
            </p>
          </div>
          <div className="font-mono text-xs text-[#5a6670]">
            {products.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[rgba(184,223,232,0.07)] border-y border-[rgba(184,223,232,0.07)]">
        <div className="bg-[#0b1014] py-6 md:py-8 px-4 text-center">
          <div className="text-2xl md:text-3xl mb-2">🚚</div>
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#5a6670]">
            Free Shipping<br />Across India
          </div>
        </div>
        <div className="bg-[#0b1014] py-6 md:py-8 px-4 text-center">
          <div className="text-2xl md:text-3xl mb-2">↩️</div>
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#5a6670]">
            30-Day<br />Returns
          </div>
        </div>
        <div className="bg-[#0b1014] py-6 md:py-8 px-4 text-center">
          <div className="text-2xl md:text-3xl mb-2">🔒</div>
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#5a6670]">
            Secure<br />Payments
          </div>
        </div>
      </div>
    </div>
  );
}
