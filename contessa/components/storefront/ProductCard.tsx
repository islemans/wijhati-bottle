"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WishlistButton } from "./WishlistButton";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  wishlisted?: boolean;
}

// "Drop into bag" animation: the product thumbnail shrinks and flies toward
// the cart icon in the top-right. We approximate the arc with a translate.
function BagDropAnimation({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="pointer-events-none fixed right-8 top-4 z-50 h-10 w-10 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0.3, x: 40, y: -40 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="h-full w-full bg-[var(--brand-primary)] opacity-60 rounded-xl" />
    </motion.div>
  );
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  image,
  category,
  wishlisted,
}: ProductCardProps) {
  const [dropping, setDropping] = useState(false);

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropping(true);
    // TODO: call /api/cart to add item
  };

  const isOnSale = comparePrice && comparePrice > price;

  return (
    <motion.article
      className="group relative flex flex-col rounded-[var(--radius-xl)] bg-[var(--brand-surface)] overflow-hidden"
      whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Wishlist — top-right overlay */}
      <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <WishlistButton productId={id} initialWishlisted={wishlisted} />
      </div>

      {/* Product image */}
      <Link href={`/products/${slug}`} className="block aspect-[3/4] overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
          />
        </motion.div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--brand-muted)]">
            {category}
          </p>
          <Link href={`/products/${slug}`}>
            <h3
              className="mt-0.5 text-base leading-snug text-[var(--brand-foreground)] transition-colors hover:text-[var(--brand-primary)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-[var(--brand-foreground)]">
              ${price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-xs text-[var(--brand-muted)] line-through">
                ${comparePrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Bag */}
          <motion.button
            onClick={handleAddToBag}
            className="rounded-[var(--radius-lg)] bg-[var(--brand-foreground)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[var(--brand-background)] transition-colors hover:bg-[var(--brand-primary)]"
            whileTap={{ scale: 0.94 }}
          >
            Add to Bag
          </motion.button>
        </div>
      </div>

      {/* Digital unboxing drop animation */}
      <AnimatePresence>
        {dropping && (
          <BagDropAnimation onComplete={() => setDropping(false)} />
        )}
      </AnimatePresence>
    </motion.article>
  );
}
