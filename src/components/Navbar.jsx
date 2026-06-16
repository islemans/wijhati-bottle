import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenViewer }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 no-underline">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: 'var(--color-forest)',
            color: 'var(--color-sand)',
            letterSpacing: '0.05em',
          }}
        >
          و
        </div>
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-forest)' }}
        >
          Wijhati
        </span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {['Ecosystem', 'Features', 'Configure', 'Story'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium no-underline transition-colors duration-300"
            style={{ color: 'var(--color-forest)', opacity: 0.7 }}
            onMouseEnter={(e) => { e.target.style.opacity = '1'; e.target.style.color = 'var(--color-sand-dark)'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'var(--color-forest)'; }}
          >
            {item}
          </a>
        ))}
        <button
          onClick={onOpenViewer}
          style={{
            background: 'transparent',
            border: '1px solid rgba(194,168,120,0.3)',
            borderRadius: '60px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
            fontWeight: 600, fontSize: '0.8rem',
            color: 'var(--color-forest)',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(26,54,38,0.06)'; e.target.style.borderColor = 'rgba(194,168,120,0.5)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(194,168,120,0.3)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
          </svg>
          360° Viewer
        </button>
        <button className="cta-btn" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
          Pre-Order
        </button>
      </div>
    </nav>
  );
}
