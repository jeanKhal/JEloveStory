import React from 'react';
const AdminDashboard: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(229,57,53,0.08)', padding: 36 }}>
    <h2 style={{ color: '#e53935', textAlign: 'center', marginBottom: 18 }}>Tableau de bord Administrateur</h2>
    <ul style={{ fontSize: '1.1rem', color: '#333', marginTop: 24 }}>
      <li>Gestion des rendez-vous</li>
      <li>Enregistrement des mouvements</li>
      <li>Génération de rapports annuels</li>
    </ul>
  </div>
);
export default AdminDashboard; 