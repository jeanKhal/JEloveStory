// Utilitaires d'optimisation des images

// Configuration pour l'optimisation des images
export const IMAGE_CONFIG = {
  // Qualité de compression pour les images
  quality: 0.8,
  
  // Formats supportés
  formats: ['webp', 'jpeg', 'png'],
  
  // Tailles d'images pour différentes résolutions
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    hero: 1920
  },
  
  // Lazy loading offset
  lazyOffset: 50
};

// Fonction pour créer des placeholders d'images
export const createImagePlaceholder = (width: number, height: number, text: string = 'Loading...') => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fond gris clair
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);
    
    // Texte de chargement
    ctx.fillStyle = '#999';
    ctx.font = '14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL();
};

// Optimisation du chargement des images
export const optimizeImageLoading = (images: string[]) => {
  // Créer un pool de préchargement
  const imagePool: HTMLImageElement[] = [];
  
  images.forEach((src, index) => {
    const img = new Image();
    
    // Optimisations pour un chargement plus rapide
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    
    img.onload = () => {
      console.log(`Image ${index + 1} chargée avec succès`);
      // Ajouter à la pool pour réutilisation
      imagePool.push(img);
    };
    
    img.onerror = () => {
      console.warn(`Erreur de chargement pour l'image ${index + 1}: ${src}`);
    };
    
    // Charger l'image
    img.src = src;
  });
  
  return imagePool;
};

// Fonction pour précharger les images critiques
const preloadCriticalImages = (images: string[]): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      let loadedCount = 0;
      const criticalImages = images.slice(0, 4); // Les 4 premières images
      
      if (criticalImages.length === 0) {
        resolve();
        return;
      }
      
      criticalImages.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === criticalImages.length) {
            resolve();
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === criticalImages.length) {
            resolve();
          }
        };
        img.src = src;
      });
    } catch (error) {
      console.error('Error in preloadCriticalImages:', error);
      resolve(); // Resolve anyway to prevent blocking
    }
  });
};

export { preloadCriticalImages };

// Fonction pour détecter la connexion réseau
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false
    };
  }
  return null;
};

// Fonction pour ajuster la qualité selon la connexion
export const getOptimalImageQuality = () => {
  const networkInfo = getNetworkInfo();
  
  if (networkInfo) {
    if (networkInfo.saveData || networkInfo.effectiveType === 'slow-2g') {
      return 0.6;
    }
    if (networkInfo.effectiveType === '2g' || networkInfo.effectiveType === '3g') {
      return 0.7;
    }
  }
  
  return IMAGE_CONFIG.quality;
};

// Fonction pour créer des URLs d'images optimisées
export const createOptimizedImageUrl = (originalUrl: string, width?: number, quality?: number) => {
  // Pour l'instant, retourner l'URL originale
  // Dans un vrai projet, on utiliserait un service comme Cloudinary ou ImageKit
  return originalUrl;
};

// Cache pour les images préchargées
const imageCache = new Map<string, HTMLImageElement>();

// Fonction pour mettre en cache une image
export const cacheImage = (src: string): Promise<HTMLImageElement> => {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to cache image: ${src}`));
    img.src = src;
  });
};

// Fonction pour nettoyer le cache
export const clearImageCache = () => {
  imageCache.clear();
};

// Fonction pour obtenir la taille optimale d'image selon l'écran
export const getOptimalImageSize = () => {
  const width = window.innerWidth;
  
  if (width <= 480) return IMAGE_CONFIG.sizes.small;
  if (width <= 768) return IMAGE_CONFIG.sizes.medium;
  if (width <= 1200) return IMAGE_CONFIG.sizes.large;
  
  return IMAGE_CONFIG.sizes.hero;
};

// Export par défaut pour compatibilité
export default {
  preloadCriticalImages,
  optimizeImageLoading,
  createImagePlaceholder,
  getNetworkInfo,
  getOptimalImageQuality,
  createOptimizedImageUrl,
  cacheImage,
  clearImageCache,
  getOptimalImageSize
}; 