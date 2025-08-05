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
             
             <Gallery />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App; 