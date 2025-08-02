import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
