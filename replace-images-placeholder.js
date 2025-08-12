const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const BACKUP_DIR = path.join(__dirname, 'public', 'images-backup');

// Créer le dossier de backup s'il n'existe pas
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function createPlaceholderImage(filename, width = 400, height = 300) {
  const name = path.parse(filename).name;
  const ext = path.extname(filename).toLowerCase();
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}" opacity="0.8"/>
    <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" font-weight="bold">${name}</text>
    <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.9">Placeholder</text>
    <text x="50%" y="80%" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" opacity="0.7">${width}x${height}</text>
  </svg>`;
  
  return Buffer.from(svg);
}

function replaceWithPlaceholder(filePath) {
  try {
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();
    
    // Backup de l'image originale
    const backupPath = path.join(BACKUP_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`✅ Backup créé: ${filename}`);
    }

    // Créer un placeholder
    const placeholder = createPlaceholderImage(filename);
    
    // Sauvegarder avec l'extension originale
    fs.writeFileSync(filePath, placeholder);
    console.log(`✅ Placeholder créé: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Erreur pour ${filePath}:`, error.message);
  }
}

function replaceImages() {
  console.log('🚀 Remplacement des images par des placeholders...');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Dossier images non trouvé');
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });

  console.log(`📁 ${imageFiles.length} images trouvées`);

  imageFiles.forEach(file => {
    const filePath = path.join(IMAGES_DIR, file);
    replaceWithPlaceholder(filePath);
  });

  console.log('✅ Remplacement terminé !');
}

// Exécuter le remplacement
replaceImages();
