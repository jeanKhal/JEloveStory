import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invitation.css';
import QRCode from 'qrcode';

interface InvitationProps {
  guestName?: string;
  invitationType?: string;
  guestCode?: string;
}

const Invitation: React.FC<InvitationProps> = ({ guestName, invitationType, guestCode }) => {
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Générer le QR code pour cette invitation
    if (guestCode) {
      const generateQR = async () => {
        try {
          const qrData = `${window.location.origin}/welcome/${guestCode}`;
          const qrDataUrl = await QRCode.toDataURL(qrData, {
            width: 200,
            margin: 0,
            color: {
              dark: '#2c2c2c',
              light: '#f8f4e6'
            }
          });
          setQrCodeUrl(qrDataUrl);
        } catch (error) {
          console.error('Erreur lors de la génération du QR code:', error);
        }
      };
      generateQR();
    }
  }, [guestCode]);

  const getInvitationContent = () => {
    if (invitationType === 'benediction') {
      return {
        title: '',
        subtitle: 'Joel & Eunice',
        message: `
          accompagnés de leurs familles respectives, MALUMBA et TSHIBAIE, ont l'honneur de vous inviter à rehausser de votre présence à la BENEDICTION NUPTIALE de leur mariage qui sera organisée le vendredi 29 Août 2025 à 11H00 sur LA PELOUSE de la salle de fête KEMESHA située à l'adresse suivante :
        `,
        address: 'Numéro 44 Avenue de la justice, kinshasa/gombe RD CONGO',
        note: 'Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l\'heure indiquée pour le bon déroulement du programme',
        welcome: 'Aimable Bienvenue'
      };
    } else if (invitationType === 'soiree') {
      return {
        title: '',
        subtitle: 'Joel & Eunice',
        message: `
          accompagnés de leurs familles respectives, MALUMBA et TSHIBAIE, ont l'honneur de vous inviter à rehausser de votre présence à la SOIRÉE DANSANTE de leur mariage qui sera organisée le vendredi 29 Août 2025 à 19H00 dans la salle de fête KEMESHA située à l'adresse suivante :
        `,
        address: 'Numéro 44 Avenue de la justice, kinshasa/gombe RD CONGO',
        note: 'Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l\'heure indiquée pour le bon déroulement du programme',
        welcome: 'Aimable Bienvenue'
      };
    } else {
      return {
        title: 'Invitation au Mariage',
        subtitle: 'Joel & Eunice',
        message: `
          Nous avons le plaisir de vous inviter à célébrer notre mariage qui aura lieu le 29 Août 2025 à Kinshasa, RDC.
          
          Votre présence nous honorerait grandement et nous permettrait de partager ce moment unique avec vous.
        `,
        address: 'Kinshasa, RDC',
        note: '',
        welcome: 'Avec toute notre affection, Joel & Eunice'
      };
    }
  };

  const content = getInvitationContent();

  return (
    <div className="invitation-container">
      {/* Bouton de retour */}
      <button 
        className="back-button"
        onClick={() => navigate('/#rsvp')}
      >
        ← Retour au site
      </button>
      
      <div className={`invitation-content ${isVisible ? 'visible' : ''}`}>
        {/* Bordure ornementale */}
        <div className="ornamental-border"></div>
        
        {/* Ornements floraux */}
        <div className="floral-ornament-top"></div>
        <div className="floral-ornament-bottom"></div>
        
        {/* En-tête */}
        <div className="invitation-header">
          {content.title && <h1 className="invitation-title">{content.title}</h1>}
          <p className="invitation-subtitle">{content.subtitle}</p>
        </div>
        
        {/* Contenu principal */}
        <div className="invitation-body">
          {guestName && (
            <p className="guest-greeting">Cher(e) {guestName},</p>
          )}
          
          <p className="invitation-message">
            {content.message}
          </p>
          
          <div className="address-section">
            <strong>{content.address}</strong>
          </div>
          
          {content.note && (
            <div className="note-box">
              <strong>NB :</strong> {content.note}
            </div>
          )}
          
          <div className="welcome-section">
            <em>{content.welcome}</em>
          </div>
        </div>
        
        {/* QR Code */}
        {qrCodeUrl && (
          <div className="qr-section">
            <div className="qr-container">
              <img src={qrCodeUrl} alt="QR Code" className="qr-image" />
              <div className="qr-overlay">
                <div className="qr-logo">
                  <div className="logo-circle">J&E</div>
                </div>
              </div>
            </div>
            <p className="qr-text">Scannez ce QR code pour confirmer votre présence</p>
          </div>
        )}
        
        {/* Pied de page */}
        <div className="invitation-footer">
          <p className="footer-text">
            Pour toute question, veuillez contacter les organisateurs
          </p>
          <p className="contact-info">
            📧 contact@joel-eunice-wedding.com | 📱 +243 XXX XXX XXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
