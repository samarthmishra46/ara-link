import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { products, reviews, benefits, ritualSteps, otoProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProduct = products[0];

  return (
    <div className="bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[520px] lg:min-h-[600px]">

          {/* Left — product visual */}
          <div className="w-full lg:w-1/2 xl:w-3/5 aspect-square lg:aspect-auto flex items-center justify-center relative bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff] overflow-hidden min-h-[320px] lg:min-h-0">
            <div className="absolute inset-0 grid-overlay" />
            <div className="absolute inset-0 glow-center" />
            {/* Subtle ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[360px] h-[280px] lg:h-[360px] border border-[rgba(124,58,237,0.12)] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] lg:w-[480px] h-[380px] lg:h-[480px] border border-[rgba(124,58,237,0.06)] rounded-full" />
            <div className="animate-float relative z-10">
              <span className="text-[160px] md:text-[200px] lg:text-[240px] xl:text-[280px] leading-none select-none">🧊</span>
            </div>
          </div>

          {/* Right — product info */}
          <div className="w-full lg:w-1/2 xl:w-2/5 px-6 py-10 md:px-10 lg:px-14 xl:px-16 bg-white flex flex-col justify-center">
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="badge">Cold Therapy</span>
              <span className="badge badge-gold">🔥 Limited Stock</span>
              <span className="badge badge-red">Only 17 Left</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-light leading-[1.1] text-[#0f0a1e] mb-2">
              ARA Ice Bowl
            </h1>
            <p className="text-[#6b7280] text-sm md:text-base tracking-wide mb-5">
              The Last Ice Bowl You&apos;ll Ever Argue About
            </p>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[#c9a96e] tracking-wider text-sm">★★★★★</span>
              <span className="font-mono text-xs text-[#6b7280]">4.9</span>
              <span className="w-px h-4 bg-[rgba(124,58,237,0.15)]" />
              <span className="font-mono text-xs text-[#6b7280]">847 reviews</span>
              <span className="w-px h-4 bg-[rgba(124,58,237,0.15)]" />
              <span className="text-xs text-[#7c3aed] font-medium">✓ Verified</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif text-4xl md:text-5xl font-light text-[#0f0a1e]">₹1,499</span>
              <span className="text-lg text-[#9ca3af] line-through">₹1,999</span>
              <span className="badge badge-purple text-[10px]">Save ₹500</span>
            </div>
            <p className="text-xs text-[#9ca3af] mb-7">Inclusive of all taxes · Free shipping</p>

            <div className="flex flex-col sm:flex-row gap-3 lg:max-w-sm">
              <Link
                href={`/products/${featuredProduct.slug}`}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                View Product
                <ArrowRight size={14} />
              </Link>
              <Link href="/products" className="btn-secondary flex-1 text-center">
                Shop All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Owns This ────────────────────────────────────────────────── */}
      <section className="bg-[#faf8ff]">
        <div className="section">
          <div className="max-w-3xl mb-10">
            <div className="eyebrow mb-4">The Owner&apos;s Profile</div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#0f0a1e] mb-4">
              This isn&apos;t for everyone.<br />
              <em className="italic text-[#7c3aed]">That&apos;s the point.</em>
            </h2>
            <p className="text-sm md:text-base text-[#6b7280] leading-relaxed max-w-2xl">
              ARA doesn&apos;t compete for shelf space with your 12-step routine. It either becomes the
              first thing you do every morning — or it doesn&apos;t belong in your life.
              <br /><br />
              <strong className="text-[#0f0a1e] font-medium">Here&apos;s who it belongs to.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#7c3aed] to-[#a78bfa] rounded-t-xl" />
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#7c3aed] mb-3">The Performer</div>
              <h4 className="font-serif text-lg md:text-xl font-medium text-[#0f0a1e] mb-2">
                She doesn&apos;t have time for complicated.
              </h4>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                Six meetings before noon. Skincare needs to work before she&apos;s fully awake. She doesn&apos;t
                want five steps. She wants one that does the job of three.
              </p>
              <div className="text-sm text-[#0f0a1e] border-t border-[rgba(124,58,237,0.1)] pt-4">
                15 seconds in ARA. Serum after. Done.
                <span className="block text-xs text-[#6b7280] mt-1">Her skin looks ready before her coffee is.</span>
              </div>
            </div>

            <div className="card p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#7c3aed] to-[#a78bfa] rounded-t-xl" />
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#7c3aed] mb-3">The Biohacker</div>
              <h4 className="font-serif text-lg md:text-xl font-medium text-[#0f0a1e] mb-2">
                He&apos;s already read the research.
              </h4>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                Wim Hof. Huberman. Cold exposure protocols on his calendar every morning. He knows the
                science. He&apos;s been doing it with a kitchen bowl for two years.
              </p>
              <div className="text-sm text-[#0f0a1e] border-t border-[rgba(124,58,237,0.1)] pt-4">
                ARA is the tool his protocol always deserved.
                <span className="block text-xs text-[#6b7280] mt-1">The kitchen bowl never belonged in a serious ritual.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Ritual ───────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="section">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">The Method</div>
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#0f0a1e] mb-8">
              60 seconds.<br />
              <em className="italic text-[#7c3aed]">No serum does this.</em>
            </h2>
            <div className="space-y-0">
              {ritualSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className={`flex gap-5 py-6 ${idx < ritualSteps.length - 1 ? "border-b border-[rgba(124,58,237,0.08)]" : ""}`}
                >
                  <span className="font-mono text-xs text-[#7c3aed] font-semibold pt-0.5 w-7 flex-shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f0a1e] mb-1.5">{step.title}</h4>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Science ──────────────────────────────────────────────────── */}
      <section className="bg-[#faf8ff]">
        <div className="section">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">The Science</div>
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#0f0a1e] mb-8">
              What cold actually does<br />
              <em className="italic text-[#7c3aed]">to your face.</em>
            </h2>
            <div className="space-y-0">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex gap-5 py-5 ${index < benefits.length - 1 ? "border-b border-[rgba(124,58,237,0.08)]" : ""}`}
                >
                  <span className="text-xl w-8 flex-shrink-0 mt-0.5 text-center">{benefit.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f0a1e] mb-1">{benefit.title}</h4>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="section">
          <div className="eyebrow mb-4">The Verdict From Others</div>
          <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#0f0a1e] mb-8">
            They tried arguing.<br />
            <em className="italic text-[#7c3aed]">Then ordered a second one.</em>
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
                    <span className="inline-block mt-2 font-mono text-[9px] tracking-[0.1em] uppercase text-[#7c3aed] bg-[#f5f3ff] border border-[rgba(124,58,237,0.2)] py-0.5 px-2 rounded-full">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One-Time Offer ───────────────────────────────────────────────── */}
      <section className="bg-linear-to-b from-[#f5f3ff] via-[#faf8ff] to-[#f5f3ff]">
        <div className="section">
          {/* OTO label */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-[rgba(124,58,237,0.3)]" />
            <div className="flex items-center gap-2 bg-[#7c3aed] text-white font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
              <Zap size={11} />
              One-Time Offer
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-[rgba(124,58,237,0.3)]" />
          </div>

          <div className="max-w-2xl mb-8">
            <div className="eyebrow mb-4">Ritual Enhancers</div>
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#0f0a1e] mb-3">
              Upgrade your ice bowl.<br />
              <em className="italic text-[#7c3aed]">This offer disappears at checkout.</em>
            </h2>
            <p className="text-sm text-[#6b7280] max-w-xl leading-relaxed">
              Natural powder infusions — dissolve in your ARA bowl water before dipping. Each one changes
              what cold therapy does to your skin. Available at this price only right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {otoProducts.map((product) => {
              const savings = product.originalPrice - product.price;
              const discountPct = Math.round((savings / product.originalPrice) * 100);
              return (
                <div key={product.id} className="card p-5 flex flex-col relative overflow-hidden">
                  {/* Purple top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#7c3aed] to-[#a78bfa] rounded-t-xl" />
                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 bg-[#7c3aed] text-white font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-full">
                    {discountPct}% OFF
                  </div>

                  <div className="w-13 h-13 bg-[#f5f3ff] border border-[rgba(124,58,237,0.12)] rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                    {product.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-[#0f0a1e] mb-2 leading-snug pr-8">
                    {product.name}
                  </h4>
                  <p className="text-[12px] text-[#6b7280] leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                      <span className="font-semibold text-lg text-[#0f0a1e]">₹{product.price}</span>
                      <span className="text-sm text-[#9ca3af] line-through">₹{product.originalPrice}</span>
                      <span className="badge badge-purple text-[9px]">Save ₹{savings}</span>
                    </div>
                    <Link href="/checkout" className="btn-primary w-full text-center text-[11px] py-2.5">
                      Claim Offer
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Products Grid ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="section">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="eyebrow mb-4">Our Products</div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#0f0a1e]">
                Shop the<br />
                <em className="italic text-[#7c3aed]">Cold Collection</em>
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#7c3aed] hover:text-[#5b21b6] font-medium transition-colors flex items-center gap-1.5"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="w-full bg-linear-to-br from-[#5b21b6] via-[#7c3aed] to-[#8b5cf6] py-16 md:py-24 lg:py-32 px-5 text-center relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <div className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 mb-5">
            ARA — Ice Bowl
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-3">
            You already know<br />
            <em className="italic text-white/80">what you&apos;re going to do.</em>
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            The only question is whether you keep scrolling past the skin you want — or order the bowl
            that gets you there.
          </p>
          <div className="font-serif text-5xl md:text-6xl font-light text-white mb-1">₹1,499</div>
          <p className="text-xs md:text-sm text-white/50 mb-8">
            Free shipping · 30-day returns · Only 17 units left
          </p>
          <Link
            href={`/products/${featuredProduct.slug}`}
            className="inline-block bg-white text-[#7c3aed] font-semibold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-xl hover:bg-white/90 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] w-full max-w-sm"
          >
            Order ARA Now — ₹1,499
          </Link>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mt-5">
            Secure checkout · Razorpay · Delivered in 3–5 days
          </p>
        </div>
      </section>

    </div>
  );
}
