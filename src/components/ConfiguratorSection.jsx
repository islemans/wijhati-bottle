import React from 'react';

export default function ConfiguratorSection() {
  return (
    <section
      id="configure"
      className="section-full py-24"
      style={{ 
        pointerEvents: 'auto',
        background: 'rgba(26, 54, 38, 0.02)',
      }}
    >
      <div className="max-w-screen-xl mx-auto w-full px-8 md:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-forest)' }}
          >
            The <span className="text-gradient">Wijhati</span>
            <br />
            Engineered Perfection
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-forest)', opacity: 0.65, maxWidth: '600px', margin: '0 auto' }}>
            Vacuum-insulated 304 stainless steel. Modular components designed for every journey. Built for performance and durability.
          </p>
        </div>

        {/* Main Product Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left: Product Specs */}
          <div>
            <div className="space-y-6">
              <div className="border-l-2" style={{ borderColor: 'var(--color-sand)' }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-forest)' }}>
                  Specifications
                </h3>
                <div className="pl-6 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>Material</span>
                    <p className="text-lg font-semibold" style={{ color: 'var(--color-forest)' }}>304 Stainless Steel</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>Temperature Retention</span>
                    <p className="text-lg font-semibold" style={{ color: 'var(--color-forest)' }}>48h Cold / 24h Hot</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>Vacuum Insulation</span>
                    <p className="text-lg font-semibold" style={{ color: 'var(--color-forest)' }}>Premium Grade</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>Modular Modules</span>
                    <p className="text-lg font-semibold" style={{ color: 'var(--color-forest)' }}>5+ Configurations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features List */}
          <div>
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-3" style={{ color: 'var(--color-forest)' }}>
                  Top Module: Standard Sip Lid
                </h4>
                <p className="text-sm" style={{ opacity: 0.7 }}>
                  Ergonomic sip design with secure threading. Compatible with all base modules.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3" style={{ color: 'var(--color-forest)' }}>
                  Base Module: Standard Cap
                </h4>
                <p className="text-sm" style={{ opacity: 0.7 }}>
                  Magnetic base with threading system. Interchangeable with other module types.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3" style={{ color: 'var(--color-forest)' }}>
                  Ergonomic Grip
                </h4>
                <p className="text-sm" style={{ opacity: 0.7 }}>
                  Silicone grip bands with laser-etched QR code for your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🛡️', label: 'Durable', desc: '304 Stainless' },
            { icon: '❄️', label: 'Insulated', desc: '48h Cold' },
            { icon: '♻️', label: 'Modular', desc: '5+ Configs' },
            { icon: '🌍', label: 'Eco-Friendly', desc: 'Sustainable' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-4 text-center"
              style={{ borderTop: '2px solid var(--color-sand)' }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--color-forest)' }}>
                {feature.label}
              </h4>
              <p className="text-xs" style={{ opacity: 0.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="border-t-2" style={{ borderColor: 'rgba(26, 54, 38, 0.1)' }}>
          <div className="pt-12">
            <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--color-forest)' }}>
              Premium Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4" style={{ color: 'var(--color-sand)' }}>◆</div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                  Advanced Sealing
                </h4>
                <p className="text-sm" style={{ opacity: 0.6 }}>
                  Multi-layer seal prevents leaks and maintains temperature consistency.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4" style={{ color: 'var(--color-sand)' }}>●</div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                  Quick-Swap System
                </h4>
                <p className="text-sm" style={{ opacity: 0.6 }}>
                  Magnetic connectors allow instant module changes without tools.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4" style={{ color: 'var(--color-sand)' }}>■</div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                  Lifetime Quality
                </h4>
                <p className="text-sm" style={{ opacity: 0.6 }}>
                  Built to last. Premium materials with warranty coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
