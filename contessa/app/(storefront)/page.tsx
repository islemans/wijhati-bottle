import { Header } from "@/components/storefront/MegaMenu";
import { ProductCard } from "@/components/storefront/ProductCard";

// ── Placeholder data — replace with prisma.product.findMany() ──────────────
const FEATURED_PRODUCTS = [
  {
    id: "p1",
    name: "Velvet Lip Colour in Nocturne",
    slug: "velvet-lip-nocturne",
    price: 42.0,
    comparePrice: undefined,
    image: "/images/products/lip-nocturne.jpg",
    category: "Makeup",
  },
  {
    id: "p2",
    name: "Seraphine Foundation — Ivory Bisque",
    slug: "seraphine-foundation-ivory-bisque",
    price: 78.0,
    comparePrice: 95.0,
    image: "/images/products/foundation-ivory.jpg",
    category: "Makeup",
  },
  {
    id: "p3",
    name: "Silk Crepe Midi Dress",
    slug: "silk-crepe-midi-dress",
    price: 390.0,
    comparePrice: undefined,
    image: "/images/products/dress-midi.jpg",
    category: "Fashion",
  },
  {
    id: "p4",
    name: "Rose Petal Blush Duo",
    slug: "rose-petal-blush-duo",
    price: 56.0,
    comparePrice: undefined,
    image: "/images/products/blush-duo.jpg",
    category: "Makeup",
  },
  {
    id: "p5",
    name: "Gold Leaf Eye Palette",
    slug: "gold-leaf-eye-palette",
    price: 68.0,
    comparePrice: undefined,
    image: "/images/products/eye-palette.jpg",
    category: "Makeup",
  },
  {
    id: "p6",
    name: "Cashmere Wrap Coat",
    slug: "cashmere-wrap-coat",
    price: 620.0,
    comparePrice: undefined,
    image: "/images/products/coat-cashmere.jpg",
    category: "Fashion",
  },
];

export default function StorefrontPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* ── Hero tagline ──────────────────────────────────────────────── */}
        <section className="mb-20 text-center">
          <p
            className="text-xs uppercase tracking-[0.25em] text-[var(--brand-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            New Season
          </p>
          <h1
            className="mt-3 text-5xl font-light leading-[1.15] tracking-tight text-[var(--brand-foreground)] md:text-7xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Dressed in Light.
            <br />
            <em>Born in Confidence.</em>
          </h1>
          <p
            className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-[var(--brand-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Curated makeup and high-end fashion for the woman who knows exactly
            who she is.
          </p>
        </section>

        {/* ── Breathable product grid ───────────────────────────────────── */}
        {/*
          CSS Grid: fluid columns via auto-fill + minmax so the grid is
          inherently responsive with no breakpoint hacks. gap-8 gives the
          "breathable" whitespace that anchors the luxury feel.
        */}
        <section>
          <div className="mb-8 flex items-baseline justify-between">
            <h2
              className="text-2xl font-light text-[var(--brand-foreground)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Featured Pieces
            </h2>
            <a
              href="/collections/all"
              className="text-xs uppercase tracking-widest text-[var(--brand-muted)] underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              View all
            </a>
          </div>

          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* ── "Complete the Look" editorial bundle ──────────────────────── */}
        <section className="mt-28">
          <div className="overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--brand-surface)]">
            <div className="grid md:grid-cols-[1fr_420px]">
              {/* Editorial image — full bleed */}
              <div className="aspect-[4/5] bg-[var(--brand-border)] md:aspect-auto">
                {/* Replace with <Image> once editorial photos are available */}
                <div className="h-full w-full bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-border)]" />
              </div>

              {/* Bundle products */}
              <div className="flex flex-col justify-center gap-8 p-10">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Complete the Look
                  </p>
                  <h2
                    className="mt-2 text-3xl font-light leading-snug text-[var(--brand-foreground)]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    The Golden Hour Edit
                  </h2>
                  <p
                    className="mt-3 text-sm font-light leading-relaxed text-[var(--brand-muted)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Everything worn in this editorial — curated for warmth,
                    luminosity, and effortless glamour.
                  </p>
                </div>

                {/* Bundle item list */}
                <ul className="flex flex-col gap-4">
                  {FEATURED_PRODUCTS.slice(0, 3).map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between border-b border-[var(--brand-border)] pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p
                          className="text-xs uppercase tracking-widest text-[var(--brand-muted)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {p.category}
                        </p>
                        <p
                          className="text-sm text-[var(--brand-foreground)]"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {p.name}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[var(--brand-foreground)]">
                        ${p.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full rounded-[var(--radius-xl)] bg-[var(--brand-foreground)] py-3.5 text-sm tracking-wide text-[var(--brand-background)] transition-all hover:bg-[var(--brand-primary)] hover:shadow-[var(--shadow-button-glow)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Add All to Bag
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
