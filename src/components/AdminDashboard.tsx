import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './AdminDashboard.css';

// Import des composants admin simplifiés
const AdminFormations = () => (
  <div className="admin-section">
    <h2>Gestion des Formations</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminInsertFormations = () => (
  <div className="admin-section">
    <h2>Ajouter une Formation</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminMouvements = () => (
  <div className="admin-section">
    <h2>Gestion des Mouvements</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminRapports = () => (
  <div className="admin-section">
    <h2>Rapports</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminRendezVous = () => (
  <div className="admin-section">
    <h2>Gestion des Rendez-vous</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminReservations = () => (
  <div className="admin-section">
    <h2>Gestion des Réservations</h2>
    <p>Fonctionnalité temporairement désactivée.</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Administration</h1>
        <p>Panneau d&apos;administration du site de mariage</p>
      </div>
      
      <div className="admin-content">
        <Routes>
          <Route path="/formations" element={<AdminFormations />} />
          <Route path="/insert-formations" element={<AdminInsertFormations />} />
          <Route path="/mouvements" element={<AdminMouvements />} />
          <Route path="/rapports" element={<AdminRapports />} />
          <Route path="/rendez-vous" element={<AdminRendezVous />} />
          <Route path="/reservations" element={<AdminReservations />} />
          <Route path="/" element={
            <div className="admin-section">
              <h2>Bienvenue dans l&apos;administration</h2>
              <p>Sélectionnez une section dans le menu pour commencer.</p>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard; 