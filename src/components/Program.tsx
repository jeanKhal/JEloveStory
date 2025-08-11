import React from 'react';
import './Program.css';

const Program: React.FC = () => {
  return (
    <section id="program" className="program">
      <div className="container">
        <div className="section-header">
          <h2>📅 Programme de la Journée</h2>
          <p>Le déroulé de notre journée spéciale</p>
        </div>
        
        <div className="program-content">
          <div className="program-timeline">
                         <div className="timeline-item">
               <div className="timeline-time">
                 <span className="time">14:00</span>
               </div>
               <div className="timeline-content">
                 <h3>⛪ Cérémonie Religieuse</h3>
                 <p>Bénédiction nuptiale à l'église</p>
                 <div className="timeline-details">
                   <p><strong>Lieu :</strong> Église principale</p>
                   <p><strong>Durée :</strong> ~1h30</p>
                 </div>
               </div>
             </div>
            
                         <div className="timeline-item">
               <div className="timeline-time">
                 <span className="time">16:00</span>
               </div>
               <div className="timeline-content">
                 <h3>📸 Séance Photo</h3>
                 <p>Photos officielles et souvenirs</p>
                 <div className="timeline-details">
                   <p><strong>Lieu :</strong> Jardins de KEMESHA</p>
                   <p><strong>Durée :</strong> ~1h</p>
                 </div>
               </div>
             </div>
            
                         <div className="timeline-item">
               <div className="timeline-time">
                 <span className="time">18:00</span>
               </div>
               <div className="timeline-content">
                 <h3>🍽️ Cocktail d'Accueil</h3>
                 <p>Rafraîchissements et apéritifs</p>
                 <div className="timeline-details">
                   <p><strong>Lieu :</strong> Terrasse KEMESHA</p>
                   <p><strong>Durée :</strong> ~1h</p>
                 </div>
               </div>
             </div>
            
                         <div className="timeline-item">
               <div className="timeline-time">
                 <span className="time">19:00</span>
               </div>
               <div className="timeline-content">
                 <h3>🎉 Soirée de Réception</h3>
                 <p>Dîner, danses et célébrations</p>
                 <div className="timeline-details">
                   <p><strong>Lieu :</strong> Salle principale KEMESHA</p>
                   <p><strong>Durée :</strong> Jusqu'à tard dans la nuit</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="program-notes">
            <div className="note-card">
              <h4>💡 Informations importantes</h4>
              <ul>
                <li>Merci d'arriver 15 minutes avant chaque événement</li>
                <li>Tenue de soirée élégante requise</li>
                <li>Parking disponible sur place</li>
                <li>Photographie autorisée (sauf pendant la cérémonie)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
