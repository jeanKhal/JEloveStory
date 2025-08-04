import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
                   <Navbar />
             <Hero />
             <About />
             <RSVP />
             
             {/* Sections à venir */}
             <section id="program" className="section-placeholder">
        <div className="container">
          <div className="section-header">
            <h2>Programme de la Journée</h2>
            <p>Le déroulé de notre journée spéciale</p>
          </div>
          <div className="coming-soon">
            <h3>Bientôt disponible</h3>
            <p>Le programme détaillé sera bientôt en ligne</p>
          </div>
        </div>
      </section>
      
      <Gallery />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App; 