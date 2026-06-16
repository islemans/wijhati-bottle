"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sparkle particle: tiny dot that flies outward from the heart on wishlist add.
function Sparkle({ angle, delay }: { angle: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const distance = 22 + Math.random() * 10;

  return (
    <motion.span
      className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
      style={{
        background:
          "radial-gradient(circle, #c9a96e 0%, #c9888a 100%)",
        marginLeft: "-3px",
        marginTop: "-3px",
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        scale: 0,
        opacity: 0,
      }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    />
  );
}

const SPARKLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

interface WishlistButtonProps {
  productId: string;
  initialWishlisted?: boolean;
}

export function WishlistButton({
  productId,
  initialWishlisted = false,
}: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [burst, setBurst] = useState(false);

  const toggle = () => {
    const next = !wishlisted;
    setWishlisted(next);
    if (next) {
      setBurst(true);
      setTimeout(() => setBurst(false), 700);
    }
    // TODO: call /api/wishlist with productId
  };

  return (
    <button
      onClick={toggle}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
    >
      {/* Sparkle burst — only rendered for one animation cycle */}
      <AnimatePresence>
        {burst &&
          SPARKLE_ANGLES.map((angle, i) => (
            <Sparkle key={angle} angle={angle} delay={i * 0.025} />
          ))}
      </AnimatePresence>

      {/* Heart icon */}
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="rose-gold-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#c9888a" />
          </linearGradient>
        </defs>

        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          animate={{
            fill: wishlisted ? "url(#rose-gold-fill)" : "transparent",
            stroke: wishlisted ? "url(#rose-gold-fill)" : "currentColor",
          }}
          initial={false}
          transition={{ duration: 0.25 }}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--brand-muted)" }}
        />
      </motion.svg>
    </button>
  );
}
