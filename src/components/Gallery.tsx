import React, { useState, useMemo } from 'react';
import './Gallery.css';
import OptimizedImage from './OptimizedImage';

// Importer toutes les images du dossier images
import image1 from '../images/1.jpeg';
import image2 from '../images/_MT_0042.jpeg';
import image3 from '../images/_MT_0117.jpeg';
import image4 from '../images/_MT_0125.jpeg';
import image5 from '../images/_MT_0194.jpeg';
import image6 from '../images/_MT_0204.jpeg';
import image7 from '../images/_MT_0221.jpeg';
import image8 from '../images/_MT_0236.jpeg';
import image9 from '../images/_MT_0021.jpeg';
import image10 from '../images/_MT_0251.jpeg';
import image11 from '../images/_MT_0320.jpeg';
import image12 from '../images/_MT_0326.jpeg';
import image13 from '../images/_MT_0336.jpeg';
import image14 from '../images/_MT_0357.jpeg';
import image15 from '../images/_MT_0389.jpeg';
import image16 from '../images/_MT_0575.jpeg';
import image17 from '../images/_MT_0581.jpeg';
import image18 from '../images/_MT_0584.jpeg';
import image19 from '../images/_MT_0592.jpeg';
import image20 from '../images/_MT_0602.jpeg';
import image21 from '../images/_MT_0606.jpeg';
import image22 from '../images/_MT_0647.jpeg';
import image23 from '../images/_MT_9965.jpeg';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Utiliser toutes les images disponibles avec des catégories
  const images = useMemo(() => [
    { src: image1, alt: 'Photo romantique 1', category: 'romantic' },
    { src: image2, alt: 'Photo romantique 2', category: 'romantic' },
    { src: image3, alt: 'Photo de couple 1', category: 'couple' },
    { src: image4, alt: 'Photo de couple 2', category: 'couple' },
    { src: image5, alt: 'Photo d\'engagement 1', category: 'engagement' },
    { src: image6, alt: 'Photo d\'engagement 2', category: 'engagement' },
    { src: image7, alt: 'Photo de préparation 1', category: 'preparation' },
    { src: image8, alt: 'Photo de préparation 2', category: 'preparation' },
    { src: image9, alt: 'Photo romantique 3', category: 'romantic' },
    { src: image10, alt: 'Photo de couple 3', category: 'couple' },
    { src: image11, alt: 'Photo d\'engagement 3', category: 'engagement' },
    { src: image12, alt: 'Photo de préparation 3', category: 'preparation' },
    { src: image13, alt: 'Photo romantique 4', category: 'romantic' },
    { src: image14, alt: 'Photo de couple 4', category: 'couple' },
    { src: image15, alt: 'Photo d\'engagement 4', category: 'engagement' },
    { src: image16, alt: 'Photo de préparation 4', category: 'preparation' },
    { src: image17, alt: 'Photo romantique 5', category: 'romantic' },
    { src: image18, alt: 'Photo de couple 5', category: 'couple' },
    { src: image19, alt: 'Photo d\'engagement 5', category: 'engagement' },
    { src: image20, alt: 'Photo de préparation 5', category: 'preparation' },
    { src: image21, alt: 'Photo romantique 6', category: 'romantic' },
    { src: image22, alt: 'Photo de couple 6', category: 'couple' },
    { src: image23, alt: 'Photo d\'engagement 6', category: 'engagement' }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'Toutes', icon: '📸' },
    { id: 'romantic', name: 'Romantiques', icon: '💕' },
    { id: 'couple', name: 'Couple', icon: '👫' },
    { id: 'engagement', name: 'Fiançailles', icon: '💍' },
    { id: 'preparation', name: 'Préparation', icon: '🎀' }
  ], []);

  // Filtrer les images selon la catégorie
  const filteredImages = useMemo(() => {
    return selectedCategory === 'all' 
      ? images 
      : images.filter(img => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Gérer le chargement des images
  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const openModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex].src);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  return (
    <div className="gallery-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="gallery-header">
        <h1 className="gallery-title">Galerie Photos</h1>
        <p className="gallery-subtitle">Revivez nos moments précieux</p>
        <div className="gallery-stats">
          <span className="stat-item">{images.length} photos</span>
          <span className="stat-item">{categories.length - 1} catégories</span>
        </div>
      </div>

      {/* Filtres de catégories */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            {category.id !== 'all' && (
              <span className="category-count">
                ({images.filter(img => img.category === category.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grille d'images avec lazy loading optimisé */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`gallery-item ${loadedImages.has(image.src) ? 'loaded' : 'loading'}`}
            onClick={() => openModal(image.src, index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              loading={index < 6 ? "eager" : "lazy"} // Charger les 6 premières images en priorité
              onLoad={() => handleImageLoad(image.src)}
              placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='150' y='100' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'%3EChargement...%3C/text%3E%3C/svg%3E"
            />
            <div className="image-overlay">
              <span className="view-icon">👁️</span>
              <span className="image-caption">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour afficher l'image en grand */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            
            <div className="modal-image-container">
              <OptimizedImage
                src={selectedImage}
                alt="Image en grand"
                className="modal-image"
                loading="eager"
                priority={true}
              />
            </div>

            <div className="modal-info">
              <p className="image-caption">
                {filteredImages[currentIndex]?.alt || 'Photo'}
              </p>
              <p className="image-counter">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>

            <div className="modal-navigation">
              <button className="nav-button prev" onClick={prevImage}>
                ‹
              </button>
              <button className="nav-button next" onClick={nextImage}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message si aucune image dans la catégorie */}
      {filteredImages.length === 0 && (
        <div className="no-images">
          <p>Aucune image dans cette catégorie pour le moment.</p>
        </div>
      )}

      {/* Statistiques de chargement */}
      <div className="loading-stats">
        <p>Images chargées : {loadedImages.size} / {filteredImages.length}</p>
      </div>
    </div>
  );
};

export default Gallery; 