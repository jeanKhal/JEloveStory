export interface Formation {
  id: string;
  titre: string;
  description: string;
  duree: string;
  prix: number;
  capacite: number;
  dateDebut: string;
  dateFin: string;
  horaire: string;
  lieu: string;
  formateur: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  categorie: string;
  imageUrl?: string;
  placesDisponibles: number;
}

export interface Reservation {
  id: string;
  formationId: string;
  nom: string;
  email: string;
  telephone: string;
  dateReservation: string;
  statut: 'En attente' | 'Confirmée' | 'Annulée';
  nombreParticipants: number;
  commentaires?: string;
}

export interface Contact {
  nom: string;
  email: string;
  telephone: string;
  message: string;
} 