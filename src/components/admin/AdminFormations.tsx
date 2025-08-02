import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminFormations: React.FC = () => {
  const [formations, setFormations] = useState<any[]>([]);
  const [loadingFormations, setLoadingFormations] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFormation, setNewFormation] = useState({
    titre: '',
    description: '',
    categorie: '',
    niveau: '',
    dateDebut: '',
    heureDebut: '',
    heureFin: '',
    // champs optionnels pour la démo
    duree: '',
    prix: 0,
    capacite: 0,
    dateFin: '',
    lieu: '',
    formateur: '',
    imageUrl: '',
    placesDisponibles: 0
  });
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [notif, setNotif] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setLoadingFormations(true);
    const q = query(collection(db, 'formations'), orderBy('titre'));
    const unsub = onSnapshot(q, (snapshot) => {
      setFormations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingFormations(false);
    }, () => setLoadingFormations(false));
    return () => unsub();
  }, []);

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
          if (!newFormation.titre || !newFormation.categorie || !newFormation.niveau || !newFormation.description || !newFormation.dateDebut || !newFormation.heureDebut || !newFormation.heureFin) {
            setAddError('Tous les champs sont obligatoires');
            return;
          }
          setAddLoading(true);
          setAddError('');
          try {
            await addDoc(collection(db, 'formations'), {
              titre: newFormation.titre,
              description: newFormation.description,
              categorie: newFormation.categorie,
              niveau: newFormation.niveau,
              dateDebut: newFormation.dateDebut,
              horaire: `${newFormation.heureDebut} - ${newFormation.heureFin}`,
              duree: newFormation.duree,
              prix: newFormation.prix,
              capacite: newFormation.capacite,
              dateFin: newFormation.dateFin,
              lieu: newFormation.lieu,
              formateur: newFormation.formateur,
              imageUrl: newFormation.imageUrl,
              placesDisponibles: newFormation.placesDisponibles
            });
            setShowAddModal(false);
            setNewFormation({
              titre: '', description: '', categorie: '', niveau: '', dateDebut: '', heureDebut: '', heureFin: '', duree: '', prix: 0, capacite: 0, dateFin: '', lieu: '', formateur: '', imageUrl: '', placesDisponibles: 0
            });
          } catch (err) {
            setAddError("Erreur lors de l'ajout. Veuillez réessayer.");
          } finally {
            setAddLoading(false);
          }
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Titre</label>
              <input
                type="text"
                value={newFormation.titre}
                onChange={e => setNewFormation(f => ({ ...f, titre: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                placeholder="Nom de la formation"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Catégorie</label>
              <input
                type="text"
                value={newFormation.categorie}
                onChange={e => setNewFormation(f => ({ ...f, categorie: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                placeholder="Ex: Informatique, Design..."
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Niveau</label>
              <input
                type="text"
                value={newFormation.niveau}
                onChange={e => setNewFormation(f => ({ ...f, niveau: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                placeholder="Débutant, Intermédiaire..."
                required
              />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600 }}>Description</label>
            <textarea
              value={newFormation.description}
              onChange={e => setNewFormation(f => ({ ...f, description: e.target.value }))}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4, minHeight: 60 }}
              placeholder="Décrivez le contenu de la formation"
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Date</label>
              <input
                type="date"
                value={newFormation.dateDebut}
                onChange={e => setNewFormation(f => ({ ...f, dateDebut: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Heure de début</label>
              <input
                type="time"
                value={newFormation.heureDebut}
                onChange={e => setNewFormation(f => ({ ...f, heureDebut: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Heure de fin</label>
              <input
                type="time"
                value={newFormation.heureFin}
                onChange={e => setNewFormation(f => ({ ...f, heureFin: e.target.value }))}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.2px solid #e53935', marginTop: 4 }}
                required
              />
            </div>
          </div>
          {addError && <div style={{ color: '#e53935', marginBottom: 10 }}>{addError}</div>}
          <button type="submit" disabled={addLoading} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: addLoading ? 'not-allowed' : 'pointer', width: '100%' }}>
            {addLoading ? 'Ajout...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#e53935', margin: 0 }}>Formations</h2>
        <button
          style={{
            background: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(229,57,53,0.10)',
            transition: 'background 0.18s',
          }}
          onClick={() => setShowAddModal(true)}
        >
          + Ajouter une formation
        </button>
      </div>
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
      {loadingFormations ? (
        <div style={{ textAlign: 'center', color: '#e53935', fontWeight: 600, padding: 32 }}>Chargement...</div>
      ) : (
        <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(229,57,53,0.07)', borderCollapse: 'collapse', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#f7f7f7', color: '#e53935', fontWeight: 700 }}>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Titre</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Catégorie</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Niveau</th>
            </tr>
          </thead>
          <tbody>
            {formations.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 8px' }}>{f.titre}</td>
                <td style={{ padding: '12px 8px' }}>{f.categorie}</td>
                <td style={{ padding: '12px 8px' }}>{f.niveau}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showAddModal && <AddFormationModal />}
    </div>
  );
};

export default AdminFormations; 