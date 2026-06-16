import React, { useRef, useEffect, useState } from 'react';

/**
 * Exploded-view section.
 * This is a tall scroll zone (300vh) that drives the explosion animation.
 * Glassmorphism label cards fade in at various scroll milestones.
 */

const LABELS = [
  {
    id: 'lid',
    title: 'Modular Top System',
    desc: 'Swap between Sip Lid, Gym Cap, Filter Cap, and Herb Infuser in seconds.',
    side: 'right',
    top: '12%',
    threshold: [0.1, 0.85],
  },
  {
    id: 'thermo',
    title: 'Digital LED Thermometer',
    desc: 'Integrated side-mount display. Always know your drink temperature at a glance.',
    side: 'right',
    top: '38%',
    threshold: [0.2, 0.8],
  },
  {
    id: 'body',
    title: '304 Stainless Steel',
    desc: 'Vacuum-insulated, powder-coated. 48h cold, 24h hot. Built to endure.',
    side: 'left',
    top: '42%',
    threshold: [0.25, 0.75],
  },
  {
    id: 'infuser',
    title: 'Herb Infuser Strainer',
    desc: 'Internal stainless mesh basket for tea, herbs, and fruit infusions.',
    side: 'left',
    top: '55%',
    threshold: [0.3, 0.7],
  },
  {
    id: 'grip',
    title: 'Ergonomic Grip',
    desc: 'Silicone grip bands with laser-etched QR code linking to your profile.',
    side: 'right',
    top: '60%',
    threshold: [0.3, 0.7],
  },
  {
    id: 'base',
    title: 'Modular Base System',
    desc: 'Magnetic compass, emergency storage, or standard cap. Twist and go.',
    side: 'left',
    top: '82%',
    threshold: [0.15, 0.85],
  },
];

export default function ExplodedSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const rawProgress = -rect.top / sectionHeight;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative"
      style={{ height: '300vh', pointerEvents: 'none' }}
    >
      {/* Section header (visible at start) */}
      <div
        className="sticky top-0 h-screen flex items-center"
        style={{ pointerEvents: 'none' }}
      >
        {/* Title fades in then out */}
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 text-center transition-all duration-700"
          style={{
            opacity: progress < 0.08 ? progress / 0.08 : progress > 0.25 ? Math.max(0, 1 - (progress - 0.25) / 0.1) : 1,
            transform: `translateX(-50%) translateY(${progress > 0.25 ? -20 : 0}px)`,
          }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-forest)' }}
          >
            Engineered <span className="text-gradient">Modularity</span>
          </h2>
          <p className="text-sm md:text-base" style={{ color: 'var(--color-forest)', opacity: 0.5 }}>
            Every component designed with purpose. Scroll to explore.
          </p>
        </div>

        {/* Label cards */}
        {LABELS.map((label) => {
          const [showAt, hideAt] = label.threshold;
          const visible = progress >= showAt && progress <= hideAt;
          const cardProgress = visible
            ? Math.min(1, (progress - showAt) / 0.08)
            : 0;

          return (
            <div
              key={label.id}
              className={`explode-label ${visible ? 'visible' : ''}`}
              style={{
                top: label.top,
                ...(label.side === 'left'
                  ? { left: '6%', textAlign: 'right' }
                  : { right: '6%', textAlign: 'left' }),
                maxWidth: '280px',
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <div className="glass-card-dark px-6 py-5" style={{ opacity: cardProgress }}>
                {/* Connector line */}
                <div
                  className="label-line mb-3"
                  style={{
                    width: `${cardProgress * 60}px`,
                    marginLeft: label.side === 'left' ? 'auto' : '0',
                  }}
                />
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-family-serif)' }}
                >
                  {label.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ opacity: 0.7, color: 'var(--color-cream)' }}>
                  {label.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* Progress indicator */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          style={{ pointerEvents: 'auto' }}
        >
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((p, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full transition-all duration-500"
              style={{
                height: Math.abs(progress - p) < 0.12 ? '20px' : '6px',
                background: Math.abs(progress - p) < 0.12 ? 'var(--color-sand)' : 'rgba(26, 54, 38, 0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
