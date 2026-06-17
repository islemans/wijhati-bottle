import React, { useRef, useEffect, useState } from 'react';

const TEXT_BLOCKS = [
  {
    id: 'cap',
    heading: 'Temperature at a Touch.',
    subtext: "Smart LED display. Always know exactly what you're drinking.",
    side: 'right',
    top: '22%',
    appearAt: 0.05,
    fadeAt: 0.35,
  },
  {
    id: 'body',
    heading: 'Military-Grade Inox.',
    subtext: 'Shock-resistant, rust-proof stainless steel built for extreme environments.',
    side: 'left',
    top: '42%',
    appearAt: 0.2,
    fadeAt: 0.65,
  },
  {
    id: 'base',
    heading: 'Hidden Essentials.',
    subtext: 'A secure, detachable smart base for medication and survival gear.',
    side: 'right',
    top: '66%',
    appearAt: 0.45,
    fadeAt: 0.9,
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
      <div
        className="sticky top-0 h-screen flex items-center"
        style={{ pointerEvents: 'none' }}
      >
        {TEXT_BLOCKS.map((block) => {
          const visible = progress >= block.appearAt && progress <= block.fadeAt;
          const blockProgress = visible
            ? Math.min(1, (progress - block.appearAt) / 0.08)
            : 0;

          return (
            <div
              key={block.id}
              className="absolute z-30 transition-all duration-700 ease-out bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/20 md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0"
              style={{
                top: block.top,
                ...(block.side === 'left'
                  ? { left: '6%' }
                  : { right: '6%' }),
                maxWidth: '380px',
                opacity: blockProgress,
                transform: `translateY(${(1 - blockProgress) * 32}px)`,
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#12261E] drop-shadow-md mb-1 md:mb-2">
                {block.heading}
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-light text-[#12261E]/80">
                {block.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
