/**
 * Mutable scroll store — written by GSAP ScrollTrigger, read by R3F useFrame.
 * Using a plain object avoids React re-renders for buttery-smooth 60fps animation.
 */
const scrollStore = {
  /** 0-1 progress through the exploded-view scroll zone */
  explodeProgress: 0,
  /** Which major section is active */
  activeSection: 'hero', // 'hero' | 'exploded' | 'configurator'
  /** Normalised mouse position (-1 to 1) for hero parallax */
  mouseX: 0,
  mouseY: 0,
};

export default scrollStore;
