const fs = require('fs');
const path = require('path');

// Fonction pour supprimer les fichiers volumineux
function removeLargeFiles() {
  const directories = ['src/assets', 'src/IMAGES'];
  const largeFiles = [
    'icon.png',
    'histoire.JPG',
    '1.jpeg'
  ];
  
  // Patterns pour les images MT volumineuses
  const mtPattern = /_MT_.*\.jpeg$/;
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        // Supprimer les fichiers volumineux (> 1MB) ou les fichiers spécifiés
        if (stats.size > 1024 * 1024 || largeFiles.includes(file) || mtPattern.test(file)) {
          console.log(`🗑️ Suppression de ${filePath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
          fs.unlinkSync(filePath);
        }
      });
    }
  });
}

// Fonction pour créer des images de remplacement optimisées
function createOptimizedPlaceholders() {
  const assetsDir = 'src/assets';
  
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Créer un fichier SVG simple comme placeholder pour l'icon
  const iconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f0f0f0"/>
    <text x="16" y="20" text-anchor="middle" font-size="12" fill="#666">Icon</text>
  </svg>`;
  
  fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSvg);
  console.log('✅ Fichier icon.svg créé');
}

// Fonction principale
function optimizeImages() {
  console.log('🚀 Début de l\'optimisation des images...');
  
  try {
    removeLargeFiles();
    createOptimizedPlaceholders();
    
    console.log('✅ Optimisation terminée avec succès !');
    console.log('📝 Les images volumineuses ont été supprimées pour éviter les problèmes de mémoire lors du build.');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
    process.exit(1);
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };
