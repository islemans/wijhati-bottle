import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollStore from './scrollStore';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExplodedSection from './components/ExplodedSection';
import ConfiguratorSection from './components/ConfiguratorSection';
import Footer from './components/Footer';
import BottleViewer from './components/BottleViewer';
import SceneErrorBoundary from './components/SceneErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showViewer, setShowViewer] = useState(false);
  const explodeTriggerRef = useRef(null);
  const configTriggerRef = useRef(null);

  /* ── Mouse tracking for hero parallax ── */
  useEffect(() => {
    const onMouseMove = (e) => {
      scrollStore.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollStore.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  /* ── GSAP ScrollTrigger setup ── */
  useEffect(() => {
    // Exploded view scroll trigger
    const explodeST = ScrollTrigger.create({
      trigger: '#features',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        scrollStore.explodeProgress = self.progress;
      },
      onEnter: () => { scrollStore.activeSection = 'exploded'; },
      onEnterBack: () => { scrollStore.activeSection = 'exploded'; },
      onLeaveBack: () => { scrollStore.activeSection = 'hero'; },
    });

    // Configurator section trigger
    const configST = ScrollTrigger.create({
      trigger: '#configure',
      start: 'top 60%',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        scrollStore.finalProgress = self.progress;
      },
      onEnter: () => { scrollStore.activeSection = 'configurator'; },
      onEnterBack: () => { scrollStore.activeSection = 'configurator'; },
      onLeaveBack: () => { scrollStore.activeSection = 'exploded'; },
    });

    return () => {
      explodeST.kill();
      configST.kill();
    };
  }, []);

  return (
    <>
      {showViewer ? (
        <BottleViewer onBack={() => setShowViewer(false)} />
      ) : (
        <>
          {/* Fixed 3D Scene */}
          <SceneErrorBoundary>
            <Scene3D />
          </SceneErrorBoundary>

          {/* Grain texture overlay */}
          <div className="grain-overlay" />

          {/* Scrollable HTML content */}
          <div className="content-layer">
            <Navbar onOpenViewer={() => setShowViewer(true)} />
            <HeroSection />
            <ExplodedSection />
            <ConfiguratorSection />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
