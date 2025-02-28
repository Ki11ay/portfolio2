import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  onlyOnce?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  onlyOnce = true
}: UseIntersectionObserverProps = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (onlyOnce && isVisible)) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [firstEntry] = entries;
        if (firstEntry && firstEntry.isIntersecting) {
          setIsVisible(true);
          if (onlyOnce && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!onlyOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, onlyOnce]);

  return { elementRef, isVisible };
};

export default useIntersectionObserver;