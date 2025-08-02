import React from 'react';
import './Program.css';

const Program: React.FC = () => {
  const timeline = [
    {
      time: '14h00',
      title: 'Cérémonie Religieuse',
      location: 'Église Saint-Pierre',
      description: 'Cérémonie traditionnelle en présence de nos familles et amis',
      icon: '⛪',
      duration: '1h30'
    },
    {
      time: '15h45',
      title: 'Cocktail de Mariage',
      location: 'Jardin du Château',
      description: 'Apéritif et photos avec tous nos invités',
      icon: '🥂',
      duration: '1h15'
    },
    {
      time: '17h00',
      title: 'Réception',
      location: 'Salle des Fêtes du Château',
      description: 'Dîner, danses et célébrations',
      icon: '🎉',
      duration: '5h00'
    },
    {
      time: '22h00',
      title: 'Soirée Dansante',
      location: 'Terrasse du Château',
             description: 'Musique, danse et festivités jusqu&apos;au bout de la nuit',
      icon: '💃',
             duration: 'Jusqu&apos;au matin'
    }
  ];

  const importantInfo = [
    {
      title: 'Tenue Requise',
      content: 'Tenue de cérémonie élégante',
      icon: '👔'
    },
    {
      title: 'Parking',
      content: 'Parking gratuit disponible sur place',
      icon: '🚗'
    },
    {
      title: 'Météo',
      content: 'Cérémonie en intérieur, cocktail en extérieur',
      icon: '🌤️'
    },
    {
      title: 'Enfants',
      content: 'Bienvenus, espace jeux prévu',
      icon: '👶'
    }
  ];

  return (
    <div className="program-page">
      <div className="container">
        <div className="program-header">
          <h1>Programme de la Journée</h1>
          <p>Découvrez le déroulé de notre journée de mariage</p>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <h2>Déroulé de la Journée</h2>
          <div className="timeline">
            {timeline.map((event, index) => (
              <div key={`timeline-event-${event.title.replace(/\s+/g, '-')}-${index}`} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-icon">{event.icon}</div>
                  <div className="timeline-time">{event.time}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-location">{event.location}</p>
                  <p className="timeline-description">{event.description}</p>
                  <div className="timeline-duration">{event.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informations importantes */}
        <div className="info-section">
          <h2>Informations Pratiques</h2>
          <div className="info-grid">
            {importantInfo.map((info, index) => (
              <div key={`info-card-${info.title.replace(/\s+/g, '-')}-${index}`} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carte */}
        <div className="map-section">
          <h2>Comment Nous Rejoindre</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <h3>Château de Versailles</h3>
                <p>456 Avenue des Rois<br />78000 Versailles, France</p>
                <div className="map-actions">
                  <button className="btn-directions">Itinéraire</button>
                  <button className="btn-parking">Parking</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact d'urgence */}
        <div className="emergency-section">
          <h2>Contact d&apos;Urgence</h2>
          <div className="emergency-contacts">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-info">
                <h4>Organisateur</h4>
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🚑</div>
              <div className="contact-info">
                <h4>Urgences</h4>
                <p>112</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program; 