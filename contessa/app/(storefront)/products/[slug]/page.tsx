import { notFound } from "next/navigation";
import { MediaGallery } from "@/components/pdp/MediaGallery";
import { ProductTabs } from "@/components/pdp/ProductTabs";
import { PaymentAccelerator } from "@/components/pdp/PaymentAccelerator";
import { WishlistButton } from "@/components/storefront/WishlistButton";
import type { Metadata } from "next";

// ── Placeholder — replace with prisma.product.findUnique({ where: { slug } }) ─
async function getProduct(slug: string) {
  return {
    id: "p1",
    name: "Velvet Lip Colour in Nocturne",
    slug,
    description:
      "A richly pigmented lip colour with a velvet-matte finish. Infused with jojoba oil and shea butter for all-day comfort without compromise. This shade — a deep, dusky berry with warm undertones — is our most requested colour of the season.",
    price: 42.0,
    comparePrice: undefined as number | undefined,
    category: "MAKEUP" as const,
    metadata: {
      ingredients: [
        "Ricinus Communis (Castor) Seed Oil",
        "Octyldodecanol",
        "Ozokerite",
        "Copernicia Cerifera (Carnauba) Wax",
        "Bis-Diglyceryl Polyacyladipate-2",
        "Shea Butter",
        "Jojoba Esters",
        "Tocopheryl Acetate",
        "Parfum",
      ],
    },
    howToUse:
      "Apply directly from the bullet starting at the centre of your upper lip, following the natural bow. Press lips together gently. For a sharper edge, outline first with our Precision Lip Liner in Nocturne.",
    images: [
      { url: "/images/products/lip-nocturne-1.jpg", alt: "Velvet Lip Colour — Nocturne, front" },
      { url: "/images/products/lip-nocturne-2.jpg", alt: "Velvet Lip Colour — Nocturne, open" },
      { url: "/images/products/lip-nocturne-3.jpg", alt: "Velvet Lip Colour — Nocturne, on model" },
      { url: "/images/products/lip-nocturne-4.jpg", alt: "Velvet Lip Colour — Nocturne, texture" },
    ],
    variants: [
      { id: "v1", label: "Nocturne", type: "SHADE" as const, value: "#4a2433", stock: 24 },
      { id: "v2", label: "Petal", type: "SHADE" as const, value: "#d4909a", stock: 12 },
      { id: "v3", label: "Ivory", type: "SHADE" as const, value: "#e8c8be", stock: 8 },
      { id: "v4", label: "Scarlet", type: "SHADE" as const, value: "#b53040", stock: 5 },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const ingredients =
    (product.metadata?.ingredients as string[]) ?? undefined;

  return (
    <main className="mx-auto max-w-screen-xl px-6 py-12">
      {/* Breadcrumb */}
      <nav
        className="mb-8 flex items-center gap-2 text-xs text-[var(--brand-muted)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <a href="/" className="hover:text-[var(--brand-foreground)]">Home</a>
        <span>/</span>
        <a href="/collections/makeup" className="hover:text-[var(--brand-foreground)]">Makeup</a>
        <span>/</span>
        <span className="text-[var(--brand-foreground)]">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1fr_480px]">
        {/* Left — media gallery */}
        <MediaGallery media={product.images} productName={product.name} />

        {/* Right — product info + purchase */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-xs uppercase tracking-widest text-[var(--brand-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {product.category}
              </p>
              <h1
                className="mt-1.5 text-3xl font-light leading-tight text-[var(--brand-foreground)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-lg font-medium text-[var(--brand-foreground)]">
                  ${product.price.toFixed(2)}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-[var(--brand-muted)] line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <WishlistButton productId={product.id} />
          </div>

          {/* Shade selector */}
          {product.variants.length > 0 && (
            <div>
              <p
                className="mb-3 text-xs uppercase tracking-widest text-[var(--brand-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Shade — <span className="text-[var(--brand-foreground)]">{product.variants[0].label}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    title={v.label}
                    className={`group relative h-8 w-8 rounded-full border-2 transition-all duration-150 hover:scale-110 ${
                      i === 0
                        ? "border-[var(--brand-foreground)]"
                        : "border-transparent hover:border-[var(--brand-muted)]"
                    }`}
                    style={{ backgroundColor: v.value }}
                  >
                    {v.stock <= 5 && v.stock > 0 && (
                      <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--brand-gold)]" title="Low stock" />
                    )}
                    {v.stock === 0 && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                        <span className="h-px w-4 rotate-45 bg-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Payment */}
          <PaymentAccelerator
            productId={product.id}
            price={product.price}
            productName={product.name}
          />

          {/* Tabs */}
          <ProductTabs
            description={product.description}
            category={product.category}
            ingredients={ingredients}
            howToUse={product.howToUse}
          />
        </div>
      </div>
    </main>
  );
}
