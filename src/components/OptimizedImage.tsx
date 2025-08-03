import React, { useState, useEffect, useRef, useCallback } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observer pour le lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Charger 50px avant que l'image soit visible
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, loading]);

  // Gérer le chargement de l'image
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Gérer les erreurs de chargement
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  // Charger l'image quand elle est en vue
  useEffect(() => {
    if (isInView && imgRef.current) {
      const img = imgRef.current;
      
      // Optimisations pour le chargement
      img.decoding = 'async';
      img.crossOrigin = 'anonymous';
      
      // Charger directement l'image
      img.src = src;
    }
  }, [isInView, src]);

  return (
    <div className={`optimized-image-container ${className}`}>
      {/* Image principale - Affichage direct */}
      <img
        ref={imgRef}
        src={isInView ? src : ''}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0.8, // Légère transparence pendant le chargement
          transition: 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Message d'erreur */}
      {hasError && (
        <div className="image-error">
          <span>⚠️ Erreur de chargement</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 