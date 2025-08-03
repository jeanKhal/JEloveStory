// Configuration des images
const IMAGE_CONFIG = {
  quality: 0.8,
  sizes: {
    small: 480,
    medium: 768,
    large: 1200,
    hero: 1920
  },
  lazyThreshold: 0.1
};

// Cache pour éviter les rechargements multiples
const preloadCache = new Set<string>();

// Fonction pour créer un placeholder SVG
export const createImagePlaceholder = (width: number, height: number, text: string = 'Loading...') => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `)}`;
};

// Fonction optimisée pour le chargement d'images
export const optimizeImageLoading = (images: string[]) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: `${IMAGE_CONFIG.lazyThreshold * 100}%`
  });

  return observer;
};

// Fonction optimisée pour précharger les images critiques
const preloadCriticalImages = (images: string[]): Promise<void> => {
  return new Promise<void>((resolve) => {
    try {
      let loadedCount = 0;
      const criticalImages = images.slice(0, 2); // Réduire à 2 images seulement
      
      if (criticalImages.length === 0) {
        resolve();
        return;
      }
      
      criticalImages.forEach((src) => {
        // Éviter les rechargements multiples
        if (preloadCache.has(src)) {
          loadedCount++;
          if (loadedCount === criticalImages.length) {
            resolve();
          }
          return;
        }
        
        preloadCache.add(src);
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
      // Supprimer les logs en production
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error in preloadCriticalImages:', error);
      }
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
  preloadCache.clear();
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