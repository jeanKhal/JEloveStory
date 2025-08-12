import React from 'react';
import './Hero.css';
import Countdown from './Countdown';
// Image hero locale
const heroImage = '/images/1.jpeg';

const Hero: React.FC = () => {
  // Supprimer l'animation de visibilité pour améliorer les performances
  const isVisible = true;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section id="home" className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background">
        <img 
          src={heroImage} 
          alt="Joel & Eunice" 
          className="hero-image"
          loading="eager"
          decoding="async"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="names">Joel</span>
              <span className="and">&</span>
              <span className="names">Eunice</span>
            </h1>
            <p className="hero-subtitle">Se marient</p>
            <div className="hero-date">29 Août 2025</div>
            <div className="hero-location">Kinshasa, RDC</div>
            
            <Countdown />
          </div>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('rsvp')}
            >
              Confirmer ma présence
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('program')}
            >
              Voir le programme
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation elements removed */}
    </section>
  );
};

export default Hero; 