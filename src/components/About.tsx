import React, { useState, useEffect, useCallback } from 'react';
import './About.css';
import slideImage1 from '../assets/_MT_0194.jpeg';
import slideImage2 from '../assets/_MT_0204.jpeg';
import slideImage3 from '../assets/_MT_0221.jpeg';

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { src: slideImage1, alt: "Joel & Eunice - Moment romantique" },
    { src: slideImage2, alt: "Joel & Eunice - Portrait élégant" },
    { src: slideImage3, alt: "Joel & Eunice - Cérémonie" }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>Notre Histoire</h2>
          <p>Une belle aventure qui commence</p>
        </div>
        
        <div className="about-content">
          <div className="about-story">
            <div className="story-text">
              <p>
                Notre histoire a commencé de la manière la plus inattendue… lors d'un anniversaire. Nous ne savions pas encore que ce moment allait changer nos vies.
              </p>
              
              <p>
                Ce jour-là, entourés d'amis, nous nous sommes croisés pour la première fois sans savoir que leurs intention étaient de nous présenter l'un l'autre. Joël s'est alors proposé de me raccompagner chez moi, septique mais avec un humour spontané, je j'ai lancé :
              </p>
              
              <p className="quote">
                « Promets-moi juste de ne pas me kidnapper. »
              </p>
              
              <p>
                Un éclat de rire. Un regard complice. Et sans que nous le sachions, c'était le début de quelque chose de précieux.
              </p>
              
              <p>
                De cette rencontre est née une amitié profonde, sincère. Nous sommes rapidement devenu confidents, meilleurs amis, nous soutenons l'un l'autre.
                Ensemble, nous avons partagé des discussions sans fin, des rires, des moments simples et vrais.
                Puis, tout naturellement, cette amitié s'est transformée en amour.
              </p>
              
              <p>
                Aujourd'hui, après avoir construit pas à pas une relation solide et joyeuse, nous sommes sur le point de nous dire oui — un pas de plus dans cette belle aventure commencée presque par hasard… mais mis en place par le metteur en scène par excellence DIEU.
              </p>
            </div>
            
            <div className="story-gallery">
              <div className="slider-container">
                <div className="slider-wrapper">
                  <div 
                    className="slider-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slide, index) => (
                      <div key={index} className="slider-slide">
                        <img src={slide.src} alt={slide.alt} />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button className="slider-nav prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="slider-nav next" onClick={nextSlide}>
                  ›
                </button>
                
                {/* Dots indicator */}
                <div className="slider-dots">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Section Nos moments préférés */}
          <div className="favorite-moments">
            <div className="moments-header">
              <h3>Nos Moments Préférés</h3>
            </div>
            <div className="moments-content">
              <p>
                Entre les soirées cinéma, les moments de partage, les découvertes, les expériences et les moments précieux en famille nous savourons chaque instant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 