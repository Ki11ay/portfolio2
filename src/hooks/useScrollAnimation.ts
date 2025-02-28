import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollAnimationConfig {
  y?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  config: ScrollAnimationConfig = {}
): RefObject<T> {
  const elementRef = useRef<T>(null);
  const animation = useRef<ReturnType<typeof gsap.to> | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      y = 50,
      opacity = 0,
      scale = 1,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
      start = 'top bottom-=100',
      end = 'top center',
      scrub = false,
      markers = false,
      once = true,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack
    } = config;

    try {
      // Initial state
      gsap.set(element, {
        y,
        opacity,
        scale
      });

      // Create animation
      const anim = gsap.to(element, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          markers,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
          invalidateOnRefresh: true
        }
      });

      animation.current = anim;

      // Cleanup
      return () => {
        if (animation.current) {
          animation.current.kill();
        }
      };
    } catch (error) {
      console.warn('ScrollAnimation setup failed:', error);
    }
  }, [config]);

  return elementRef;
}

interface ParallaxConfig {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  config: ParallaxConfig = {}
): RefObject<T> {
  const elementRef = useRef<T>(null);
  const animation = useRef<ReturnType<typeof gsap.to> | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      speed = 1,
      direction = 'vertical',
      reverse = false,
      start = 'top bottom',
      end = 'bottom top'
    } = config;

    try {
      const movement = direction === 'vertical' ? 'y' : 'x';
      const distance = 100 * speed * (reverse ? -1 : 1);

      const anim = gsap.to(element, {
        [movement]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true
        }
      });

      animation.current = anim;

      return () => {
        if (animation.current) {
          animation.current.kill();
        }
      };
    } catch (error) {
      console.warn('Parallax animation setup failed:', error);
    }
  }, [config]);

  return elementRef;
}

export default useScrollAnimation;