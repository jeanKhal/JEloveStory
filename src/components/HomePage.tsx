import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import CountdownTimer from './CountdownTimer';
import './CountdownTimer.css';
import OptimizedImage from './OptimizedImage';
import './OptimizedImage.css';
import imageOptimization from '../utils/imageOptimization';
import chatImage from '../images/chat.png';

// Réduire drastiquement le nombre d'images importées pour améliorer les performances
import image1 from '../images/1.jpeg';
import image2 from '../images/_MT_0042.jpeg';

const HomePage: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  // Utiliser seulement 2 images pour la page d'accueil - mémorisé avec dépendances stables
  const heroImages = useMemo(() => [image1, image2], []);

  // Date du mariage (29 août 2025) - mémorisé avec dépendances stables
  const weddingDate = useMemo(() => new Date('2025-08-29T14:00:00'), []);

  // Chargement optimisé des images critiques seulement - une seule fois
  useEffect(() => {
    if (hasLoadedRef.current) return; // Éviter les rechargements multiples
    
    const loadCriticalImages = async () => {
      try {
        hasLoadedRef.current = true;
        // Précharger seulement les 2 images critiques
        await imageOptimization.preloadCriticalImages(heroImages);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Erreur lors du chargement des images critiques:', error);
        setImagesLoaded(true); // Continuer même en cas d'erreur
      }
    };

    loadCriticalImages();
  }, [heroImages]); // Ajouter heroImages comme dépendance

  // Animation d'entrée - une seule fois
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []); // Dépendances vides

  // Mémoriser les actions rapides avec dépendances stables
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
      to: '/rsvp',
      icon: '✅',
      title: 'Confirmer Présence',
      description: 'Dites-nous si vous venez'
    },
    {
      to: '/galerie',
      icon: '📸',
      title: 'Galerie Photos',
      description: 'Revivez nos moments'
    }
  ], []); // Dépendances vides

  // Mémoriser les événements du programme avec dépendances stables
  const programEvents = useMemo(() => [
    { time: '14h00', title: 'Cérémonie Religieuse', description: 'Église Saint-Pierre' },
    { time: '15h30', title: 'Cocktail', description: 'Accueil festif' },
    { time: '18h30', title: 'Entrée des Mariés', description: 'Accueil festif' },
    { time: '19h00', title: 'Dîner', description: 'Réception' },
    { time: '22h00', title: 'Soirée Dansante', description: 'Ambiance festive' }
  ], []); // Dépendances vides

  if (!imagesLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="chat-loading-container">
            <div className="chat-loading-spinner"></div>
            <div className="chat-loading-background">
              <img 
                src={chatImage} 
                alt="Chat" 
                className="chat-loading-image"
              />
            </div>
          </div>
          <h2 className="loading-title">Joel & Eunice</h2>
          <p className="loading-date">29 Août 2025</p>
          <p className="loading-text">Chargement des images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`homepage ${isVisible ? 'visible' : ''}`}>
      {/* Section Hero avec image de fond optimisée */}
      <section className="hero-section" id="hero">
        <div className="hero-background">
          <OptimizedImage
            src={heroImages[0]} // Utiliser toujours la première image pour éviter les changements
            alt="Joel & Eunice"
            className="hero-image fade-in"
            loading="eager"
            priority={true}
          />
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="names">Joel & Eunice</span>
            </h1>
            <p className="hero-subtitle">Se marient</p>
            <div className="hero-date">29 Août 2025</div>
            
            <CountdownTimer targetDate={weddingDate} />
            
            <div className="hero-actions">
              <Link to="/rsvp" className="cta-button primary">
                Confirmer ma présence
              </Link>
              <Link to="/programme" className="cta-button secondary">
                Voir le programme
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Actions Rapides */}
      <section className="quick-actions-section" id="actions">
        <div className="container">
          <h2 className="section-title">Actions Rapides</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link key={`action-${index}`} to={action.to} className="quick-action-card">
                <div className="action-icon">{action.icon}</div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Programme */}
      <section className="program-section" id="program">
        <div className="container">
          <h2 className="section-title">Programme de la Journée</h2>
          <div className="program-timeline">
            {programEvents.map((event, index) => (
              <div key={`event-${index}`} className="program-event">
                <div className="event-time">{event.time}</div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Nous Contacter</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span className="contact-text">contact@joel-eunice.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span className="contact-text">+243 XXX XXX XXX</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage; 