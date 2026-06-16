"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  url: string;
  alt: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  productName: string;
}

export function MediaGallery({ media, productName }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const select = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const variants = {
    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      {/* Thumbnail strip — vertical on desktop, horizontal on mobile */}
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => select(i)}
            className={`relative h-16 w-16 flex-none overflow-hidden rounded-[var(--radius-lg)] border-2 transition-all duration-150 ${
              i === activeIndex
                ? "border-[var(--brand-primary)]"
                : "border-[var(--brand-border)] hover:border-[var(--brand-muted)]"
            }`}
          >
            <Image src={item.url} alt={item.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image — zoomable on hover */}
      <div
        className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden rounded-[var(--radius-xl)] bg-[var(--brand-surface)]"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        style={{ cursor: zoomed ? "zoom-in" : "zoom-in" }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="h-full w-full transition-transform duration-100"
              style={{
                transform: zoomed ? "scale(1.65)" : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            >
              <Image
                src={media[activeIndex].url}
                alt={media[activeIndex].alt || productName}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image counter pill */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/30 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          {activeIndex + 1} / {media.length}
        </div>
      </div>
    </div>
  );
}
