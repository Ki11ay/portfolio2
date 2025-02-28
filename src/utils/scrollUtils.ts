import { gsap } from '../plugins/gsap-register';

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  ease?: string;
}

export const scrollTo = (
  target: string | number | HTMLElement,
  options: ScrollToOptions = {}
) => {
  const {
    offset = 0,
    duration = 1,
    ease = 'power3.inOut'
  } = options;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Use instant scroll for users who prefer reduced motion
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo(0, targetPosition);
      }
    } else if (typeof target === 'number') {
      window.scrollTo(0, target);
    } else {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, targetPosition);
    }
    return;
  }

  // Use smooth animation for users who don't prefer reduced motion
  if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration,
        ease,
        scrollTo: {
          y: element,
          offsetY: offset,
          autoKill: true
        }
      });
    }
  } else if (typeof target === 'number') {
    gsap.to(window, {
      duration,
      ease,
      scrollTo: {
        y: target,
        autoKill: true
      }
    });
  } else {
    gsap.to(window, {
      duration,
      ease,
      scrollTo: {
        y: target,
        offsetY: offset,
        autoKill: true
      }
    });
  }
};

export const scrollToTop = (duration = 1) => {
  scrollTo(0, { duration });
};

export const scrollToSection = (sectionId: string, offset = 0) => {
  scrollTo(`#${sectionId}`, { offset });
};