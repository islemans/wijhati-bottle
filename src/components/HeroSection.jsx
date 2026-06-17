import React from 'react';

export default function HeroSection() {
  return (
    <section id="hero" className="section-full relative flex items-center overflow-hidden text-white" style={{ pointerEvents: 'none' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(255,255,255,0.14),rgba(0,0,0,0)_30%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.42)_100%)]" />

      <div className="relative z-50 flex flex-col items-center justify-start pt-32 px-6 w-full min-h-[45vh] text-center pointer-events-none">

        {/* 1. The Brand Logo */}
        <div className="mb-6">
          <span className="text-2xl font-serif font-bold text-white tracking-widest uppercase">Wijhati</span>
        </div>

        {/* 2. The Main Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-lg">
          The Future of Hydration.
        </h1>

        {/* 3. The Subheadline */}
        <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-sm mb-8">
          Seamlessly blending premium physical design with a smart digital ecosystem.
        </p>

      </div>

      <div className="animate-premium-fade absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-white/35" style={{ pointerEvents: 'auto' }}>
        Scroll
      </div>
    </section>
  );
}
