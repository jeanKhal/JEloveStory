import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Program from './components/Program';
import RSVP from './components/RSVP';
import DressCode from './components/DressCode';
import Gallery from './components/Gallery';
import Chatbot from './components/Chatbot';
import Welcome from './components/Welcome';
import Validation from './components/Validation';
import { findGuestByCode } from './utils/guestData';

// Composant de chargement optimisé
const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Chargement...</p>
  </div>
);

// Composant pour la page d'accueil optimisé
const HomePage: React.FC = () => {
  // Scroll automatique vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Program />
      <Suspense fallback={<LoadingSpinner />}>
        <RSVP />
      </Suspense>
      <DressCode />
      <Gallery />
      <Chatbot />
    </>
  );
};

// Composant pour la page de bienvenue avec paramètre de route
const WelcomePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  
  // Trouver l'invité par son code
  const guest = code ? findGuestByCode(code) : null;
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Welcome 
        guestName={guest ? `${guest.firstName} ${guest.lastName}` : undefined}
        invitationType={guest?.invitationType}
      />
    </Suspense>
  );
};

// Composant pour la page de validation d'authenticité
const ValidationPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Validation />
    </Suspense>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome/:code" element={<WelcomePage />} />
        <Route path="/validate/:guestCode/:invitationType/:token" element={<ValidationPage />} />
      </Routes>
    </div>
  );
}

export default App; 