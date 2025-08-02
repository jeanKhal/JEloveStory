import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'profil', label: 'Profil', icon: '👤' },
  { key: 'reservations', label: 'Mes réservations', icon: '📅' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
  { key: 'avantages', label: 'Avantages', icon: '⭐' },
];

const getInitial = (user: any) => {
  if (user?.displayName) return user.displayName[0].toUpperCase();
  if (user?.email) return user.email[0].toUpperCase();
  return '👤';
};

const MembreEspace: React.FC = () => {
  const [section, setSection] = useState<'dashboard' | 'profil' | 'reservations' | 'notifications' | 'avantages'>('dashboard');
  const user = getAuth().currentUser;
  const navigate = useNavigate();

  // Simuler des données pour le dashboard
  const nbReservations = 2; // à remplacer par un vrai fetch
  const nbNotifications = 1; // à remplacer par un vrai fetch

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f7f9fb 60%, #eaf1fb 100%)',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 0,
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: 1100,
        minHeight: '100vh',
        background: 'none',
        borderRadius: 28,
        boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
        alignItems: 'stretch',
        gap: 0,
      }}>
        {/* Sidebar collé à gauche, toute la hauteur */}
        <nav style={{
          minWidth: 210,
          maxWidth: 240,
          height: '100vh',
          background: '#fff',
          borderRadius: '28px 0 0 28px',
          margin: 0,
          boxShadow: '2px 0 18px rgba(0,0,0,0.06)',
          padding: '38px 0 32px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          position: 'relative',
        }}>
          {/* Avatar */}
          <div style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #007bff 60%, #0056b3 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            boxShadow: '0 2px 12px rgba(0,123,255,0.10)',
            border: '3px solid #eaf1fb',
            letterSpacing: 1,
          }}>
            {getInitial(user)}
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#007bff', textAlign: 'center', marginBottom: 18, letterSpacing: 1, width: '100%' }}>Espace membre</div>
          <div style={{ width: '70%', height: 1, background: '#eaf1fb', margin: '0 auto 18px auto', borderRadius: 2 }} />
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSection(item.key as any)}
              style={{
                background: section === item.key
                  ? 'linear-gradient(90deg, #007bff 70%, #0056b3 100%)'
                  : 'none',
                color: section === item.key ? '#fff' : '#222',
                border: 'none',
                padding: '13px 28px',
                fontWeight: 600,
                fontSize: '1.08rem',
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 2,
                boxShadow: section === item.key ? '0 2px 12px rgba(0,123,255,0.10)' : 'none',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s',
                outline: 'none',
                width: '100%',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = section === item.key
                  ? 'linear-gradient(90deg, #007bff 70%, #0056b3 100%)'
                  : '#f5f8ff';
                (e.currentTarget as HTMLButtonElement).style.transform = section === item.key ? 'scale(1.04)' : 'scale(1.03)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = section === item.key ? '0 4px 18px rgba(0,123,255,0.13)' : '0 2px 8px rgba(0,0,0,0.06)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = section === item.key
                  ? 'linear-gradient(90deg, #007bff 70%, #0056b3 100%)'
                  : 'none';
                (e.currentTarget as HTMLButtonElement).style.transform = 'none';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = section === item.key ? '0 2px 12px rgba(0,123,255,0.10)' : 'none';
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span> {item.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button
            onClick={() => { signOut(getAuth()); navigate('/'); }}
            style={{
              background: 'linear-gradient(90deg, #e74c3c 70%, #c0392b 100%)',
              color: '#fff',
              border: 'none',
              padding: '13px 28px',
              fontWeight: 600,
              fontSize: '1.08rem',
              borderRadius: 12,
              cursor: 'pointer',
              marginTop: 32,
              marginBottom: 8,
              letterSpacing: 0.5,
              boxShadow: '0 2px 8px rgba(231,76,60,0.10)',
              transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
              width: '100%',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #c0392b 70%, #e74c3c 100%)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 18px rgba(231,76,60,0.13)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #e74c3c 70%, #c0392b 100%)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'none';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(231,76,60,0.10)';
            }}
          >
            🚪 Se déconnecter
          </button>
        </nav>
        {/* Contenu */}
        <main style={{
          flex: 1,
          margin: 0,
          background: '#fff',
          borderRadius: '0 28px 28px 0',
          boxShadow: '-2px 0 12px rgba(0,0,0,0.03)',
          padding: '48px 36px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          justifyContent: 'center',
        }}>
          {section === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: 28, color: '#007bff', marginBottom: 24, letterSpacing: 0.5, textAlign: 'center' }}>Bienvenue {user?.displayName || user?.email || ''} !</h2>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ background: '#f5f8ff', borderRadius: 14, padding: '28px 38px', minWidth: 180, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: 32, marginBottom: 8 }}>📅</span>
                  <div style={{ fontWeight: 700, fontSize: 22 }}>{nbReservations}</div>
                  <div style={{ color: '#555', fontSize: 15 }}>Réservations</div>
                </div>
                <div style={{ background: '#f5f8ff', borderRadius: 14, padding: '28px 38px', minWidth: 180, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: 32, marginBottom: 8 }}>🔔</span>
                  <div style={{ fontWeight: 700, fontSize: 22 }}>{nbNotifications}</div>
                  <div style={{ color: '#555', fontSize: 15 }}>Notifications</div>
                </div>
                <div style={{ background: '#f5f8ff', borderRadius: 14, padding: '28px 38px', minWidth: 180, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => setSection('profil')}>
                  <span style={{ fontSize: 32, marginBottom: 8 }}>👤</span>
                  <div style={{ fontWeight: 700, fontSize: 22 }}>Profil</div>
                  <div style={{ color: '#555', fontSize: 15 }}>Voir mon profil</div>
                </div>
              </div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Accédez à vos informations, réservations et notifications depuis ce tableau de bord.</div>
            </div>
          )}
          {section === 'profil' && (
            <div>
              <h2 style={{ fontSize: 26, color: '#007bff', marginBottom: 18, letterSpacing: 0.5 }}>Mon profil</h2>
              <div style={{ background: '#f5f8ff', borderRadius: 10, padding: '24px 18px', maxWidth: 400, marginBottom: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>👤 {user?.displayName || 'Non renseigné'}</div>
                <div style={{ color: '#555', fontSize: 16 }}><b>Email :</b> {user?.email}</div>
              </div>
              <div style={{ color: '#888', fontSize: 15 }}>Pour modifier vos informations, contactez l'administrateur.</div>
            </div>
          )}
          {section === 'reservations' && (
            <div>
              <h2 style={{ fontSize: 26, color: '#007bff', marginBottom: 18, letterSpacing: 0.5 }}>Mes réservations</h2>
              <div style={{ background: '#f5f8ff', borderRadius: 10, padding: '24px 18px', maxWidth: 500 }}>
                <div style={{ color: '#555', fontSize: 16 }}>Affichage des réservations à venir...</div>
              </div>
            </div>
          )}
          {section === 'notifications' && (
            <div>
              <h2 style={{ fontSize: 26, color: '#007bff', marginBottom: 18, letterSpacing: 0.5 }}>Notifications</h2>
              <div style={{ background: '#f5f8ff', borderRadius: 10, padding: '24px 18px', maxWidth: 500 }}>
                <div style={{ color: '#555', fontSize: 16 }}>Vous n'avez pas de nouvelles notifications.</div>
              </div>
            </div>
          )}
          {section === 'avantages' && (
            <div>
              <h2 style={{ fontSize: 26, color: '#007bff', marginBottom: 18, letterSpacing: 0.5 }}>Avantages du membre</h2>
              <div style={{ background: '#f5f8ff', borderRadius: 12, padding: '28px 24px', maxWidth: 700, margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                  <thead>
                    <tr style={{ background: '#eaf1fb', color: '#007bff' }}>
                      <th style={{ padding: '12px 8px', borderRadius: '8px 0 0 8px', textAlign: 'left' }}>Fonctionnalité</th>
                      <th style={{ padding: '12px 8px', textAlign: 'center' }}>Membre</th>
                      <th style={{ padding: '12px 8px', borderRadius: '0 8px 8px 0', textAlign: 'center' }}>Visiteur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px 8px' }}>Espace personnel / Dashboard</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr style={{ background: '#f7f9fb' }}>
                      <td style={{ padding: '10px 8px' }}>Historique des réservations</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 8px' }}>Notifications personnalisées</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr style={{ background: '#f7f9fb' }}>
                      <td style={{ padding: '10px 8px' }}>Modifier/annuler une réservation</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 8px' }}>Accès à des offres exclusives</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr style={{ background: '#f7f9fb' }}>
                      <td style={{ padding: '10px 8px' }}>Support dédié</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 8px' }}>Profil sauvegardé</td>
                      <td style={{ textAlign: 'center' }}>✅</td>
                      <td style={{ textAlign: 'center' }}>❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MembreEspace; 