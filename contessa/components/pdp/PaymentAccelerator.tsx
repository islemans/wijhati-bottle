"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentAcceleratorProps {
  productId: string;
  variantId?: string;
  price: number;
  productName: string;
  onAddToBag?: () => void;
}

type PaymentMethod = "apple_pay" | "card" | null;

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-auto" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-auto" fill="currentColor">
      <path d="M12 10.8v2.4h3.36c-.14.84-.54 1.55-1.14 2.03v1.68h1.84c1.08-.99 1.7-2.45 1.7-4.18 0-.4-.04-.78-.1-1.15H12zM12 19.2c2.16 0 3.98-.72 5.3-1.94l-1.84-1.68c-.72.48-1.64.76-2.66.76-2.04 0-3.77-1.38-4.39-3.22H5.73v1.74C7.04 17.46 9.36 19.2 12 19.2zM7.61 13.12c-.16-.48-.25-.98-.25-1.52s.09-1.04.25-1.52V8.34H5.73C5.26 9.26 5 10.3 5 11.6s.26 2.34.73 3.26l1.88-1.74zM12 6.6c1.14 0 2.17.39 2.97 1.16l1.65-1.65C15.48 4.92 13.86 4.2 12 4.2c-2.64 0-4.96 1.54-6.27 3.86L7.61 9.8C8.23 7.98 9.96 6.6 12 6.6z" />
    </svg>
  );
}

export function PaymentAccelerator({
  productId,
  variantId,
  price,
  productName,
  onAddToBag,
}: PaymentAcceleratorProps) {
  const [loading, setLoading] = useState<PaymentMethod>(null);
  const [added, setAdded] = useState(false);

  const handleFastPay = async (method: "apple_pay" | "card") => {
    setLoading(method);
    // TODO: integrate Stripe — apple_pay uses PaymentRequest API
    await new Promise((r) => setTimeout(r, 900));
    setLoading(null);
  };

  const handleAddToBag = () => {
    setAdded(true);
    onAddToBag?.();
    setTimeout(() => setAdded(false), 2200);
    // TODO: call /api/cart
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Express checkout row */}
      <div className="flex gap-3">
        {/* Apple Pay */}
        <motion.button
          onClick={() => handleFastPay("apple_pay")}
          disabled={!!loading}
          whileTap={{ scale: 0.97 }}
          className="relative flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-black py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
        >
          <AnimatePresence mode="wait">
            {loading === "apple_pay" ? (
              <motion.span
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <ApplePayIcon />
                Pay
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Google Pay */}
        <motion.button
          onClick={() => handleFastPay("card")}
          disabled={!!loading}
          whileTap={{ scale: 0.97 }}
          className="relative flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-xl)] border border-[var(--brand-border)] bg-white py-3.5 text-sm font-medium text-[var(--brand-foreground)] transition-colors hover:border-[var(--brand-muted)] disabled:opacity-60"
        >
          <AnimatePresence mode="wait">
            {loading === "card" ? (
              <motion.span
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-muted)]/30 border-t-[var(--brand-muted)]"
              />
            ) : (
              <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                <GooglePayIcon />
                Pay
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--brand-border)]" />
        <span className="text-xs text-[var(--brand-muted)]" style={{ fontFamily: "var(--font-sans)" }}>
          or
        </span>
        <div className="h-px flex-1 bg-[var(--brand-border)]" />
      </div>

      {/* Add to Bag — primary CTA */}
      <motion.button
        onClick={handleAddToBag}
        disabled={!!loading}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] py-4 text-sm font-medium tracking-wide transition-all disabled:opacity-60"
        style={{
          background: added
            ? "linear-gradient(135deg, var(--brand-gold), var(--brand-primary))"
            : "var(--brand-foreground)",
          color: "var(--brand-background)",
          boxShadow: added ? "var(--shadow-button-glow)" : "none",
        }}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Added to Bag
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Add to Bag — ${price.toFixed(2)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-5 pt-1">
        {[
          { icon: "🔒", label: "Secure checkout" },
          { icon: "✦", label: "Free returns" },
          { icon: "✦", label: "Ships in 1–2 days" },
        ].map(({ icon, label }) => (
          <span key={label} className="flex items-center gap-1 text-xs text-[var(--brand-muted)]" style={{ fontFamily: "var(--font-sans)" }}>
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
