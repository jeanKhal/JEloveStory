import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import CountdownTimer from './CountdownTimer';
import './CountdownTimer.css';
import OptimizedImage from './OptimizedImage';
import './OptimizedImage.css';
import { optimizeImageLoading, preloadCriticalImages } from '../utils/imageOptimization';
import image1 from '../images/1.jpeg';
import image2 from '../images/_MT_0042.jpeg';
import image3 from '../images/_MT_0117.jpeg';
import image4 from '../images/_MT_0125.jpeg';
import image5 from '../images/_MT_0194.jpeg';
import image6 from '../images/_MT_0204.jpeg';
import image7 from '../images/_MT_0221.jpeg';
import image8 from '../images/_MT_0236.jpeg';
import image9 from '../images/_MT_0021.jpeg';
import image10 from '../images/_MT_0251.jpeg';
import image11 from '../images/_MT_0320.jpeg';
import image12 from '../images/_MT_0326.jpeg';
import image13 from '../images/_MT_0336.jpeg';
import image14 from '../images/_MT_0357.jpeg';
import image15 from '../images/_MT_0389.jpeg';
import image16 from '../images/_MT_0575.jpeg';
import image17 from '../images/_MT_0581.jpeg';
import image18 from '../images/_MT_0584.jpeg';
import image19 from '../images/_MT_0592.jpeg';
import image20 from '../images/_MT_0602.jpeg';
import image21 from '../images/_MT_0606.jpeg';
import image22 from '../images/_MT_0647.jpeg';
import image23 from '../images/_MT_9965.jpeg';

const HomePage: React.FC = React.memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Mémoriser les images pour éviter les re-renders - Réduit à 2 images pour les performances
  const heroImages = useMemo(() => [image1, image2], []);

  // Date du mariage (29 août 2025) - mémorisé
  const weddingDate = useMemo(() => new Date('2025-08-29T14:00:00'), []);

  // Rotation automatique des images optimisée - Désactivée pour les performances
  useEffect(() => {
    // Désactivé temporairement pour améliorer les performances
    // const interval = setInterval(() => {
    //   setFade(false);
    //   setTimeout(() => {
    //     setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    //     setFade(true);
    //   }, 300);
    // }, 8000); // Augmenté à 8 secondes

    // return () => clearInterval(interval);
  }, [heroImages.length]);

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50); // Réduit de 100ms à 50ms
    return () => clearTimeout(timer);
  }, []);

  // Optimisation du chargement des images
  useEffect(() => {
    const allImages = [
      image1, image2, image3, image4, image5, image6, image7, image8,
      image9, image10, image11, image12, image13, image14, image15, image16,
      image17, image18, image19, image20, image21, image22, image23
    ];
    
    // Précharger les images critiques en premier
    preloadCriticalImages(allImages).then(() => {
      console.log('Images critiques préchargées');
    });
    
    // Optimiser le chargement de toutes les images
    optimizeImageLoading(allImages);
  }, []);

  // Optimiser la fonction de scroll
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Mémoriser les actions rapides
  const quickActions = useMemo(() => [
    {
      to: '/invitations',
      icon: '💌',
      title: 'Générer Invitation',
      description: 'Créez votre invitation personnalisée'
    },
    {
      to: '/programme',
      icon: '📅',
      title: 'Programme',
      description: 'Découvrez le déroulé de la journée'
    },
    {
      to: '/galerie',
      icon: '📸',
      title: 'Galerie',
      description: 'Revivez nos moments précieux'
    },
    {
      to: '/rsvp',
      icon: '✅',
      title: 'RSVP',
      description: 'Confirmez votre présence'
    }
  ], []);

  // Photos pour le déroulement
  const timelinePhotos = useMemo(() => [
    { image: image1, time: '14h00', title: 'Cérémonie Religieuse', description: 'Église Saint-Pierre' },
    { image: image2, time: '15h30', title: 'Cocktail', description: 'Jardin de l\'église' },
    { image: image3, time: '18h00', title: 'Réception', description: 'Château de Versailles' },
    { image: image4, time: '19h00', title: 'Dîner', description: 'Salle des fêtes' },
    { image: image5, time: '21h00', title: 'Première Danse', description: 'Ouverture du bal' },
    { image: image6, time: '22h00', title: 'Soirée Dansante', description: 'Ambiance festive' },
    { image: image7, time: '00h00', title: 'Gâteau de Mariage', description: 'Cérémonie du gâteau' },
    { image: image8, time: '02h00', title: 'Fin de Soirée', description: 'Au revoir et merci' },
    { image: image9, time: '14h30', title: 'Échange des Vœux', description: 'Moment solennel' },
    { image: image10, time: '16h00', title: 'Photos de Groupe', description: 'Souvenirs immortels' },
    { image: image11, time: '18h30', title: 'Entrée des Mariés', description: 'Accueil festif' },
    { image: image12, time: '20h00', title: 'Discours', description: 'Mots d\'amour' },
    { image: image13, time: '21h30', title: 'Ouverture du Bal', description: 'Première danse' },
    { image: image14, time: '23h00', title: 'Ambiance Festive', description: 'Danse et joie' },
    { image: image15, time: '01h00', title: 'Lancer du Bouquet', description: 'Traditions' },
    { image: image16, time: '01h30', title: 'Dernière Danse', description: 'Moment romantique' }
  ], []);

  return (
    <div className={`homepage ${isVisible ? 'animate-fade-in' : ''}`}>
      {/* Section Hero - Countdown uniquement */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src={heroImages[currentImageIndex]}
            alt="Couple de mariés"
            className={`hero-image ${fade ? 'fade-in' : 'fade-out'}`}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="names">Joel & Eunice</span>
            <span className="date">29 Août 2025</span>
          </h1>
          <p className="hero-subtitle">Nous nous marions !</p>
          <CountdownTimer targetDate={weddingDate} />
        </div>

        <div className="scroll-indicator animate-bounce">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Section Notre Histoire */}
      <section id="our-story" className="story-section">
        <div className="container">
          <h2 className="section-title animate-slide-in-left">Notre Histoire</h2>
          <div className="story-content">
            <div className="story-text animate-slide-in-left">
              <p>
                Nous nous sommes rencontrés il y a 5 ans lors d&apos;un événement professionnel.
                Ce qui a commencé par une simple conversation s&apos;est transformé en une belle
                histoire d&apos;amour qui nous mène aujourd&apos;hui vers le mariage.
              </p>
              <p>
                Après des années de bonheur partagé, d&apos;aventures et de découvertes mutuelles,
                nous avons décidé de nous unir pour la vie. Nous sommes impatients de célébrer
                ce moment spécial avec nos familles et amis.
              </p>
            </div>
            <div className="story-image animate-slide-in-right">
              <img 
                src={image2} 
                alt="Notre histoire" 
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Section Déroulement avec Photos */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title text-center">Déroulement de la Journée</h2>
          <div className="timeline">
            {timelinePhotos.map((item, index) => (
              <div key={`timeline-item-${item.title.replace(/\s+/g, '-')}-${index}`} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                                  <div className="timeline-photo">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading={index < 4 ? "eager" : "lazy"}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain',
                      display: 'block',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                  <div className="timeline-info">
                    <div className="timeline-time">{item.time}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Actions Rapides */}
      <section className="quick-actions-section">
        <div className="container">
          <h2 className="section-title text-center">Préparez-vous pour le Grand Jour</h2>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <Link
                key={action.to}
                to={action.to}
                className="action-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Lieu */}
      <section className="venue-section">
        <div className="container">
          <div className="venue-content">
            <div className="venue-info animate-slide-in-left">
              <h2>Le Lieu de la Célébration</h2>
              <div className="venue-details">
                <div className="venue-item">
                  <h3>Église Saint-Pierre</h3>
                  <p>123 Rue de la Paix<br />75001 Paris, France</p>
                  <p className="venue-time">Cérémonie : 14h00</p>
                </div>
                <div className="venue-item">
                  <h3>Château de Versailles</h3>
                  <p>456 Avenue des Rois<br />78000 Versailles, France</p>
                  <p className="venue-time">Réception : 18h00</p>
                </div>
              </div>
            </div>
            <div className="venue-map animate-slide-in-right">
              <div className="map-placeholder">
                <p>Carte interactive</p>
                <small>Cliquez pour voir l&apos;itinéraire</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage; 