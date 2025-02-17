import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    if (!isHomePage) return;
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {isHomePage ? (
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
            MA
          </a>
        ) : (
          <Link to="/" className="logo">MA</Link>
        )}

        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {isHomePage ? (
            <>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className={activeSection === 'about' ? 'active' : ''}
              >
                About
              </a>
              <a 
                href="#tech" 
                onClick={(e) => handleNavClick(e, 'tech')}
                className={activeSection === 'tech' ? 'active' : ''}
              >
                Tech Stack
              </a>
              <a 
                href="#work" 
                onClick={(e) => handleNavClick(e, 'work')}
                className={activeSection === 'work' ? 'active' : ''}
              >
                Projects
              </a>
              <a 
                href="#career" 
                onClick={(e) => handleNavClick(e, 'career')}
                className={activeSection === 'career' ? 'active' : ''}
              >
                Career
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className={activeSection === 'contact' ? 'active' : ''}
              >
                Contact
              </a>
            </>
          ) : (
            <Link to="/" className="back-to-home">Back to Home</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
