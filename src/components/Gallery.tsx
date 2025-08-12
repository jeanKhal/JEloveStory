import React, { useState } from 'react';
import './Gallery.css';

// Images de la galerie avec les vraies photos
const image1 = '/images/_MT_0021.jpeg';
const image2 = '/images/_MT_0042.jpeg';
const image3 = '/images/_MT_0117.jpeg';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const images: ImageItem[] = [
    { id: 1, src: image1, alt: "Joel & Eunice - Moment romantique" },
    { id: 2, src: image2, alt: "Joel & Eunice - Portrait élégant" },
    { id: 3, src: image3, alt: "Joel & Eunice - Cérémonie" }
  ];

  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setSelectedImage(images[prevIndex]);
    }
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2>📸 Notre Galerie</h2>
          <p>Découvrez les plus beaux moments de notre histoire d'amour</p>
        </div>

        {/* Grille de photos */}
        <div className="gallery-grid">
          {images.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <div className="image-container">
                <img src={image.src} alt={image.alt} />
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
                <h3>Joel Eunice Wedding</h3>
                <p>Photo {images.findIndex(img => img.id === selectedImage.id) + 1} sur {images.length}</p>
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