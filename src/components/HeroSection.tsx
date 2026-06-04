import Link from "next/link";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Cold Therapy · Made in India
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl  sm:text-5xl lg:text-6xl font-black text-ink leading-[1.05] tracking-tight mb-6">
              The Morning Reset Your Skin Has Been{" "}
              <span className="text-brand">Waiting For</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed mb-8 max-w-md">
              A 60-second cold therapy ritual that tightens pores, eliminates
              puffiness, and supercharges every serum you use. No chemicals.
              No side effects. Results on day one.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/products/ara-ice-bowl"
                className="bg-brand text-white rounded-2xl px-8 py-3.5 font-semibold text-sm hover:bg-brand-hover transition-colors shadow-lg shadow-brand/30"
              >
                View Product →
              </Link>
              <Link
                href="/products"
                className="border border-edge rounded-2xl px-8 py-3.5 font-semibold text-sm text-ink-2 hover:border-brand hover:text-brand transition-colors"
              >
                Shop All
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-ink">4.9</span>
              <span className="text-sm text-ink-muted">847 verified reviews</span>
              <span className="text-ink-muted/40">·</span>
              <span className="text-sm text-ink-muted font-medium">
                Free shipping across India
              </span>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-edge bg-white shadow-[var(--card-shadow-hover)]">
              <div className="aspect-square relative">
                <video
                  src="https://res.cloudinary.com/dglcfblpp/video/upload/v1780519268/Landing_wxno68.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              

              {/* Floating Badge: Rating */}
              {/* <div className="absolute top-6 left-6 bg-white rounded-2xl px-4 py-3 shadow-lg border border-edge">
                <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-0.5">
                  Customer Rating
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-ink">4.9</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div> */}

              {/* Floating Badge: Limited Stock */}
              {/* <div className="absolute bottom-6 right-6 bg-brand text-white rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold opacity-80 mb-0.5">
                  Limited Stock
                </p>
                <p className="text-sm font-black">Only 17 left</p>
              </div> */}
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
