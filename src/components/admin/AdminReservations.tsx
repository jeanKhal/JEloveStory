import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Reservation } from '../../types/formation';

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // id de la réservation en cours d'action
  const [notif, setNotif] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [missingDate, setMissingDate] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const q = query(collection(db, 'reservations'), orderBy('dateReservation', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const allRes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
      const filtered = allRes.filter(res => res.dateReservation && res.dateReservation !== '');
      setReservations(filtered);
      setMissingDate(filtered.length !== allRes.length);
      setLoading(false);
    });
    // Patch : si après 3s toujours loading, on affiche un message
    timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3000);
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const handleAction = async (id: string, action: 'valider' | 'annuler' | 'supprimer') => {
    setActionLoading(id);
    setNotif(null);
    try {
      if (action === 'valider') {
        await updateDoc(doc(db, 'reservations', id), { statut: 'Confirmée' });
        setNotif({ type: 'success', message: 'Réservation validée.' });
      } else if (action === 'annuler') {
        await updateDoc(doc(db, 'reservations', id), { statut: 'Annulée' });
        setNotif({ type: 'success', message: 'Réservation annulée.' });
      } else if (action === 'supprimer') {
        await deleteDoc(doc(db, 'reservations', id));
        setNotif({ type: 'success', message: 'Réservation supprimée.' });
      }
    } catch (e) {
      setNotif({ type: 'error', message: "Erreur lors de l'action." });
    } finally {
      setActionLoading(null);
      setTimeout(() => setNotif(null), 2500);
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(229,57,53,0.08)', padding: 28, maxWidth: 1100, margin: '32px auto' }}>
      <h2 style={{ color: '#e53935', marginBottom: 18 }}>Liste des réservations</h2>
      {notif && (
        <div style={{
          background: notif.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: notif.type === 'success' ? '#388e3c' : '#c62828',
          border: `1.5px solid ${notif.type === 'success' ? '#43a047' : '#e53935'}`,
          borderRadius: 8,
          padding: '10px 18px',
          marginBottom: 18,
          fontWeight: 600,
          fontSize: 15
        }}>{notif.message}</div>
      )}
      {missingDate && (
        <div style={{ background: '#fff3cd', color: '#856404', border: '1.5px solid #ffeeba', borderRadius: 8, padding: '8px 16px', marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
          Certaines réservations sont ignorées car il manque le champ <b>dateReservation</b>.
        </div>
      )}
      {loading ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: 32 }}>Chargement...</div>
      ) : reservations.length === 0 ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: 32 }}>Aucune réservation trouvée.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(229,57,53,0.04)' }}>
          <thead>
            <tr style={{ background: '#f7f7f7', color: '#e53935', fontWeight: 700 }}>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Nom</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Téléphone</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Heure</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Statut</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id} style={{ borderBottom: '1px solid #f0f0f0', opacity: actionLoading === res.id ? 0.6 : 1 }}>
                <td style={{ padding: '10px 8px' }}>{res.nom}</td>
                <td style={{ padding: '10px 8px' }}>{res.email}</td>
                <td style={{ padding: '10px 8px' }}>{res.telephone}</td>
                <td style={{ padding: '10px 8px' }}>{res.dateReservation}</td>
                <td style={{ padding: '10px 8px' }}>{(res as any).heureDebut ? `${(res as any).heureDebut} - ${(res as any).heureFin}` : ''}</td>
                <td style={{ padding: '10px 8px', fontWeight: 700, color: res.statut === 'Confirmée' ? '#43a047' : res.statut === 'Annulée' ? '#e53935' : '#fbc02d' }}>{res.statut}</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  {res.statut === 'En attente' && (
                    <button
                      style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                      disabled={!!actionLoading}
                      onClick={() => handleAction(res.id, 'valider')}
                    >Valider</button>
                  )}
                  {(res.statut === 'En attente' || res.statut === 'Confirmée') && (
                    <button
                      style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                      disabled={!!actionLoading}
                      onClick={() => handleAction(res.id, 'annuler')}
                    >Annuler</button>
                  )}
                  <button
                    style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                    disabled={!!actionLoading}
                    onClick={() => handleAction(res.id, 'supprimer')}
                  >Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReservations; 