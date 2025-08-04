import React, { useState } from 'react';
import './Gallery.css';

// Import des images (sélection de 10 photos)
const image1 = '/images/_MT_0021.jpeg';
const image2 = '/images/_MT_0042.jpeg';
const image3 = '/images/_MT_0117.jpeg';
const image4 = '/images/_MT_0125.jpeg';
const image5 = '/images/_MT_0194.jpeg';
const image6 = '/images/_MT_0204.jpeg';
const image7 = '/images/_MT_0221.jpeg';
const image8 = '/images/_MT_0236.jpeg';
const image9 = '/images/_MT_0251.jpeg';
const image10 = '/images/_MT_0320.jpeg';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const images: ImageItem[] = [
    { id: 1, src: image1, alt: "Joel & Eunice - Moment romantique", category: "romantic" },
    { id: 2, src: image2, alt: "Joel & Eunice - Portrait élégant", category: "portrait" },
    { id: 3, src: image3, alt: "Joel & Eunice - Cérémonie", category: "ceremony" },
    { id: 4, src: image4, alt: "Joel & Eunice - Réception", category: "reception" },
    { id: 5, src: image5, alt: "Joel & Eunice - Mariage", category: "wedding" },
    { id: 6, src: image6, alt: "Joel & Eunice - Cérémonie religieuse", category: "ceremony" },
    { id: 7, src: image7, alt: "Joel & Eunice - Dîner de mariage", category: "reception" },
    { id: 8, src: image8, alt: "Joel & Eunice - Soirée dansante", category: "reception" },
    { id: 9, src: image9, alt: "Joel & Eunice - Portrait officiel", category: "portrait" },
    { id: 10, src: image10, alt: "Joel & Eunice - Moment intime", category: "romantic" }
  ];

  const filters = [
    { id: 'all', label: 'Toutes les photos' },
    { id: 'romantic', label: 'Moments romantiques' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'ceremony', label: 'Cérémonies' },
    { id: 'reception', label: 'Réceptions' },
    { id: 'wedding', label: 'Mariage' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };



  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2>📸 Notre Galerie</h2>
          <p>Découvrez les plus beaux moments de notre histoire d'amour</p>
        </div>

        {/* Filtres */}
        <div className="gallery-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grille de photos */}
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <div className="image-container">
                <img src={image.src} alt={image.alt} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="zoom-icon">🔍</span>
                    <p className="image-caption">{image.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
              
              <div className="modal-image-container">
                <img src={selectedImage.src} alt={selectedImage.alt} />
              </div>
              
              <div className="modal-info">
                <h3>{selectedImage.alt}</h3>
                <p>Photo {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} sur {filteredImages.length}</p>
              </div>
              
              <button className="modal-nav prev" onClick={prevImage}>
                ‹
              </button>
              <button className="modal-nav next" onClick={nextImage}>
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery; 