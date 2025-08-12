import React from 'react';
import './Hero.css';
import Countdown from './Countdown';
// Image hero avec Data URI
const heroImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY2QjZCIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPjE8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuOSI+SGVsbG88L3RleHQ+Cjwvc3ZnPgo=';

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