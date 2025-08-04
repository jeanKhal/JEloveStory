import React, { useState, useEffect } from 'react';
import './About.css';

// Import des images pour le slider
import slideImage1 from '../IMAGES/_MT_0194.jpeg';
import slideImage2 from '../IMAGES/_MT_0204.jpeg';
import slideImage3 from '../IMAGES/_MT_0221.jpeg';

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: slideImage1,
      alt: "Joel & Eunice - Moment romantique",
      title: "Comment tout a commencé",
      description: "Notre histoire a débuté il y a plusieurs années, lors d'une rencontre fortuite qui allait changer nos vies à jamais. Depuis ce jour, chaque moment passé ensemble nous a rapprochés un peu plus."
    },
    {
      id: 2,
      image: slideImage2,
      alt: "Joel & Eunice - Portrait élégant",
      title: "Nos moments préférés",
      description: "Des voyages ensemble, des rires partagés, des défis surmontés... Chaque expérience nous a permis de construire une relation solide basée sur l'amour, la confiance et le respect mutuel."
    },
    {
      id: 3,
      image: slideImage3,
      alt: "Joel & Eunice - Cérémonie",
      title: "Le grand jour",
      description: "Le 29 Août 2025, nous officialiserons notre amour devant nos familles et amis. Ce jour marquera le début d'une nouvelle aventure que nous sommes impatients de vivre ensemble."
    }
  ];

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>Notre Histoire</h2>
          <p>Une belle aventure qui commence</p>
        </div>
        
        <div className="about-content">
          {/* Slider de photos simplifié */}
          <div className="about-slider">
            <div className="slider-container">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className={`slide ${currentSlide === index ? 'active' : ''}`}
                >
                  <div className="slide-image">
                    <img src={slide.image} alt={slide.alt} />
                  </div>
                  <div className="slide-content">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Années ensemble</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Voyages partagés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Moment de bonheur</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 