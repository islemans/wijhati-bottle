import React, { useEffect, useState } from 'react';
import scrollStore from '../scrollStore';

const FINAL_FEATURES = [
  {
    title: 'Premium Inox Build',
    text: 'Rust-proof, shock-resistant stainless steel engineered to withstand extreme field conditions.',
  },
  {
    title: 'Built-in Navigation',
    text: 'Integrated precision compass supporting Qibla direction for seamless outdoor exploration.',
  },
  {
    title: 'Practical Silicone Strainer',
    text: 'A flexible, foldable design ensuring effortless storage and a hygienic drinking experience.',
  },
  {
    title: 'Smart Storage Space',
    text: 'A secure, built-in base compartment to safely carry medications and essentials on the go.',
  },
];

export default function ConfiguratorSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;

    const tick = () => {
      setProgress(scrollStore.finalProgress || 0);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const reveal = Math.min(Math.max((progress - 0.08) / 0.45, 0), 1);

  return (
    <section
      id="configure"
      className="section-full relative flex items-center overflow-hidden py-12 md:py-24 font-sans antialiased"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="absolute inset-0 z-40 backdrop-blur-xl bg-black/80 transition-all duration-1000"
        style={{ opacity: reveal }}
      />

      <div
        className="relative z-50 mx-auto w-full max-w-screen-xl px-8 md:px-16"
        style={{
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 26}px)`,
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}
      >
        <div className="animate-fade-in-up max-w-3xl">
          <p className="mb-5 text-xs font-light uppercase tracking-[0.34em] text-gray-400">
            Final Engineering Specification
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
            Designed for the journey.
            <span className="block font-light text-gray-300">Built for the field.</span>
          </h2>
        </div>

        <div className="mt-10 md:mt-16 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">
          {FINAL_FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className="animate-fade-in-up max-w-xl border-t border-white/10 pt-6"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white mb-1 md:mb-2 drop-shadow-md">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base font-light leading-relaxed text-gray-300">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
