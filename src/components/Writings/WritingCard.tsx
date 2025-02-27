import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMouseContext } from '../../context/MouseContext';
import type { WritingCardProps } from '../../types/writings';
import '../styles/WritingCard.css';

const WritingCard: React.FC<WritingCardProps> = ({
  title,
  excerpt,
  date,
  readTime,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      scale: 1.02,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });

    // Hover animations
    card.addEventListener('mouseenter', () => {
      cursorChangeHandler('hover');
      tl.play();
    });

    card.addEventListener('mouseleave', () => {
      cursorChangeHandler('');
      tl.reverse();
    });

    return () => {
      // Cleanup
      card.removeEventListener('mouseenter', () => tl.play());
      card.removeEventListener('mouseleave', () => tl.reverse());
      tl.kill();
    };
  }, [cursorChangeHandler]);

  return (
    <div 
      ref={cardRef}
      className="writing-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="writing-card-content">
        <h3 className="writing-title">{title}</h3>
        {excerpt && <p className="writing-excerpt">{excerpt}</p>}
        <div className="writing-meta">
          <span className="writing-date">{date}</span>
          <span className="writing-readtime">{readTime}</span>
        </div>
      </div>
      <div className="read-more">
        <span>Read More</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
};

export default WritingCard;
