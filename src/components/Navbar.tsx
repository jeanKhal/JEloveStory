import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { throttle, smoothScrollTo } from '../utils/performance';

const Navbar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const handleMenuLinkClick = useCallback(() => setIsMenuOpen(false), []);

  // Effet de scroll pour la navbar optimisé avec throttle
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour faire défiler vers la section hero optimisée
  const scrollToHero = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          smoothScrollTo(heroSection as HTMLElement, 80);
        }
      }, 100);
    } else {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        smoothScrollTo(heroSection as HTMLElement, 80);
      }
    }
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Fermer le menu avec la touche Echap
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={scrollToHero}>
          <div className="logo-text">
            <span className="logo-names">Joel & Eunice</span>
            <span className="logo-date">29.08.2025</span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={`hamburger${isMenuOpen ? ' active' : ''}`}></span>
        </div>

        {/* Menu Navigation */}
        <div
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
        >
          <Link to="/" className="nav-link" onClick={handleMenuLinkClick}>
            Accueil
          </Link>
          <Link to="/invitations" className="nav-link" onClick={handleMenuLinkClick}>
            Invitations
          </Link>
          <Link to="/galerie" className="nav-link" onClick={handleMenuLinkClick}>
            Galerie
          </Link>
          <Link to="/programme" className="nav-link" onClick={handleMenuLinkClick}>
            Programme
          </Link>
          <Link to="/rsvp" className="nav-link" onClick={handleMenuLinkClick}>
            RSVP
          </Link>
          <Link to="/contact" className="nav-link" onClick={handleMenuLinkClick}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;