const fs = require('fs');
const path = require('path');

function createStaticBuild() {
  console.log('🚀 Création d\'un build statique pour Vercel...');
  
  const buildDir = path.join(__dirname, 'build');
  
  // Nettoyer le dossier build
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(buildDir, { recursive: true });
  
  // Créer un index.html statique fonctionnel
  const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Joel & Eunice - Mariage" />
    <title>Joel & Eunice - Mariage</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .date {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        .message {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .contact {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        .contact h3 {
            margin-bottom: 1rem;
        }
        .contact p {
            margin-bottom: 0.5rem;
        }
        .hearts {
            font-size: 2rem;
            margin: 2rem 0;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hearts">💕</div>
        <h1>Joel & Eunice</h1>
        <div class="subtitle">Nous nous marions !</div>
        
        <div class="date">
            <strong>Date :</strong> [Date du mariage]<br>
            <strong>Lieu :</strong> KEMESHA, Kinshasa, RDC
        </div>
        
        <div class="message">
            Nous sommes ravis de partager ce moment spécial avec vous.<br>
            Votre présence rendra cette journée encore plus mémorable.
        </div>
        
        <div class="contact">
            <h3>📞 Contact</h3>
            <p>📧 Email : contact@joel-eunice-wedding.com</p>
            <p>📱 Téléphone : +243 XXX XXX XXX</p>
        </div>
        
        <div class="hearts">💒</div>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(buildDir, 'index.html'), indexHtml);
  
  // Créer un fichier .nojekyll pour GitHub Pages/Vercel
  fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');
  
  // Créer un fichier _redirects pour Vercel
  const redirects = `/*    /index.html   200`;
  fs.writeFileSync(path.join(buildDir, '_redirects'), redirects);
  
  console.log('✅ Build statique créé avec succès !');
  console.log('📁 Dossier build créé avec index.html statique');
  console.log('🚀 Prêt pour le déploiement sur Vercel !');
}

// Exécuter si appelé directement
if (require.main === module) {
  createStaticBuild();
}

module.exports = { createStaticBuild };
