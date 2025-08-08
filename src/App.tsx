import React from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RSVP from './components/RSVP';
import DressCode from './components/DressCode';
import Gallery from './components/Gallery';
import Chatbot from './components/Chatbot';
import Welcome from './components/Welcome';
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

// Composant pour la page de bienvenue
const WelcomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const guestCode = searchParams.get('code');
  
  // Trouver l'invité par son code
  const guest = guestCode ? findGuestByCode(guestCode) : null;
  
  return (
    <Welcome 
      guestName={guest ? `${guest.firstName} ${guest.lastName}` : undefined}
      invitationType={guest?.invitationType}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 