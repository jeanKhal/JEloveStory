import React, { useState } from 'react';
import './Apropos.css';

const Apropos: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  // Données de l'équipe
  const equipe = [
    {
      id: 1,
      nom: 'Roger MULUNDA',
      poste: 'Gestionnaire Responsable',
      photo: require('../images/roger.jpg'),
      description: 'Un monsieur très créatif et d\'une imagination débordante. Il a 1000 idées dans sa tête et dirige avec passion JoelEunice LoveStory.',
      specialites: ['Gestion de projet', 'Innovation pédagogique', 'Développement numérique'],
      email: 'roger.mulunda@joel-eunice-lovestory.com',
      telephone: '+243 999 123 456',
      linkedin: '#'
    },
    {
      id: 2,
      nom: 'Rachel NKULU',
      poste: 'Réceptionniste et chargée de programmation des formations',
      photo: require('../images/rachel.jpg'),
      description: 'Accueillante et organisée, Rachel gère l\'accueil des visiteurs et la programmation de toutes nos formations avec efficacité.',
      specialites: ['Accueil', 'Programmation des formations', 'Gestion administrative'],
      email: 'rachel.nkulu@joel-eunice-lovestory.com',
      telephone: '+243 999 123 457',
      linkedin: '#'
    },
    {
      id: 3,
      nom: 'John Legrand KUMWIMBA',
      poste: 'IT, Formateur et Webmaster',
      photo: require('../images/john.jpg'),
      description: 'Polyvalent et passionné par le numérique, John assure la gestion IT, la formation et la maintenance du site web de JoelEunice LoveStory.',
      specialites: ['IT', 'Formation', 'Webmastering'],
      email: 'john.kumwimba@joel-eunice-lovestory.com',
      telephone: '+243 999 123 458',
      linkedin: '#'
    },
    {
      id: 4,
      nom: 'Denis MIKOBI',
      poste: 'Chargé de Logistique',
      photo: require('../images/denis.jpg'),
      description: 'Denis veille à la bonne organisation matérielle et logistique de JoelEunice LoveStory, garantissant le bon déroulement de toutes les activités.',
      specialites: ['Logistique', 'Organisation', 'Gestion du matériel'],
      email: 'denis.mikobi@joel-eunice-lovestory.com',
      telephone: '+243 999 123 459',
      linkedin: '#'
    },
    {
      id: 5,
      nom: 'Lyna MULAND',
      poste: 'Personnel d\'Appoint',
      photo: require('../images/lina.jpg'),
      description: 'Lyna apporte son soutien polyvalent à l\'équipe de JoelEunice LoveStory, contribuant au bon fonctionnement de nos activités.',
      specialites: ['Support polyvalent', 'Assistance administrative', 'Accueil'],
      email: 'lyna.muland@joel-eunice-lovestory.com',
      telephone: '+243 999 123 460',
      linkedin: '#'
    },
    {
      id: 6,
      nom: 'Brigitte BUNDA',
      poste: 'Caissière',
      photo: require('../images/brigitte.jpg'),
      description: 'Brigitte gère avec précision et professionnalisme les aspects financiers et comptables de JoelEunice LoveStory.',
      specialites: ['Gestion financière', 'Comptabilité', 'Service client'],
      email: 'brigitte.bunda@joel-eunice-lovestory.com',
      telephone: '+243 999 123 461',
      linkedin: '#'
    },
    {
      id: 7,
      nom: 'Yvette MWAPE',
      poste: 'Personnel d\'Appoint',
      photo: require('../images/yvette.jpg'),
      description: 'Yvette apporte son soutien polyvalent à l\'équipe de JoelEunice LoveStory, contribuant au bon fonctionnement de nos activités.',
      specialites: ['Support polyvalent', 'Assistance administrative', 'Accueil'],
      email: 'yvette.mwape@joel-eunice-lovestory.com',
      telephone: '+243 999 123 462',
      linkedin: '#'
    }
  ];

  const openMemberModal = (membre: any) => {
    setSelectedMember(membre);
    setShowModal(true);
  };

  const closeMemberModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  return (
    <div className="apropos-container">
      {/* Section À propos principale */}
      <div className="apropos-section">
    <h2 className="apropos-title">À propos de JoelEunice LoveStory</h2>
    <p className="apropos-description">
          JoelEunice LoveStory est un espace innovant dédié à la formation, à l'apprentissage et à la découverte des technologies numériques pour tous.
    </p>
    <h3 className="apropos-subtitle">Notre mission</h3>
    <p className="apropos-text">
          Offrir à chacun, débutant ou professionnel, l'opportunité de se former aux outils numériques, de développer ses compétences et de s'ouvrir à de nouveaux métiers.
    </p>
    <h3 className="apropos-subtitle">Nos valeurs</h3>
    <ul className="apropos-list">
          <li><b>Accessibilité</b> : des formations pour tous, sans barrière d'âge ou de niveau.</li>
      <li><b>Innovation</b> : des ateliers pratiques, des outils modernes et des intervenants passionnés.</li>
          <li><b>Partage</b> : un lieu d'échange, de collaboration et de réussite collective.</li>
    </ul>
    <h3 className="apropos-subtitle">Pourquoi nous choisir ?</h3>
    <ul className="apropos-list">
      <li>Des formations certifiantes et reconnues</li>
      <li>Des équipements à la pointe de la technologie</li>
      <li>Un accompagnement personnalisé</li>
      <li>Un réseau de partenaires prestigieux</li>
    </ul>
      </div>

      {/* Section Équipe */}
      <div className="team-section">
        <h2 className="team-title">Notre Équipe</h2>
        <p className="team-description">
          Une équipe passionnée et expérimentée qui accompagne votre parcours numérique avec expertise et bienveillance.
        </p>
        
        <div className="team-grid">
          {equipe.map((membre) => (
            <div key={membre.id} className="team-member-card" onClick={() => openMemberModal(membre)}>
              
              {/* Photo et informations principales */}
              <div className="team-member-header">
                <div className="team-member-photo">
                  <img 
                    src={membre.photo} 
                    alt={membre.nom}
                  />
                </div>
                
                <div className="team-member-info">
                  <h3 className="team-member-name">
                    {membre.nom}
                  </h3>
                  <p className="team-member-position">
                    {membre.poste}
                  </p>
                  <div className="team-member-links">
                    <a href={`mailto:${membre.email}`}>
                      📧 Email
                    </a>
                    <a href={membre.linkedin} className="linkedin">
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Message de fin */}
        <div className="team-cta">
          <h3>
            Rejoignez notre équipe !
          </h3>
          <p>
            Nous recherchons constamment des talents passionnés par le numérique. 
            N'hésitez pas à nous contacter si vous souhaitez nous rejoindre !
          </p>
        </div>
      </div>

      {/* Modal pour les détails du membre */}
      {showModal && selectedMember && (
        <div className="member-modal-overlay" onClick={closeMemberModal}>
          <div className="member-modal" onClick={(e) => e.stopPropagation()}>
            <div className="member-modal-header">
              <div className="member-modal-photo">
                <img src={selectedMember.photo} alt={selectedMember.nom} />
              </div>
              <div className="member-modal-info">
                <h3 className="member-modal-name">{selectedMember.nom}</h3>
                <p className="member-modal-position">{selectedMember.poste}</p>
              </div>
              <button className="member-modal-close" onClick={closeMemberModal}>
                ✕
              </button>
            </div>
            
            <div className="member-modal-content">
              <div className="member-modal-section">
                <h4>Description</h4>
                <p>{selectedMember.description}</p>
              </div>
              
              <div className="member-modal-section">
                <h4>Spécialités</h4>
                <div className="member-modal-specialties">
                  {selectedMember.specialites.map((specialite: string, index: number) => (
                    <span key={`specialty-${specialite.replace(/\s+/g, '-')}-${index}`} className="member-modal-specialty">
                      {specialite}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="member-modal-section">
                <h4>Contact</h4>
                <div className="member-modal-contact">
                  <a href={`mailto:${selectedMember.email}`} className="member-modal-email">
                    📧 {selectedMember.email}
                  </a>
                  <a href={`tel:${selectedMember.telephone}`} className="member-modal-phone">
                    📞 {selectedMember.telephone}
                  </a>
                  <a href={selectedMember.linkedin} className="member-modal-linkedin">
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
);
};

export default Apropos; 