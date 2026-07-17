import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${shouldReduceMotion ? 'no-transition' : ''}`}>
        <div className="header-inner">
          <button
            className="site-logo"
            onClick={scrollToTop}
            aria-label="Blue Moon home"
          >
            BLUE MOON
          </button>

          {/* Desktop nav links */}
          <ul className="nav-links-desktop">
            <li>
              <button onClick={() => scrollToSection('experience')}>
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('food')}>Food</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('drinks')}>Drinks</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('evening')}>Evening</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('visit')}>Visit</button>
            </li>
            <li>
              <button
                className="nav-cta"
                onClick={() => scrollToSection('visit')}
              >
                Directions
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay - rendered outside header */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" onClick={() => setIsMobileMenuOpen(false)}>
          <nav
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu-nav"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => scrollToSection('experience')}>
              Experience
            </button>
            <button onClick={() => scrollToSection('food')}>Food</button>
            <button onClick={() => scrollToSection('drinks')}>Drinks</button>
            <button onClick={() => scrollToSection('evening')}>Evening</button>
            <button onClick={() => scrollToSection('visit')}>Visit</button>
            <button onClick={() => scrollToSection('visit')}>
              Directions
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
