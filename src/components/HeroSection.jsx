import React from 'react';

export default function HeroSection() {
  return (
    <section id="hero" className="section-full flex items-center justify-center" style={{ pointerEvents: 'none' }}>
      <div className="max-w-screen-xl mx-auto w-full px-8 md:px-16 flex flex-col md:flex-row items-center">
        {/* Left text column */}
        <div className="w-full md:w-5/12 pt-24 md:pt-0" style={{ pointerEvents: 'auto' }}>
          {/* Pre-title badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(26, 54, 38, 0.08)',
              color: 'var(--color-forest)',
              border: '1px solid rgba(26, 54, 38, 0.12)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-sand)' }} />
            Modular Hydration System
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-forest)' }}
          >
            Built for the{' '}
            <span className="text-gradient">Journey.</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-normal italic mt-2 block" style={{ opacity: 0.7 }}>
              Designed for the Wayfarer.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: 'var(--color-forest)', opacity: 0.6 }}
          >
            Vacuum-insulated 304 stainless steel. Swappable modules for every adventure.
            One bottle — infinite configurations.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="#features" className="cta-btn">
              Explore the Ecosystem
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#configure"
              className="text-sm font-medium no-underline transition-all duration-300"
              style={{ color: 'var(--color-forest)', opacity: 0.6, borderBottom: '1px solid transparent' }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; e.target.style.borderBottomColor = 'var(--color-sand)'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.6'; e.target.style.borderBottomColor = 'transparent'; }}
            >
              Configure Yours →
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: '1px solid rgba(26, 54, 38, 0.1)' }}>
            {[
              { value: '48h', label: 'Cold Retention' },
              { value: '24h', label: 'Hot Retention' },
              { value: '5+', label: 'Modules' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-sand-dark)' }}>
                  {stat.value}
                </div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--color-forest)', opacity: 0.45 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side is the 3D bottle (rendered by the fixed Canvas behind) */}
        <div className="w-full md:w-7/12" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator" style={{ pointerEvents: 'auto' }}>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-forest)', opacity: 0.4 }}>Scroll</span>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ opacity: 0.4 }}>
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="var(--color-forest)" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2" fill="var(--color-sand)">
            <animate attributeName="cy" values="9;18;9" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}
