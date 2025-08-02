import React from 'react';

const MembreEspace: React.FC = () => {
  const handleLogout = () => {
    // Simulation de déconnexion
    console.log('Déconnexion...');
    alert('Fonctionnalité de déconnexion temporairement désactivée.');
  };

  return (
    <div className="membre-espace">
      <h2>Espace Membre</h2>
      <p>Bienvenue dans votre espace personnel.</p>
      
      <div className="member-info">
        <h3>Informations du compte</h3>
        <p>Fonctionnalité temporairement désactivée.</p>
      </div>
      
      <div className="member-actions">
        <button onClick={handleLogout} className="btn-secondary">
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default MembreEspace; 