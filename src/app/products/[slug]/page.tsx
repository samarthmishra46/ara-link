import { notFound } from "next/navigation";
import { getProductBySlug, products, addOns, reviews, benefits, ritualSteps } from "@/data/products";
import ProductView from "@/components/ProductView";
import { FomoSection, StockBar } from "@/components/AddOnSection";
import AddOnSectionClient from "@/components/AddOnSectionClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} — ARA Cold Therapy`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#05080a] min-h-screen">
      {/* Product View Component */}
      <ProductView product={product} />

      {/* FOMO Section */}
      <FomoSection />

      {/* Stock Bar */}
      <StockBar stock={product.stock} total={100} />

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Add-ons Section */}
      <AddOnSectionClient addOns={addOns} />

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* How to Use */}
      <section className="section">
        <div className="eyebrow mb-5">The Method</div>
        <h2 className="font-serif text-3xl font-light leading-tight text-[#edeae4] mb-8">
          60 seconds.<br />
          <em className="italic text-[#b8dfe8]">No serum does this.</em>
        </h2>
        <div className="space-y-0">
          {ritualSteps.map((step) => (
            <div key={step.step} className="flex gap-4 py-5 border-b border-[rgba(184,223,232,0.07)]">
              <span className="font-mono text-[11px] text-[#6aafbf] pt-0.5">{step.step}</span>
              <div>
                <h4 className="text-sm text-[#edeae4] font-normal mb-1.5">{step.title}</h4>
                <p className="text-xs text-[#5a6670] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Science/Benefits */}
      <section className="section">
        <div className="eyebrow mb-5">The Science</div>
        <h2 className="font-serif text-3xl font-light leading-tight text-[#edeae4] mb-8">
          What cold actually does<br />
          <em className="italic text-[#b8dfe8]">to your face.</em>
        </h2>
        <div className="space-y-0">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4 py-4 border-b border-[rgba(184,223,232,0.07)]">
              <span className="text-xl w-8 text-center mt-0.5">{benefit.icon}</span>
              <div>
                <h4 className="text-sm text-[#edeae4] font-normal mb-1">{benefit.title}</h4>
                <p className="text-xs text-[#5a6670] leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Reviews */}
      <section className="section">
        <div className="eyebrow mb-5">Reviews</div>
        <h2 className="font-serif text-3xl font-light leading-tight text-[#edeae4] mb-8">
          What others<br />
          <em className="italic text-[#b8dfe8]">are saying.</em>
        </h2>
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="card p-6">
              <div className="text-[#c9a96e] text-xs tracking-wider mb-3">★★★★★</div>
              <p className="font-serif text-[15px] italic text-[#edeae4] leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#5a6670]">
                {review.author}
              </div>
              <div className="text-[10px] text-[#3a4550] mt-1">{review.role}</div>
              {review.verified && (
                <span className="inline-block mt-2 font-mono text-[9px] tracking-[0.12em] uppercase text-[#6aafbf] bg-[rgba(106,175,191,0.08)] border border-[rgba(106,175,191,0.15)] py-0.5 px-2">
                  ✓ Verified Purchase
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
