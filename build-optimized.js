const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration pour optimiser le build
const BUILD_CONFIG = {
  NODE_OPTIONS: '--max-old-space-size=3072', // Réduire à 3GB au lieu de 4GB
  GENERATE_SOURCEMAP: 'false',
  DISABLE_ESLINT_PLUGIN: 'true',
  SKIP_PREFLIGHT_CHECK: 'true',
  CI: 'false'
};

function setEnvironmentVariables() {
  console.log('🔧 Configuration des variables d\'environnement...');
  
  Object.entries(BUILD_CONFIG).forEach(([key, value]) => {
    process.env[key] = value;
    console.log(`  ${key}=${value}`);
  });
}

function cleanupBeforeBuild() {
  console.log('🧹 Nettoyage avant le build...');
  
  // Supprimer le dossier build existant
  const buildDir = path.join(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log('  ✅ Dossier build supprimé');
  }
  
  // Nettoyer le cache
  const cacheDir = path.join(__dirname, 'node_modules', '.cache');
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('  ✅ Cache nettoyé');
  }
}

function runBuild() {
  console.log('🚀 Démarrage du build optimisé...');
  
  try {
    // Exécuter le build avec les optimisations
    execSync('npx react-scripts build', {
      stdio: 'inherit',
      env: { ...process.env, ...BUILD_CONFIG }
    });
    
    console.log('✅ Build terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du build:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🎯 Build optimisé pour Vercel');
  console.log('================================');
  
  try {
    setEnvironmentVariables();
    cleanupBeforeBuild();
    runBuild();
    
    console.log('🎉 Build optimisé terminé avec succès !');
  } catch (error) {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main();
}

module.exports = { main, BUILD_CONFIG };
