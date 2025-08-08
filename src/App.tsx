import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RSVP from './components/RSVP';
import DressCode from './components/DressCode';
import Gallery from './components/Gallery';
import Chatbot from './components/Chatbot';
import Welcome from './components/Welcome';
import Validation from './components/Validation';
import { findGuestByCode } from './utils/guestData';

// Composant pour la page d'accueil
const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <RSVP />
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
    <Welcome 
      guestName={guest ? `${guest.firstName} ${guest.lastName}` : undefined}
      invitationType={guest?.invitationType}
    />
  );
};

// Composant pour la page de validation d'authenticité
const ValidationPage: React.FC = () => {
  return <Validation />;
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