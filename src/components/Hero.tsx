import React, { useState, useEffect } from 'react';
import './Hero.css';
const heroImage = '/images/1.jpeg';
import Countdown from './Countdown';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background">
        <img src={heroImage} alt="Joel & Eunice" className="hero-image" />
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
      
      <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero; 