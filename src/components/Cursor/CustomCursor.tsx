import React, { useEffect, useRef } from 'react';
import { useMouseContext } from '../../context/MouseContext';
import './styles/CustomCursor.css';

const CustomCursor: React.FC = () => {
  const mainCursor = useRef<HTMLDivElement>(null);
  const dotCursor = useRef<HTMLDivElement>(null);
  const { cursorType } = useMouseContext();

  useEffect(() => {
    if (!mainCursor.current || !dotCursor.current) return;

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (!mainCursor.current || !dotCursor.current) return;

        mainCursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        dotCursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (!mainCursor.current || !dotCursor.current) return;

    const { classList: mainClassList } = mainCursor.current;
    const { classList: dotClassList } = dotCursor.current;

    // Reset classes
    mainClassList.remove('hover', 'hidden', 'text');
    dotClassList.remove('hover', 'hidden', 'text');

    // Add new class based on cursor type
    if (cursorType) {
      mainClassList.add(cursorType);
      dotClassList.add(cursorType);
    }
  }, [cursorType]);

  // Only render on non-touch devices
  if (typeof window !== 'undefined' && 
      window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={mainCursor} className="custom-cursor main-cursor" aria-hidden="true">
        <span className="cursor-text"></span>
      </div>
      <div ref={dotCursor} className="custom-cursor dot-cursor" aria-hidden="true"></div>
    </>
  );
};

export default CustomCursor;
