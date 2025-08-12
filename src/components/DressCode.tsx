import React from 'react';
import './DressCode.css';
// Images des couleurs du dress code avec Data URI
const dressCodeColors = [
  { name: 'Couleur 1', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY2QjZCIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5Db3VsZXVyIDE8L3RleHQ+Cjwvc3ZnPgo=' },
  { name: 'Couleur 2', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNENDRENDIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5Db3VsZXVyIDI8L3RleHQ+Cjwvc3ZnPgo=' },
  { name: 'Couleur 3', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDVCNzdEMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+Q291bGV1ciAzPC90ZXh0Pgo8L3N2Zz4K' },
  { name: 'Couleur 4', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTZDRUI0Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5Db3VsZXVyIDQ8L3RleHQ+Cjwvc3ZnPgo=' }
];

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

                     <div className="dresscode-colors">
             <h3>🎨 Palette de Couleurs</h3>
             <p>Voici les couleurs que nous avons choisies pour notre journée spéciale</p>
                                                       <div className="color-palette">
                 {dressCodeColors.map((colorItem, index) => (
                   <div key={index} className="color-item">
                     <img 
                       src={colorItem.image} 
                       alt={colorItem.name}
                       className="color-image"
                     />
                     <span className="color-name">{colorItem.name}</span>
                   </div>
                 ))}
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