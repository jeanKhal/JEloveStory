import { Guest } from './excelReader';

// Liste des invités extraite du fichier Excel
export const guestList: Guest[] = [
  { firstName: 'FORTUNE', lastName: 'AKUZIBWE', invitationType: 'both' },
  { firstName: 'ELIE', lastName: 'GUPA', invitationType: 'both' },
  { firstName: 'DAVID', lastName: 'KABEYA', invitationType: 'both' },
  { firstName: 'PIERRE', lastName: 'KASONGA', invitationType: 'both' },
  { firstName: 'JOSUE', lastName: 'KATAMBA', invitationType: 'both' },
  { firstName: 'KELLY', lastName: 'KATEMBELE', invitationType: 'both' }
];

// Fonction pour charger la liste des invités depuis les données intégrées
export const loadGuestListFromData = async (): Promise<Guest[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return guestList;
};

// Fonction pour rechercher un invité (insensible à la casse et aux espaces)
export const findGuestInList = (firstName: string, lastName: string): Guest | undefined => {
  const cleanFirstName = firstName.toLowerCase().trim();
  const cleanLastName = lastName.toLowerCase().trim();
  
  return guestList.find(guest => 
    guest.firstName.toLowerCase().trim() === cleanFirstName &&
    guest.lastName.toLowerCase().trim() === cleanLastName
  );
};

// Fonction pour trouver un invité par son code d'invité
export const findGuestByCode = (guestCode: string): Guest | undefined => {
  // Générer le code d'invité pour chaque invité et comparer
  return guestList.find(guest => {
    const generatedCode = `${guest.firstName.toLowerCase().replace(/\s+/g, '')}${guest.lastName.toLowerCase().replace(/\s+/g, '')}`;
    return generatedCode === guestCode.toLowerCase();
  });
};

// Fonction pour valider l'authenticité d'une invitation
export const validateInvitation = (guestCode: string, invitationType: 'benediction' | 'soiree'): { isValid: boolean; guest?: Guest; message: string } => {
  const guest = findGuestByCode(guestCode);
  
  if (!guest) {
    return {
      isValid: false,
      message: 'Code d\'invitation invalide. Cette invitation n\'est pas reconnue.'
    };
  }
  
  if (guest.invitationType === 'both' || guest.invitationType === invitationType) {
    return {
      isValid: true,
      guest,
      message: `Invitation authentique pour ${guest.firstName} ${guest.lastName}`
    };
  } else {
    return {
      isValid: false,
      guest,
      message: `Ce code d'invitation ne correspond pas au type d'événement demandé.`
    };
  }
};

// Fonction pour générer un token d'authentification sécurisé
export const generateAuthToken = (guestCode: string, invitationType: 'benediction' | 'soiree'): string => {
  const timestamp = Date.now();
  const data = `${guestCode}-${invitationType}-${timestamp}`;
  // Simple hash pour l'exemple (en production, utiliser une méthode plus sécurisée)
  return btoa(data).replace(/[^a-zA-Z0-9]/g, '');
};

// Fonction hybride qui essaie d'abord le fichier Excel, puis utilise les données intégrées
export const loadGuestListHybrid = async (): Promise<Guest[]> => {
  try {
    const response = await fetch('/liste.xlsx');
    if (response.ok) {
      const { loadGuestListFromFile } = await import('./excelReader');
      return await loadGuestListFromFile();
    }
  } catch (error) {
    console.log('Fichier Excel non accessible, utilisation des données intégrées');
  }
  
  return await loadGuestListFromData();
};
