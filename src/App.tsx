import React, { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';
import './components/ScrollProgress.css';
import './components/BackToTop.css';
import './components/Chatbot.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import chatImage from './images/chat.png';

// Lazy loading pour améliorer les performances
const HomePage = lazy(() => import('./components/HomePage'));
const InvitationGenerator = lazy(() => import('./components/InvitationGenerator'));
const Gallery = lazy(() => import('./components/Gallery'));
const Program = lazy(() => import('./components/Program'));
const RSVP = lazy(() => import('./components/RSVP'));
const Contact = lazy(() => import('./components/Contact'));

// Composant de chargement pour les routes lazy
const LoadingSpinner = () => (
  <div className="route-loading">
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
    <p className="loading-text">Chargement...</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mise à jour du titre de la page
    document.title = "JOEL&EUNICE - Mariage 2025";
  }, []);

  useEffect(() => {
    // Réduire le temps de chargement pour une meilleure UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Réduit de 500ms à 300ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on route change avec un délai pour éviter les conflits
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
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
          <p className="loading-text">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/invitations" element={<InvitationGenerator />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/programme" element={<Program />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <BackToTop />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
