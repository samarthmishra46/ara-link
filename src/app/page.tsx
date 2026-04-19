import Link from "next/link";
import { products, reviews, benefits, ritualSteps } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { FomoSection, StockBar } from "@/components/AddOnSection";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProduct = products[0];

  return (
    <div className="bg-[#05080a] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Desktop: Side by side layout */}
        <div className="flex flex-col lg:flex-row lg:min-h-[600px] xl:min-h-[700px]">
          {/* Main Media */}
          <div className="w-full lg:w-1/2 xl:w-3/5 aspect-square lg:aspect-auto lg:min-h-[500px] max-h-[520px] lg:max-h-none flex items-center justify-center relative bg-gradient-to-br from-[#070d12] via-[#0a1520] to-[#060c10]">
            <div className="absolute inset-0 grid-overlay" />
            <div className="absolute inset-0 glow-center" />
            
            {/* Ripple rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[350px] h-[280px] lg:h-[350px] border border-[rgba(184,223,232,0.08)] rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] border border-[rgba(184,223,232,0.08)] rounded-full animate-ping opacity-10" style={{ animationDuration: '4s', animationDelay: '1.4s' }} />
            
            {/* Product */}
            <div className="animate-float">
              <span className="text-[180px] md:text-[220px] lg:text-[260px] xl:text-[300px]">🧊</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 xl:w-2/5 p-6 md:p-10 lg:p-14 xl:p-18 bg-[#05080a] flex flex-col justify-center">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="badge">Cold Therapy</span>
              <span className="badge badge-gold">🔥 Limited Stock</span>
              <span className="badge badge-red">Only 17 Left</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#edeae4] mb-2">
              ARA Ice Bowl
            </h1>
            <p className="text-[#5a6670] text-sm md:text-base tracking-wide mb-5">
              The Last Ice Bowl You&apos;ll Ever Argue About
            </p>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[#c9a96e] tracking-wider">★★★★★</span>
              <span className="font-mono text-xs text-[#5a6670]">4.9</span>
              <span className="w-px h-4 bg-[rgba(184,223,232,0.14)]" />
              <span className="font-mono text-xs text-[#5a6670]">847 reviews</span>
              <span className="w-px h-4 bg-[rgba(184,223,232,0.14)]" />
              <span className="text-xs text-[#6aafbf]">✓ Verified</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="font-serif text-4xl md:text-5xl font-light text-[#edeae4]">₹1,499</span>
              <span className="text-lg md:text-xl text-[#3a4550] line-through">₹1,999</span>
              <span className="badge badge-ice text-[10px]">Save ₹500</span>
            </div>
            <p className="text-xs md:text-sm text-[#5a6670] mb-6">Inclusive of all taxes · Free shipping</p>

            <div className="flex flex-col sm:flex-row gap-3 lg:max-w-md">
              <Link 
                href={`/products/${featuredProduct.slug}`}
                className="btn-primary w-full sm:flex-1 text-center flex items-center justify-center gap-2"
              >
                View Product
                <ArrowRight size={14} />
              </Link>
              <Link 
                href="/products"
                className="btn-secondary w-full sm:flex-1 text-center"
              >
                Shop All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FomoSection />
      <StockBar stock={17} total={100} />

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Who Owns This */}
      <section className="section">
        <div className="max-w-4xl">
          <div className="eyebrow mb-5">The Owner&apos;s Profile</div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#edeae4] mb-4">
            This isn&apos;t for everyone.<br />
            <em className="italic text-[#b8dfe8]">That&apos;s the point.</em>
          </h2>
          <p className="text-sm md:text-base text-[#5a6670] leading-relaxed mb-8 max-w-2xl">
            ARA doesn&apos;t compete for shelf space with your 12-step routine. It either becomes the first thing you do every morning — or it doesn&apos;t belong in your life.
            <br /><br />
            <strong className="text-[#edeae4] font-normal">Here&apos;s who it belongs to.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6aafbf] to-transparent" />
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6aafbf] mb-3">The Performer</div>
            <h4 className="font-serif text-lg md:text-xl font-light text-[#edeae4] mb-2">She doesn&apos;t have time for complicated.</h4>
            <p className="text-xs md:text-sm text-[#5a6670] leading-relaxed mb-4">
              Six meetings before noon. Skincare needs to work before she&apos;s fully awake. She doesn&apos;t want five steps. She wants one that does the job of three.
            </p>
            <div className="text-xs md:text-sm text-[#edeae4] border-t border-[rgba(184,223,232,0.07)] pt-3">
              15 seconds in ARA. Serum after. Done.
              <span className="block text-[11px] text-[#5a6670] mt-1">Her skin looks ready before her coffee is.</span>
            </div>
          </div>

          <div className="card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6aafbf] to-transparent" />
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6aafbf] mb-3">The Biohacker</div>
            <h4 className="font-serif text-lg md:text-xl font-light text-[#edeae4] mb-2">He&apos;s already read the research.</h4>
            <p className="text-xs md:text-sm text-[#5a6670] leading-relaxed mb-4">
              Wim Hof. Huberman. Cold exposure protocols on his calendar every morning. He knows the science. He&apos;s been doing it with a kitchen bowl for two years.
            </p>
            <div className="text-xs md:text-sm text-[#edeae4] border-t border-[rgba(184,223,232,0.07)] pt-3">
              ARA is the tool his protocol always deserved.
              <span className="block text-[11px] text-[#5a6670] mt-1">The kitchen bowl never belonged in a serious ritual.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* The Ritual */}
      <section className="section">
        <div className="eyebrow mb-5">The Method</div>
        <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#edeae4] mb-8">
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

      {/* Science */}
      <section className="section">
        <div className="eyebrow mb-5">The Science</div>
        <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#edeae4] mb-8">
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
        <div className="eyebrow mb-5">The Verdict From Others</div>
        <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#edeae4] mb-8">
          They tried arguing.<br />
          <em className="italic text-[#b8dfe8]">Then ordered a second one.</em>
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

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Products */}
      <section className="section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-5">Our Products</div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#edeae4]">
              Shop the<br />
              <em className="italic text-[#b8dfe8]">Cold Collection</em>
            </h2>
          </div>
          <Link 
            href="/products" 
            className="text-sm text-[#6aafbf] hover:text-[#b8dfe8] transition-colors flex items-center gap-2"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="h-px bg-[rgba(184,223,232,0.07)]" />

      {/* Final CTA */}
      <section className="py-14 md:py-20 lg:py-28 px-5 md:px-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #05080a 0%, #080f15 50%, #05080a 100%)' }}>
        <div className="absolute inset-0 glow-center" />
        <div className="relative max-w-2xl mx-auto">
          <div className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-5">ARA — Ice Bowl</div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#edeae4] mb-3">
            You already know<br />
            <em className="italic text-[#b8dfe8]">what you&apos;re going to do.</em>
          </h2>
          <p className="text-sm md:text-base text-[#5a6670] max-w-md mx-auto mb-8 leading-relaxed">
            The only question is whether you keep scrolling past the skin you want — or order the bowl that gets you there.
          </p>
          <div className="font-serif text-5xl md:text-6xl font-light text-[#edeae4] mb-1">₹1,499</div>
          <p className="text-xs md:text-sm text-[#5a6670] mb-7">Free shipping · 30-day returns · Only 17 units left</p>
          <Link 
            href={`/products/${featuredProduct.slug}`}
            className="btn-primary inline-block w-full max-w-sm"
          >
            Order ARA Now — ₹1,499
          </Link>
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#5a6670] mt-4">
            Secure checkout · Razorpay · Delivered in 3–5 days
          </p>
        </div>
      </section>
    </div>
  );
}
