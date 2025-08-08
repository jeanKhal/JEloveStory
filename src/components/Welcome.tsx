import React, { useState, useEffect } from 'react';
import './Welcome.css';

interface WelcomeProps {
  guestName?: string;
  invitationType?: string;
}

const Welcome: React.FC<WelcomeProps> = ({ guestName, invitationType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);
  
  const emojis = ['🎉', '💒', '💕', '✨', '🎊', '💍', '🌹', '💝'];
  
  useEffect(() => {
    setIsVisible(true);
    
    // Animation des emojis
    const emojiInterval = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % emojis.length);
    }, 800);
    
    return () => clearInterval(emojiInterval);
  }, [emojis.length]);

  return (
    <div className="welcome-container">
      <div className={`welcome-content ${isVisible ? 'visible' : ''}`}>
        <div className="welcome-header">
          <div className="emoji-animation">
            <span className="emoji">{emojis[emojiIndex]}</span>
          </div>
          <h1 className="welcome-title">Bienvenue !</h1>
        </div>
        
        <div className="welcome-message">
          {guestName ? (
            <>
              <p className="guest-name">Cher(e) {guestName}</p>
              <p className="welcome-text">
                Nous sommes ravis de vous accueillir à notre mariage !
              </p>
              {invitationType && (
                <div className="invitation-type-badge">
                  {invitationType === 'benediction' && '⛪ Bénédiction Nuptiale'}
                  {invitationType === 'soiree' && '🎉 Soirée Dansante'}
                  {invitationType === 'both' && '🎊 Invité aux deux événements'}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="welcome-text">
                Bienvenue à notre mariage !
              </p>
              <p className="sub-text">
                Merci d'avoir scanné votre invitation
              </p>
            </>
          )}
        </div>
        
        <div className="welcome-details">
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <span className="detail-text">29 Août 2025</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">Kinshasa, RDC</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💒</span>
            <span className="detail-text">Salle de fête KEMESHA</span>
          </div>
        </div>
        
        <div className="welcome-footer">
          <p className="footer-text">
            Nous avons hâte de partager ce moment spécial avec vous !
          </p>
          <div className="couple-signature">
            <span className="signature-text">Joel & Eunice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
