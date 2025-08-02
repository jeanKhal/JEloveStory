import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Enregistrement du service worker pour l'optimisation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW enregistré: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW échec d\'enregistrement: ', registrationError);
      });
  });
}

// Optimisation des performances
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Utilisation de React.StrictMode pour détecter les problèmes de performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure des performances web
reportWebVitals(console.log);
