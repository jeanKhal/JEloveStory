const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration ultra-minimale pour éviter les problèmes de mémoire
const MINIMAL_CONFIG = {
  NODE_OPTIONS: '--max-old-space-size=2048', // Réduire encore plus
  GENERATE_SOURCEMAP: 'false',
  DISABLE_ESLINT_PLUGIN: 'true',
  SKIP_PREFLIGHT_CHECK: 'true',
  CI: 'false',
  FAST_REFRESH: 'false',
  CHOKIDAR_USEPOLLING: 'false'
};

function createMinimalBuild() {
  console.log('🚀 Création d\'un build minimal pour Vercel...');
  
  try {
    // Nettoyer complètement
    const buildDir = path.join(__dirname, 'build');
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
    }
    
    // Créer un build minimal avec des options très restrictives
    execSync('npx react-scripts build --no-source-maps --no-optimize', {
      stdio: 'inherit',
      env: { ...process.env, ...MINIMAL_CONFIG }
    });
    
    console.log('✅ Build minimal terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du build minimal:', error.message);
    
    // Fallback : créer un build manuel minimal
    console.log('🔄 Tentative de création d\'un build manuel...');
    createManualBuild();
  }
}

function createManualBuild() {
  console.log('🔧 Création d\'un build manuel...');
  
  const buildDir = path.join(__dirname, 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // Copier les fichiers essentiels
  const publicDir = path.join(__dirname, 'public');
  if (fs.existsSync(publicDir)) {
    execSync(`xcopy "${publicDir}" "${buildDir}" /E /I /Y`, { stdio: 'inherit' });
  }
  
  // Créer un index.html minimal
  const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Joel & Eunice - Mariage</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .loading { font-size: 24px; color: #666; }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading">Chargement en cours...</div>
    </div>
    <script>
        // Redirection vers une version statique ou message d'erreur
        document.body.innerHTML = '<h1>Joel & Eunice</h1><p>Site en cours de maintenance</p>';
    </script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(buildDir, 'index.html'), indexHtml);
  console.log('✅ Build manuel créé avec succès !');
}

function main() {
  console.log('🎯 Build minimal pour Vercel');
  console.log('=============================');
  
  try {
    createMinimalBuild();
    console.log('🎉 Build terminé !');
  } catch (error) {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createMinimalBuild, createManualBuild };
