import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

interface RendezVous {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateRdv: string;
  heureDebut: string;
  heureFin: string;
  statut: 'En attente' | 'Confirmé' | 'Annulé';
}

const AdminRendezVous: React.FC = () => {
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notif, setNotif] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [missingDate, setMissingDate] = useState(false);
  // Supprimer le formulaire d'ajout (handleFormChange, handleFormSubmit, form, formLoading, le <form> et ses champs)

  useEffect(() => {
    const q = query(collection(db, 'rendezvous'), orderBy('dateRdv', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const allRdvs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RendezVous));
      const filtered = allRdvs.filter(rdv => rdv.dateRdv && rdv.dateRdv !== '');
      setRdvs(filtered);
      setMissingDate(filtered.length !== allRdvs.length);
      setLoading(false);
    }, (error) => {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      setLoading(false);
    });
    
    // Timeout de sécurité réduit à 1 seconde
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 1000);
    
    return () => { 
      unsub(); 
      clearTimeout(timeout); 
    };
  }, []);

  const handleAction = async (id: string, action: 'valider' | 'annuler' | 'supprimer') => {
    setActionLoading(id);
    setNotif(null);
    try {
      if (action === 'valider') {
        await updateDoc(doc(db, 'rendezvous', id), { statut: 'Confirmé' });
        setNotif({ type: 'success', message: 'Rendez-vous validé.' });
      } else if (action === 'annuler') {
        await updateDoc(doc(db, 'rendezvous', id), { statut: 'Annulé' });
        setNotif({ type: 'success', message: 'Rendez-vous annulé.' });
      } else if (action === 'supprimer') {
        await deleteDoc(doc(db, 'rendezvous', id));
        setNotif({ type: 'success', message: 'Rendez-vous supprimé.' });
      }
    } catch (e) {
      setNotif({ type: 'error', message: "Erreur lors de l'action." });
    } finally {
      setActionLoading(null);
      setTimeout(() => setNotif(null), 1500);
    }
  };

  // Afficher uniquement la liste des rendez-vous et les notifications

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(229,57,53,0.08)', padding: 36 }}>
      <h2 style={{ color: '#e53935', textAlign: 'center', marginBottom: 18 }}>Gestion des rendez-vous</h2>
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
          Certains rendez-vous sont ignorés car il manque le champ <b>dateRdv</b>.
        </div>
      )}
      {loading ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: 32 }}>Chargement...</div>
      ) : rdvs.length === 0 ? (
        <div style={{ color: '#888', fontStyle: 'italic', padding: 32 }}>Aucun rendez-vous trouvé.</div>
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
            {rdvs.map(rdv => (
              <tr key={rdv.id} style={{ borderBottom: '1px solid #f0f0f0', opacity: actionLoading === rdv.id ? 0.6 : 1 }}>
                <td style={{ padding: '10px 8px' }}>{rdv.nom}</td>
                <td style={{ padding: '10px 8px' }}>{rdv.email}</td>
                <td style={{ padding: '10px 8px' }}>{rdv.telephone}</td>
                <td style={{ padding: '10px 8px' }}>{rdv.dateRdv}</td>
                <td style={{ padding: '10px 8px' }}>{rdv.heureDebut && rdv.heureFin ? `${rdv.heureDebut} - ${rdv.heureFin}` : ''}</td>
                <td style={{ padding: '10px 8px', fontWeight: 700, color: rdv.statut === 'Confirmé' ? '#43a047' : rdv.statut === 'Annulé' ? '#e53935' : '#fbc02d' }}>{rdv.statut}</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  {rdv.statut === 'En attente' && (
                    <button
                      style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                      disabled={!!actionLoading}
                      onClick={() => handleAction(rdv.id, 'valider')}
                    >Valider</button>
                  )}
                  {(rdv.statut === 'En attente' || rdv.statut === 'Confirmé') && (
                    <button
                      style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                      disabled={!!actionLoading}
                      onClick={() => handleAction(rdv.id, 'annuler')}
                    >Annuler</button>
                  )}
                  <button
                    style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14, opacity: actionLoading ? 0.7 : 1 }}
                    disabled={!!actionLoading}
                    onClick={() => handleAction(rdv.id, 'supprimer')}
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

export default AdminRendezVous; 