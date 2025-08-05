import { Guest } from './excelReader';

// Liste des invités intégrée directement dans le code
// Cette liste remplace le fichier Excel pour permettre la vérification en ligne
export const guestList: Guest[] = [
  // Ajoutez ici la liste complète de vos invités
  // Format: { firstName: 'Prénom', lastName: 'Nom' }
  { firstName: 'Jean', lastName: 'Dupont' },
  { firstName: 'Marie', lastName: 'Martin' },
  { firstName: 'Pierre', lastName: 'Bernard' },
  { firstName: 'Sophie', lastName: 'Petit' },
  { firstName: 'Lucas', lastName: 'Robert' },
  { firstName: 'Emma', lastName: 'Richard' },
  { firstName: 'Thomas', lastName: 'Durand' },
  { firstName: 'Julie', lastName: 'Moreau' },
  { firstName: 'Nicolas', lastName: 'Simon' },
  { firstName: 'Camille', lastName: 'Michel' },
  { firstName: 'Alexandre', lastName: 'Leroy' },
  { firstName: 'Sarah', lastName: 'Roux' },
  { firstName: 'David', lastName: 'David' },
  { firstName: 'Laura', lastName: 'Bertrand' },
  { firstName: 'Antoine', lastName: 'Morel' },
  // Ajoutez tous vos invités ici...
];

// Fonction pour charger la liste des invités depuis les données intégrées
export const loadGuestListFromData = async (): Promise<Guest[]> => {
  // Simulation d'un délai de chargement pour une meilleure UX
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return guestList;
};

// Fonction pour rechercher un invité (insensible à la casse)
export const findGuestInList = (firstName: string, lastName: string): Guest | undefined => {
  return guestList.find(guest => 
    guest.firstName.toLowerCase() === firstName.toLowerCase() &&
    guest.lastName.toLowerCase() === lastName.toLowerCase()
  );
}; 