const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Script pour extraire les invités du fichier Excel et générer le code TypeScript
function extractGuestsFromExcel() {
  try {
    // Lire le fichier Excel
    const workbook = XLSX.readFile('./public/liste.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir en JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Ignorer la première ligne (en-têtes)
    const rows = jsonData.slice(1);
    
    // Extraire les invités (colonne B = Prénom, colonne C = Nom, colonne D = Type d'invitation)
    const guests = rows
      .filter(row => row[1] && row[2]) // Filtrer les lignes vides
      .map(row => {
        const firstName = String(row[1] || '').trim();
        const lastName = String(row[2] || '').trim();
        
        // Déterminer le type d'invitation (colonne D ou logique par défaut)
        let invitationType = 'both'; // Par défaut, invité aux deux
        
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
    
    console.log(`✅ ${guests.length} invités extraits du fichier Excel`);
    
    // Générer le code TypeScript
    const guestCode = guests.map(guest => 
      `  { firstName: '${guest.firstName}', lastName: '${guest.lastName}', invitationType: '${guest.invitationType}' }`
    ).join(',\n');
    
    const fullCode = `import { Guest } from './excelReader';

// Liste des invités extraite du fichier Excel
export const guestList: Guest[] = [
${guestCode}
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
`;
    
    // Écrire le fichier
    const outputPath = path.join(__dirname, 'src', 'utils', 'guestData.ts');
    fs.writeFileSync(outputPath, fullCode);
    
    console.log(`✅ Fichier guestData.ts mis à jour avec ${guests.length} invités`);
    console.log('📁 Chemin:', outputPath);
    
    // Afficher les premiers invités pour vérification
    console.log('\n📋 Premiers invités extraits:');
    guests.slice(0, 5).forEach((guest, index) => {
      const typeText = guest.invitationType === 'benediction' ? '(Bénédiction nuptiale)' :
                      guest.invitationType === 'soiree' ? '(Soirée dansante)' :
                      '(Les deux événements)';
      console.log(`  ${index + 1}. ${guest.firstName} ${guest.lastName} ${typeText}`);
    });
    
    if (guests.length > 5) {
      console.log(`  ... et ${guests.length - 5} autres invités`);
    }
    
    // Statistiques des types d'invitation
    const stats = {
      benediction: guests.filter(g => g.invitationType === 'benediction').length,
      soiree: guests.filter(g => g.invitationType === 'soiree').length,
      both: guests.filter(g => g.invitationType === 'both').length
    };
    
    console.log('\n📊 Statistiques des invitations:');
    console.log(`  ⛪ Bénédiction nuptiale uniquement: ${stats.benediction}`);
    console.log(`  🎉 Soirée dansante uniquement: ${stats.soiree}`);
    console.log(`  🎊 Les deux événements: ${stats.both}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'extraction:', error.message);
    console.log('\n💡 Assurez-vous que:');
    console.log('  1. Le fichier liste.xlsx existe dans le dossier public/');
    console.log('  2. Le fichier contient des données dans les colonnes B (Prénom) et C (Nom)');
    console.log('  3. Vous avez installé les dépendances: npm install xlsx');
  }
}

// Exécuter l'extraction
extractGuestsFromExcel();
