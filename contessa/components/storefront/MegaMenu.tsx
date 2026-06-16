"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface NavCategory {
  label: string;
  links: NavLink[];
  editorial: {
    image: string;
    caption: string;
    cta: string;
    href: string;
  };
}

// Glassmorphism mega-menu panel.
// Left side: grouped navigation links.
// Right side: editorial hero image with caption + CTA — keeps the menu
// feeling like editorial content, not a directory.
export function MegaMenu({ category }: { category: NavCategory }) {
  return (
    <motion.div
      className="absolute left-0 top-full z-50 w-[720px] overflow-hidden rounded-b-[var(--radius-xl)] rounded-tr-[var(--radius-xl)]"
      style={{
        background: "rgba(253, 250, 247, 0.82)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
        border: "1px solid rgba(201, 136, 138, 0.12)",
        boxShadow: "var(--shadow-menu-float)",
      }}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="grid grid-cols-[1fr_280px]">
        {/* Left — navigation links */}
        <div className="p-8">
          <p
            className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {category.label}
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {category.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-[var(--brand-foreground)] transition-colors hover:text-[var(--brand-primary)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span className="h-px w-3 bg-[var(--brand-primary)] opacity-0 transition-all duration-200 group-hover:w-5 group-hover:opacity-100" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — editorial image */}
        <div className="relative overflow-hidden">
          <Image
            src={category.editorial.image}
            alt={category.editorial.caption}
            fill
            className="object-cover"
          />
          {/* Gradient scrim so caption text is always legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p
              className="text-xs uppercase tracking-widest text-white/75"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {category.editorial.caption}
            </p>
            <Link
              href={category.editorial.href}
              className="mt-1 inline-block text-sm font-light text-white underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {category.editorial.cta} →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

const NAV: NavCategory[] = [
  {
    label: "Makeup",
    links: [
      { label: "Foundation & Concealer", href: "/collections/foundation" },
      { label: "Lip Colour", href: "/collections/lips" },
      { label: "Eyes & Lashes", href: "/collections/eyes" },
      { label: "Blush & Bronzer", href: "/collections/cheeks" },
      { label: "Setting & Primers", href: "/collections/setting" },
      { label: "New Arrivals", href: "/collections/new" },
    ],
    editorial: {
      image: "/images/editorial-makeup.jpg",
      caption: "The Velvet Edit",
      cta: "Shop the story",
      href: "/editorial/velvet-edit",
    },
  },
  {
    label: "Fashion",
    links: [
      { label: "Dresses & Gowns", href: "/collections/dresses" },
      { label: "Tailoring", href: "/collections/tailoring" },
      { label: "Knitwear", href: "/collections/knitwear" },
      { label: "Accessories", href: "/collections/accessories" },
      { label: "Shoes", href: "/collections/shoes" },
      { label: "Sale", href: "/collections/sale" },
    ],
    editorial: {
      image: "/images/editorial-fashion.jpg",
      caption: "Resort '25",
      cta: "Explore the collection",
      href: "/editorial/resort-25",
    },
  },
];

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  // Small delay before closing so the user can move the cursor to the panel.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const activeCategory = NAV.find((n) => n.label === activeMenu);

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-[var(--brand-border)]"
      style={{
        background: "rgba(253, 250, 247, 0.90)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contessa-full-logo.png"
            alt="Contessa"
            className="h-8 w-auto"
          />
        </Link>

        {/* Nav — mega-menu triggers */}
        <nav className="relative hidden items-center gap-8 md:flex" onMouseLeave={scheduleClose}>
          {NAV.map((category) => (
            <button
              key={category.label}
              onMouseEnter={() => open(category.label)}
              onFocus={() => open(category.label)}
              className="relative pb-0.5 text-sm font-light tracking-wide text-[var(--brand-foreground)] transition-colors hover:text-[var(--brand-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {category.label}
              {/* Active underline indicator */}
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-[var(--brand-primary)]"
                animate={{ width: activeMenu === category.label ? "100%" : "0%" }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}

          {/* Mega-menu panel */}
          <AnimatePresence>
            {activeCategory && (
              <div onMouseEnter={() => open(activeCategory.label)}>
                <MegaMenu category={activeCategory} />
              </div>
            )}
          </AnimatePresence>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            aria-label="Search"
            className="text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-foreground)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.15 10.15z" />
            </svg>
          </button>

          {/* Cart */}
          <Link href="/bag" aria-label="Shopping bag" className="relative text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-foreground)]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
