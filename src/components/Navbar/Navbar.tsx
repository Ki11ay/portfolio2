import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '../../plugins/gsap-register';
import { scrollToSection } from '../../utils/scrollUtils';
import { navItems, findActiveSection, getScrollProgress } from './utils';
import type { SectionId } from './utils';
import './styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const newActiveSection = findActiveSection(navItems, scrollPosition);
    setActiveSection(newActiveSection);
  }, []);

  const updateScrollProgress = useCallback(() => {
    if (!progressRef.current) return;
    
    const progress = getScrollProgress();
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.1,
      ease: 'none',
      overwrite: true
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        updateScrollProgress();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // Initial update
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateActiveSection, updateScrollProgress]);

  const handleNavClick = (id: SectionId) => {
    const navHeight = navRef.current?.offsetHeight ?? 0;
    scrollToSection(id, navHeight);
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} 
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-content">
        <button
          className={`menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="menu-icon"></span>
        </button>

        <div className="nav-links" role="menubar">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              role="menuitem"
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span className="nav-text">{item.label}</span>
              <span className="nav-indicator"></span>
            </button>
          ))}
        </div>

        <div className="nav-progress">
          <div 
            className="progress-bar" 
            ref={progressRef}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;