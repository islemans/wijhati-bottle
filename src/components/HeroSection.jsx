import React from 'react';

export default function HeroSection() {
  return (
    <section id="hero" className="section-full relative flex items-center overflow-hidden text-white" style={{ pointerEvents: 'none' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(255,255,255,0.14),rgba(0,0,0,0)_30%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.42)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col px-8 pt-24 md:px-16 md:pt-0">
        <div className="animate-premium-fade max-w-[620px]" style={{ pointerEvents: 'auto' }}>
          <p className="mb-7 font-sans text-xs font-light uppercase tracking-[0.32em] text-white/50">
            Wijhati Smart Bottle
          </p>

          <h1
            className="text-5xl font-normal leading-[1.02] tracking-wide text-white/95 md:text-7xl lg:text-8xl"
            style={{
              fontFamily: 'var(--font-family-serif)',
              textShadow: '0 3px 28px rgba(0,0,0,0.38)',
            }}
          >
            Wijhati.
            <span className="mt-3 block font-normal text-white/72">The Future of Hydration.</span>
          </h1>

          <p className="mt-8 max-w-[520px] font-sans text-base font-extralight leading-8 tracking-wide text-white/58 md:text-lg">
            Seamlessly blending premium physical design with a smart digital ecosystem.
          </p>

          <div className="mt-14 grid max-w-[560px] grid-cols-3 gap-6 border-t border-white/10 pt-8 font-sans">
            {[
              { value: '24h', label: 'Thermal hold' },
              { value: '22°C', label: 'Touch display' },
              { value: 'App', label: 'Digital journey' },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p
                  className="text-2xl font-normal tracking-wide text-white/90 md:text-3xl"
                  style={{ fontFamily: 'var(--font-family-serif)' }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.66rem] font-light uppercase tracking-[0.24em] text-white/38">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="animate-premium-fade absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-white/35" style={{ pointerEvents: 'auto' }}>
        Scroll
      </div>
    </section>
  );
}
