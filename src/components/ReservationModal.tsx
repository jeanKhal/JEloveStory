import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Formation, Reservation } from '../types/formation';
import './ReservationModal.css';

interface ReservationModalProps {
  formation: Formation | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ formation, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nombreParticipants: 1,
    commentaires: '',
    typeReservation: 'Conférence',
    dateReservation: '',
    heureDebut: '',
    heureFin: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formation) {
        // Réservation d'une formation : seulement prénom, nom, email, téléphone
        await addDoc(collection(db, 'inscriptionsFormations'), {
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          formationId: formation.id,
          formationTitre: formation.titre
        });
      } else {
        // Réservation de salle : formulaire complet
        const reservationData: Omit<Reservation, 'id'> & { typeReservation: string, dateReservation: string, heureDebut: string, heureFin: string } = {
          formationId: 'salle',
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          dateReservation: formData.dateReservation,
          statut: 'En attente',
          nombreParticipants: parseInt(formData.nombreParticipants.toString()),
          commentaires: formData.commentaires,
          typeReservation: formData.typeReservation,
          heureDebut: formData.heureDebut,
          heureFin: formData.heureFin
        };
        await addDoc(collection(db, 'reservations'), reservationData);
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          nombreParticipants: 1,
          commentaires: '',
          typeReservation: 'Conférence',
          dateReservation: '',
          heureDebut: '',
          heureFin: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {success ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Réservation confirmée !</h3>
            <p>Votre réservation a été enregistrée avec succès. Nous vous contacterons bientôt pour confirmer les détails.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{formation ? 'Réserver cette formation' : 'Réserver la salle du Numérique'}</h2>
              <p className="formation-title">{formation ? formation.titre : 'Réservation de la salle'}</p>
            </div>
            <form onSubmit={handleSubmit} className="reservation-form">
              {formation ? (
                <>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Numéro de téléphone *</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                      placeholder="+243..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="nom">Nom complet *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone *</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombreParticipants">Nombre de participants *</label>
                    <select
                      id="nombreParticipants"
                      name="nombreParticipants"
                      value={formData.nombreParticipants}
                      onChange={handleInputChange}
                      required
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'participant' : 'participants'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="typeReservation">Type de réservation *</label>
                    <select
                      id="typeReservation"
                      name="typeReservation"
                      value={formData.typeReservation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Conférence">Conférence</option>
                      <option value="Formation">Formation</option>
                      <option value="Atelier">Atelier</option>
                      <option value="Séance pratique">Séance pratique</option>
                      <option value="Workspace">Workspace</option>
                      <option value="E-Workspace">E-Workspace</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateReservation">Date de réservation *</label>
                    <input
                      type="date"
                      id="dateReservation"
                      name="dateReservation"
                      value={formData.dateReservation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="heureDebut">Heure de début *</label>
                    <input
                      type="time"
                      id="heureDebut"
                      name="heureDebut"
                      value={formData.heureDebut}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="heureFin">Heure de fin *</label>
                    <input
                      type="time"
                      id="heureFin"
                      name="heureFin"
                      value={formData.heureFin}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="commentaires">Commentaires</label>
                    <textarea
                      id="commentaires"
                      name="commentaires"
                      value={formData.commentaires}
                      onChange={handleInputChange}
                      placeholder="Commentaires ou besoins particuliers"
                    />
                  </div>
                </>
              )}
              <button type="submit" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Réserver'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationModal; 