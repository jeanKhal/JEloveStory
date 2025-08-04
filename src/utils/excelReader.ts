import * as XLSX from 'xlsx';

// Utilitaire pour lire les fichiers Excel des invités

export interface Guest {
  firstName: string;
  lastName: string;
}

// Fonction pour charger le fichier Excel depuis le dossier public
export const loadGuestListFromFile = async (): Promise<Guest[]> => {
  try {
    // Charger le fichier depuis le dossier public
    const response = await fetch('/liste.xlsx');
    
    if (!response.ok) {
      throw new Error('Fichier liste.xlsx non trouvé');
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    
    // Lire le fichier Excel
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Prendre la première feuille
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir en JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Ignorer la première ligne (en-têtes)
    const rows = jsonData.slice(1) as any[][];
    
    const guests: Guest[] = rows
      .filter(row => row[1] && row[2]) // Filtrer les lignes vides (colonne B et C)
      .map(row => ({
        firstName: String(row[1] || '').trim(), // Colonne B = Prénom
        lastName: String(row[2] || '').trim(),  // Colonne C = Nom
      }))
      .filter(guest => guest.firstName && guest.lastName); // Filtrer les invités sans nom
    
    return guests;
  } catch (error) {
    console.error('Erreur lors du chargement du fichier liste.xlsx:', error);
    throw new Error('Impossible de charger la liste des invités');
  }
};

// Fonction pour lire un fichier Excel uploadé (gardé pour compatibilité)
export const readGuestListFromExcel = async (file: File): Promise<Guest[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Prendre la première feuille
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convertir en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Ignorer la première ligne (en-têtes)
        const rows = jsonData.slice(1) as any[][];
        
        const guests: Guest[] = rows
          .filter(row => row[1] && row[2]) // Filtrer les lignes vides (colonne B et C)
          .map(row => ({
            firstName: String(row[1] || '').trim(), // Colonne B = Prénom
            lastName: String(row[2] || '').trim(),  // Colonne C = Nom
          }))
          .filter(guest => guest.firstName && guest.lastName); // Filtrer les invités sans nom
        
        resolve(guests);
      } catch (error) {
        reject(new Error('Erreur lors de la lecture du fichier Excel'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Fonction pour simuler la lecture d'un fichier Excel (fallback)
export const readGuestList = async (): Promise<Guest[]> => {
  // En production, ceci ferait un appel API vers le backend
  // qui lirait le fichier Excel réel
  
  // Simulation d'un délai de chargement
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Données simulées (remplaceraient les données du fichier Excel)
  return [
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
  ];
};

// Fonction pour rechercher un invité (insensible à la casse)
export const findGuest = (guests: Guest[], firstName: string, lastName: string): Guest | undefined => {
  return guests.find(guest => 
    guest.firstName.toLowerCase() === firstName.toLowerCase() &&
    guest.lastName.toLowerCase() === lastName.toLowerCase()
  );
};

// Fonction pour valider un email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour générer un code d'invité unique
export const generateGuestCode = (firstName: string, lastName: string): string => {
  const timestamp = Date.now().toString().slice(-4);
  return `${firstName.toUpperCase()}${lastName.toUpperCase()}${timestamp}`;
};

// Fonction pour formater un numéro de téléphone
export const formatPhoneNumber = (phone: string): string => {
  // Supprime tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '');
  
  // Format congolais: +243 XXX XXX XXX
  if (cleaned.startsWith('243') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return phone;
}; 