import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleBrandClick = () => {
    scrollToSection('home');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-brand" onClick={handleBrandClick}>
          <h2>JOEL & EUNICE</h2>
        </div>
        
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="nav-link">Accueil</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">Notre Histoire</button>
          <button onClick={() => scrollToSection('dresscode')} className="nav-link">Dress Code</button>
          <button onClick={() => scrollToSection('gallery')} className="nav-link">Galerie</button>
          <button onClick={() => scrollToSection('rsvp')} className="nav-link">RSVP</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </div>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 