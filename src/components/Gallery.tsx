import React, { useState } from 'react';
import './Gallery.css';
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

  const images = [
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
  ];

  const categories = [
    { id: 'all', name: 'Toutes', icon: '📸' },
    { id: 'romantic', name: 'Romantiques', icon: '💕' },
    { id: 'couple', name: 'Couple', icon: '👫' },
    { id: 'engagement', name: 'Fiançailles', icon: '💍' },
    { id: 'preparation', name: 'Préparation', icon: '🎀' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
    <div className="gallery-page" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="container">
        <div className="gallery-header">
          <h1>Notre Galerie</h1>
          <p>Revivez nos moments précieux ensemble</p>
        </div>

        {/* Filtres par catégorie */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Grille de photos */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={`gallery-item-${image.alt.replace(/\s+/g, '-')}-${index}`}
              className="gallery-item"
              onClick={() => openModal(image.src, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <div className="overlay-content">
                  <span className="zoom-icon">🔍</span>
                  <p className="image-caption">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour l'aperçu des images */}
        {selectedImage ? (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              
              <button className="modal-nav prev" onClick={prevImage}>
                ‹
              </button>
              
              <div className="modal-image-container">
                <img
                  src={selectedImage}
                  alt="Aperçu"
                  className="modal-image"
                />
                <div className="modal-caption">
                  {filteredImages[currentIndex]?.alt}
                </div>
              </div>
              
              <button className="modal-nav next" onClick={nextImage}>
                ›
              </button>
              
              <div className="modal-indicators">
                {filteredImages.map((image, index) => (
                  <button
                    key={`indicator-${image.alt.replace(/\s+/g, '-')}-${index}`}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSelectedImage(filteredImages[index].src);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Section statistiques */}
        <div className="gallery-stats">
          <div className="stat-item">
            <div className="stat-number">{images.length}</div>
            <div className="stat-label">Photos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{categories.length - 1}</div>
            <div className="stat-label">Catégories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Années</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 