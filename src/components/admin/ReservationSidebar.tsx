import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Reservation } from '../../types/formation';

const sidebarListStyle: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  borderRadius: 14,
  padding: '16px 12px 10px 12px',
  marginTop: 18,
  boxShadow: '0 2px 12px rgba(229,57,53,0.08)',
  fontSize: 15,
  color: '#333',
  maxHeight: 270,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
};
const itemStyle: React.CSSProperties = {
  padding: '10px 0 10px 0',
  borderBottom: '1.5px solid #f3f3f3',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
};
const itemHoverStyle: React.CSSProperties = {
  background: '#f8f9fa',
  boxShadow: '0 2px 8px rgba(229,57,53,0.06)',
  borderRadius: 8,
  transform: 'translateY(-2px) scale(1.01)',
};
const statusBadgeStyle = (statut: string): React.CSSProperties => ({
  fontWeight: 700,
  color: '#fff',
  background: statut === 'Confirmée' ? '#43a047' : statut === 'Annulée' ? '#e53935' : '#fbc02d',
  fontSize: 12,
  borderRadius: 8,
  padding: '2px 10px',
  marginLeft: 6,
  display: 'inline-block',
  minWidth: 70,
  textAlign: 'center',
  letterSpacing: 0.2,
});
const dateStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#888',
  marginLeft: 2,
};
const iconStyle: React.CSSProperties = {
  fontSize: 20,
  marginRight: 2,
  flexShrink: 0,
};
const footerBtnStyle: React.CSSProperties = {
  marginTop: 10,
  background: 'linear-gradient(90deg, #e53935 70%, #b71c1c 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '8px 0',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  width: '100%',
  boxShadow: '0 1px 6px rgba(229,57,53,0.08)',
  transition: 'background 0.18s, box-shadow 0.18s',
};

const ReservationSidebar: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'reservations'),
      orderBy('dateReservation', 'desc'),
      limit(5)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const getStatusIcon = (statut: string) => {
    if (statut === 'Confirmée') return <span style={{...iconStyle, color: '#43a047'}}>✔️</span>;
    if (statut === 'Annulée') return <span style={{...iconStyle, color: '#e53935'}}>❌</span>;
    return <span style={{...iconStyle, color: '#fbc02d'}}>⏳</span>;
  };

  return (
    <div style={sidebarListStyle}>
      <div style={{ fontWeight: 800, color: '#e53935', marginBottom: 10, fontSize: 17, letterSpacing: 0.2 }}>Dernières réservations</div>
      {loading ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: '18px 0' }}>Chargement...</div>
      ) : reservations.length === 0 ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: '18px 0' }}>Aucune réservation récente.</div>
      ) : (
        reservations.map((res, idx) => (
          <div
            key={res.id}
            style={{ ...itemStyle, ...(hoveredIdx === idx ? itemHoverStyle : {}) }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <span style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{res.nom}</span>
          </div>
        ))
      )}
      <button style={footerBtnStyle} title="Voir toutes les réservations" disabled>Voir toutes les réservations</button>
    </div>
  );
};

export default ReservationSidebar; 