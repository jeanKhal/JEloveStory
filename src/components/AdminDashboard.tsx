import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import AdminFormations from './admin/AdminFormations';
import ReservationSidebar from './admin/ReservationSidebar';
import AdminReservations from './admin/AdminReservations';
import AdminRendezVous from './admin/AdminRendezVous';

const SIDEBAR_WIDTH = 240;

// Style global pour désactiver le scroll horizontal sur tout le site
const GlobalNoScrollX = () => (
  <style>{`
    html, body {
      overflow-x: hidden !important;
      max-width: 100vw !important;
    }
  `}</style>
);

const containerStyle: React.CSSProperties = {
  width: '100vw',
  minHeight: '100vh',
  background: '#fafbfc',
  display: 'flex',
  position: 'relative',
  overflowX: 'hidden',
  maxWidth: '100vw',
};

const sidebarStyle: React.CSSProperties = {
  width: SIDEBAR_WIDTH,
  height: '100vh',
  background: '#fff',
  color: '#e53935',
  borderRight: '1.5px solid #f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px 0 32px 0',
  gap: 22,
  boxShadow: 'none',
  overflowY: 'auto',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  marginLeft: SIDEBAR_WIDTH,
  padding: 48,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  background: '#fafbfc',
  minHeight: '100vh',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  maxWidth: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
  boxSizing: 'border-box',
};

const linkStyle: React.CSSProperties = {
  color: '#e53935',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 18,
  padding: '12px 22px 12px 18px',
  borderRadius: 10,
  marginBottom: 8,
  transition: 'background 0.18s, color 0.18s',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  cursor: 'pointer',
  position: 'relative',
};

const linkActiveStyle: React.CSSProperties = {
  background: '#e53935',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(229,57,53,0.10)',
};

const linkHoverStyle: React.CSSProperties = {
  background: 'rgba(229,57,53,0.08)',
  color: '#e53935',
};

const iconStyle: React.CSSProperties = {
  width: 22,
  height: 22,
  display: 'inline-block',
  verticalAlign: 'middle',
};

// Box dashboard style
const boxGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  justifyContent: 'center',
  marginTop: 32,
};
const boxStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(229,57,53,0.07)',
  padding: '32px 28px',
  minWidth: 200,
  maxWidth: 240,
  flex: '1 1 200px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'box-shadow 0.18s, transform 0.18s',
  border: '1.5px solid #f0f0f0',
  color: '#e53935',
  fontWeight: 600,
  fontSize: 18,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 14,
};
const boxHoverStyle: React.CSSProperties = {
  boxShadow: '0 4px 18px rgba(229,57,53,0.13)',
  transform: 'translateY(-4px) scale(1.03)',
  border: '1.5px solid #e53935',
  background: '#fff5f5',
};

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const [boxHovered, setBoxHovered] = useState<string | null>(null);

  // Formations Firestore
  const [formations, setFormations] = useState<any[]>([]);
  const [loadingFormations, setLoadingFormations] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFormation, setNewFormation] = useState({ titre: '', categorie: '', niveau: '' });
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // Charger les formations en temps réel
  useEffect(() => {
    setLoadingFormations(true);
    const q = query(collection(db, 'formations'), orderBy('titre'));
    const unsub = onSnapshot(q, (snapshot) => {
      setFormations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingFormations(false);
    }, (err) => {
      setLoadingFormations(false);
    });
    return () => unsub();
  }, []);

  // Formulaire d'ajout de formation (modal)
  const AddFormationModal = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px rgba(229,57,53,0.13)', padding: 32, minWidth: 340, maxWidth: '90vw', position: 'relative' }}>
        <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#e53935', cursor: 'pointer' }}>&times;</button>
        <h3 style={{ color: '#e53935', marginBottom: 18 }}>Ajouter une formation</h3>
        <form onSubmit={async e => {
          e.preventDefault();
          if (!newFormation.titre || !newFormation.categorie || !newFormation.niveau) {
            setAddError('Tous les champs sont obligatoires');
            return;
          }
          setAddLoading(true);
          setAddError('');
          try {
            await addDoc(collection(db, 'formations'), newFormation);
            setShowAddModal(false);
            setNewFormation({ titre: '', categorie: '', niveau: '' });
          } catch (err) {
            setAddError("Erreur lors de l'ajout. Veuillez réessayer.");
          } finally {
            setAddLoading(false);
          }
        }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600 }}>Titre</label>
            <input
              type="text"
              value={newFormation.titre}
              onChange={e => setNewFormation(f => ({ ...f, titre: e.target.value }))}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
              required
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600 }}>Catégorie</label>
            <input
              type="text"
              value={newFormation.categorie}
              onChange={e => setNewFormation(f => ({ ...f, categorie: e.target.value }))}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
              required
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600 }}>Niveau</label>
            <input
              type="text"
              value={newFormation.niveau}
              onChange={e => setNewFormation(f => ({ ...f, niveau: e.target.value }))}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
              required
            />
          </div>
          {addError && <div style={{ color: '#e53935', marginBottom: 10 }}>{addError}</div>}
          <button type="submit" disabled={addLoading} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: addLoading ? 'not-allowed' : 'pointer', width: '100%' }}>
            {addLoading ? 'Ajout...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  // Liste fictive de formations pour la démo
  const fakeFormations = [
    { id: 1, titre: 'Développement Web', categorie: 'Informatique', niveau: 'Débutant' },
    { id: 2, titre: 'Marketing Digital', categorie: 'Communication', niveau: 'Intermédiaire' },
    { id: 3, titre: 'Gestion de Projet', categorie: 'Management', niveau: 'Avancé' },
  ];

  // Sections placeholders
  const AccueilAdmin = () => (
    <div>
      <h2 style={{ color: '#e53935', marginBottom: 18 }}>Tableau de bord</h2>
      <p>Bienvenue sur votre espace d'administration.<br />Gérez la plateforme, les utilisateurs, les formations, et bien plus !</p>
      <div style={boxGridStyle}>
        {/* Utilisateurs */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'users' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/users')}
          onMouseEnter={() => setBoxHovered('users')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </span>
          Utilisateurs
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les comptes utilisateurs</span>
        </div>
        {/* Formations (redirige vers la liste) */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'formations' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/formations')}
          onMouseEnter={() => setBoxHovered('formations')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20"/><path d="M20 22V2"/></svg>
          </span>
          Formations
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Voir et gérer les formations</span>
        </div>
        {/* Réservations */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'reservations' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/reservations')}
          onMouseEnter={() => setBoxHovered('reservations')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </span>
          Réservations
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Voir et gérer les réservations</span>
        </div>
        {/* Catégories */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'categories' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/categories')}
          onMouseEnter={() => setBoxHovered('categories')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-8.59 8.59a2 2 0 0 1-2.83 0l-6.59-6.59a2 2 0 0 1 0-2.83l8.59-8.59a2 2 0 0 1 2.83 0l6.59 6.59a2 2 0 0 1 0 2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
          </span>
          Catégories
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les catégories</span>
        </div>
        {/* Rendez-vous */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'rendezvous' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/rendezvous')}
          onMouseEnter={() => setBoxHovered('rendezvous')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            {/* Rendez-vous icon (clock/calendar) */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </span>
          Rendez-vous
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les rendez-vous</span>
        </div>
        {/* Conférences */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'conferences' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/conferences')}
          onMouseEnter={() => setBoxHovered('conferences')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            {/* Conférence icon (microphone) */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="22" x2="12" y2="18"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
          </span>
          Conférences
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les conférences</span>
        </div>
        {/* Ateliers */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'ateliers' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/ateliers')}
          onMouseEnter={() => setBoxHovered('ateliers')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            {/* Atelier icon (tools) */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 1.4 0l1 1z"/><path d="M7 7l3 3"/><path d="M21 21l-6-6"/></svg>
          </span>
          Ateliers
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les ateliers</span>
        </div>
        {/* Séances pratiques */}
        <div
          style={{ ...boxStyle, ...(boxHovered === 'seances' ? boxHoverStyle : {}) }}
          onClick={() => navigate('/admin-dashboard/seances')}
          onMouseEnter={() => setBoxHovered('seances')}
          onMouseLeave={() => setBoxHovered(null)}
        >
          <span style={{ ...iconStyle, fontSize: 32 }}>
            {/* Séance pratique icon (checklist/clipboard) */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="4" rx="2"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
          </span>
          Séances pratiques
          <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>Gérer les séances pratiques</span>
        </div>
      </div>
    </div>
  );
  const Users = () => <div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Utilisateurs</h2><p>Gestion des utilisateurs (à implémenter).</p></div>;
  // On utilise désormais <AdminFormations /> pour la route formations
  const Reservations = () => <div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Réservations</h2><p>Gestion des réservations (à implémenter).</p></div>;
  const Categories = () => <div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Catégories</h2><p>Gestion des catégories (à implémenter).</p></div>;

  // Helper pour appliquer le style hover/actif
  const getLinkStyle = (isActive: boolean, key: string) => {
    if (isActive) return { ...linkStyle, ...linkActiveStyle };
    if (hovered === key) return { ...linkStyle, ...linkHoverStyle };
    return linkStyle;
  };

  return (
    <>
      <GlobalNoScrollX />
      <div style={containerStyle}>
        {/* Sidebar */}
        <aside style={sidebarStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, letterSpacing: 1, color: '#e53935' }}>Admin</h2>
          <NavLink
            to="/admin-dashboard"
            end
            style={({ isActive }) => getLinkStyle(isActive, 'accueil')}
            onMouseEnter={() => setHovered('accueil')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Home icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
            </span>
            Tableau de bord
          </NavLink>
          <NavLink
            to="/admin-dashboard/users"
            style={({ isActive }) => getLinkStyle(isActive, 'users')}
            onMouseEnter={() => setHovered('users')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Users icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            Utilisateurs
          </NavLink>
          <NavLink
            to="/admin-dashboard/formations"
            style={({ isActive }) => getLinkStyle(isActive, 'formations')}
            onMouseEnter={() => setHovered('formations')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Book icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20"/><path d="M20 22V2"/></svg>
            </span>
            Formations
          </NavLink>
          <NavLink
            to="/admin-dashboard/reservations"
            style={({ isActive }) => getLinkStyle(isActive, 'reservations')}
            onMouseEnter={() => setHovered('reservations')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Calendar/Reservation icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </span>
            Réservations
          </NavLink>
          <NavLink
            to="/admin-dashboard/categories"
            style={({ isActive }) => getLinkStyle(isActive, 'categories')}
            onMouseEnter={() => setHovered('categories')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Tag/Categories icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-8.59 8.59a2 2 0 0 1-2.83 0l-6.59-6.59a2 2 0 0 1 0-2.83l8.59-8.59a2 2 0 0 1 2.83 0l6.59 6.59a2 2 0 0 1 0 2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
            </span>
            Catégories
          </NavLink>
          <NavLink
            to="/admin-dashboard/rendezvous"
            style={({ isActive }) => getLinkStyle(isActive, 'rendezvous')}
            onMouseEnter={() => setHovered('rendezvous')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Rendez-vous icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            Rendez-vous
          </NavLink>
          <NavLink
            to="/admin-dashboard/conferences"
            style={({ isActive }) => getLinkStyle(isActive, 'conferences')}
            onMouseEnter={() => setHovered('conferences')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Conférence icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="22" x2="12" y2="18"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
            </span>
            Conférences
          </NavLink>
          <NavLink
            to="/admin-dashboard/ateliers"
            style={({ isActive }) => getLinkStyle(isActive, 'ateliers')}
            onMouseEnter={() => setHovered('ateliers')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Atelier icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 1.4 0l1 1z"/><path d="M7 7l3 3"/><path d="M21 21l-6-6"/></svg>
            </span>
            Ateliers
          </NavLink>
          <NavLink
            to="/admin-dashboard/seances"
            style={({ isActive }) => getLinkStyle(isActive, 'seances')}
            onMouseEnter={() => setHovered('seances')}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={iconStyle}>
              {/* Séance pratique icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="4" rx="2"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
            </span>
            Séances pratiques
          </NavLink>
          {/* Intégration du composant des réservations */}
          <ReservationSidebar />
          <button
            onClick={() => { navigate('/'); }}
            style={{ ...linkStyle, marginTop: 'auto', background: '#e53935', color: '#fff', border: 'none', gap: 10 }}
          >
            <span style={iconStyle}>
              {/* Logout icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            Déconnexion
          </button>
        </aside>
        {/* Contenu dashboard */}
        <main style={mainStyle}>
          <header style={{ marginBottom: 32, borderBottom: '1.5px solid #eee', paddingBottom: 18 }}>
            <h1 style={{ color: '#e53935', fontSize: 28, margin: 0, letterSpacing: 0.5 }}>
              {(() => {
                if (location.pathname === '/admin-dashboard') return 'Tableau de bord';
                if (location.pathname.includes('/users')) return 'Utilisateurs';
                if (location.pathname.includes('/formations')) return 'Formations';
                if (location.pathname.includes('/reservations')) return 'Réservations';
                if (location.pathname.includes('/categories')) return 'Catégories';
                if (location.pathname.includes('/rendezvous')) return 'Rendez-vous';
                if (location.pathname.includes('/conferences')) return 'Conférences';
                if (location.pathname.includes('/ateliers')) return 'Ateliers';
                if (location.pathname.includes('/seances')) return 'Séances pratiques';
                return 'Espace admin';
              })()}
            </h1>
          </header>
          <Routes>
            <Route index element={<AccueilAdmin />} />
            <Route path="users" element={<Users />} />
            <Route path="formations" element={<AdminFormations />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="categories" element={<Categories />} />
            <Route path="rendezvous" element={<AdminRendezVous />} />
            <Route path="conferences" element={<div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Conférences</h2><p>Gestion des conférences (à implémenter).</p></div>} />
            <Route path="ateliers" element={<div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Ateliers</h2><p>Gestion des ateliers (à implémenter).</p></div>} />
            <Route path="seances" element={<div><h2 style={{ color: '#e53935', marginBottom: 18 }}>Séances pratiques</h2><p>Gestion des séances pratiques (à implémenter).</p></div>} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminDashboard; 