import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  markers: false,
  toggleActions: 'play none none reverse'
});

// Configure GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
});

// Custom smooth scroll function
export const smoothScroll = (target: number | HTMLElement, duration = 1) => {
  if (typeof target === 'number') {
    gsap.to(window, {
      duration,
      scrollTo: { y: target, autoKill: true },
      ease: 'power3.inOut'
    });
  } else {
    gsap.to(window, {
      duration,
      scrollTo: { y: target, autoKill: true },
      ease: 'power3.inOut'
    });
  }
};

export { gsap, ScrollTrigger };