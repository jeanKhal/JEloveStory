import React from 'react';
import './DressCode.css';

const DressCode: React.FC = () => {
  return (
    <section id="dresscode" className="dresscode">
      <div className="container">
        <div className="section-header">
          <h2>👗 Dress Code</h2>
          <p>Pour la bénédiction nuptiale</p>
        </div>

        <div className="dresscode-content">
          <div className="dresscode-intro">
            <p>
              Pour célébrer ce moment sacré dans la plus belle des manières, nous vous invitons à respecter un dress code élégant et respectueux.
            </p>
          </div>

          <div className="dresscode-details">
            <div className="dresscode-section">
              <h3>👔 Pour les Messieurs</h3>
              <div className="dresscode-items">
                <div className="dresscode-item">
                  <span className="item-icon">🎩</span>
                  <span className="item-text">Costume ou complet élégant</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">👔</span>
                  <span className="item-text">Cravate ou nœud papillon</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">👞</span>
                  <span className="item-text">Chaussures fermées et élégantes</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">💼</span>
                  <span className="item-text">Éviter les tenues trop décontractées</span>
                </div>
              </div>
            </div>

            <div className="dresscode-section">
              <h3>👗 Pour les Dames</h3>
              <div className="dresscode-items">
                <div className="dresscode-item">
                  <span className="item-icon">👗</span>
                  <span className="item-text">Robe élégante ou tenue de cérémonie</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">👠</span>
                  <span className="item-text">Escarpins ou chaussures élégantes</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">💍</span>
                  <span className="item-text">Accessoires discrets et raffinés</span>
                </div>
                <div className="dresscode-item">
                  <span className="item-icon">🎀</span>
                  <span className="item-text">Privilégier les couleurs sobres et élégantes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dresscode-note">
            <div className="note-content">
              <h4>💡 Note importante</h4>
              <p>
                Nous vous remercions de respecter ce dress code pour honorer la solennité de ce moment sacré. 
                Votre élégance contribuera à la beauté de cette célébration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode; 