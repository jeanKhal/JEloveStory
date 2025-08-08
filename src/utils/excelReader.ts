import * as XLSX from 'xlsx';

// Utilitaire pour lire les fichiers Excel des invités

export interface Guest {
  firstName: string;
  lastName: string;
  invitationType: 'benediction' | 'soiree' | 'both'; // Type d'invitation
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
      .map(row => {
        const firstName = String(row[1] || '').trim(); // Colonne B = Prénom
        const lastName = String(row[2] || '').trim();  // Colonne C = Nom
        
        // Déterminer le type d'invitation (colonne D ou logique par défaut)
        let invitationType: 'benediction' | 'soiree' | 'both' = 'both'; // Par défaut, invité aux deux
        
        if (row[3]) {
          const typeValue = String(row[3]).toLowerCase().trim();
          if (typeValue.includes('bénédiction') || typeValue.includes('benediction') || typeValue === 'b') {
            invitationType = 'benediction';
          } else if (typeValue.includes('soirée') || typeValue.includes('soiree') || typeValue === 's') {
            invitationType = 'soiree';
          } else if (typeValue.includes('les deux') || typeValue.includes('both') || typeValue === 'x') {
            invitationType = 'both';
          }
        }
        
        return {
          firstName,
          lastName,
          invitationType
        };
      })
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
          .map(row => {
            const firstName = String(row[1] || '').trim(); // Colonne B = Prénom
            const lastName = String(row[2] || '').trim();  // Colonne C = Nom
            
            // Déterminer le type d'invitation (colonne D ou logique par défaut)
            let invitationType: 'benediction' | 'soiree' | 'both' = 'both'; // Par défaut, invité aux deux
            
            if (row[3]) {
              const typeValue = String(row[3]).toLowerCase().trim();
              if (typeValue.includes('bénédiction') || typeValue.includes('benediction') || typeValue === 'b') {
                invitationType = 'benediction';
              } else if (typeValue.includes('soirée') || typeValue.includes('soiree') || typeValue === 's') {
                invitationType = 'soiree';
              } else if (typeValue.includes('les deux') || typeValue.includes('both') || typeValue === 'x') {
                invitationType = 'both';
              }
            }
            
            return {
              firstName,
              lastName,
              invitationType
            };
          })
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
    { firstName: 'Jean', lastName: 'Dupont', invitationType: 'both' },
    { firstName: 'Marie', lastName: 'Martin', invitationType: 'benediction' },
    { firstName: 'Pierre', lastName: 'Bernard', invitationType: 'soiree' },
    { firstName: 'Sophie', lastName: 'Petit', invitationType: 'both' },
    { firstName: 'Lucas', lastName: 'Robert', invitationType: 'benediction' },
    { firstName: 'Emma', lastName: 'Richard', invitationType: 'soiree' },
    { firstName: 'Thomas', lastName: 'Durand', invitationType: 'both' },
    { firstName: 'Julie', lastName: 'Moreau', invitationType: 'benediction' },
    { firstName: 'Nicolas', lastName: 'Simon', invitationType: 'soiree' },
    { firstName: 'Camille', lastName: 'Michel', invitationType: 'both' },
    { firstName: 'Alexandre', lastName: 'Leroy', invitationType: 'benediction' },
    { firstName: 'Sarah', lastName: 'Roux', invitationType: 'soiree' },
    { firstName: 'David', lastName: 'David', invitationType: 'both' },
    { firstName: 'Laura', lastName: 'Bertrand', invitationType: 'benediction' },
    { firstName: 'Antoine', lastName: 'Morel', invitationType: 'soiree' },
  ];
};

// Fonction pour rechercher un invité (insensible à la casse et aux espaces)
export const findGuest = (guests: Guest[], firstName: string, lastName: string): Guest | undefined => {
  const cleanFirstName = firstName.toLowerCase().trim();
  const cleanLastName = lastName.toLowerCase().trim();
  
  return guests.find(guest => 
    guest.firstName.toLowerCase().trim() === cleanFirstName &&
    guest.lastName.toLowerCase().trim() === cleanLastName
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