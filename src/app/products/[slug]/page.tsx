import { notFound } from "next/navigation";
import { getProductBySlug, products, addOns, reviews, benefits, ritualSteps } from "@/data/products";
import ProductView from "@/components/ProductView";
import { StockBar } from "@/components/AddOnSection";
import AddOnSectionClient from "@/components/AddOnSectionClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ARA Cold Therapy`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="bg-white min-h-screen">
      <ProductView product={product} />

      <StockBar stock={product.stock} total={100} />

      <div className="h-px bg-[rgba(124,58,237,0.08)]" />

      <AddOnSectionClient addOns={addOns} />

      <div className="h-px bg-[rgba(124,58,237,0.08)]" />

      {/* How to Use */}
      <section className="bg-[#faf8ff]">
        <div className="section">
          <div className="eyebrow mb-4">The Method</div>
          <h2 className="font-serif text-3xl font-light leading-tight text-[#0f0a1e] mb-8">
            60 seconds.<br />
            <em className="italic text-[#7c3aed]">No serum does this.</em>
          </h2>
          <div className="max-w-2xl space-y-0">
            {ritualSteps.map((step, idx) => (
              <div
                key={step.step}
                className={`flex gap-5 py-5 ${idx < ritualSteps.length - 1 ? "border-b border-[rgba(124,58,237,0.08)]" : ""}`}
              >
                <span className="font-mono text-xs text-[#7c3aed] font-semibold pt-0.5 w-7 shrink-0">{step.step}</span>
                <div>
                  <h4 className="text-sm font-semibold text-[#0f0a1e] mb-1.5">{step.title}</h4>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[rgba(124,58,237,0.08)]" />

      {/* Science / Benefits */}
      <section className="bg-white">
        <div className="section">
          <div className="eyebrow mb-4">The Science</div>
          <h2 className="font-serif text-3xl font-light leading-tight text-[#0f0a1e] mb-8">
            What cold actually does<br />
            <em className="italic text-[#7c3aed]">to your face.</em>
          </h2>
          <div className="max-w-2xl space-y-0">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex gap-5 py-5 ${index < benefits.length - 1 ? "border-b border-[rgba(124,58,237,0.08)]" : ""}`}
              >
                <span className="text-xl w-8 shrink-0 mt-0.5 text-center">{benefit.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold text-[#0f0a1e] mb-1">{benefit.title}</h4>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[rgba(124,58,237,0.08)]" />

      {/* Reviews */}
      <section className="bg-[#faf8ff]">
        <div className="section">
          <div className="eyebrow mb-4">Reviews</div>
          <h2 className="font-serif text-3xl font-light leading-tight text-[#0f0a1e] mb-8">
            What others<br />
            <em className="italic text-[#7c3aed]">are saying.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.id} className="card p-6 flex flex-col">
                <div className="text-[#c9a96e] text-sm tracking-wider mb-3">★★★★★</div>
                <p className="font-serif text-[15px] italic text-[#0f0a1e] leading-relaxed mb-4 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#374151] font-medium">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">{review.role}</div>
                  {review.verified && (
                    <span className="inline-block mt-2 font-mono text-[9px] tracking-widest uppercase text-[#7c3aed] bg-[#f5f3ff] border border-[rgba(124,58,237,0.2)] py-0.5 px-2 rounded-full">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
