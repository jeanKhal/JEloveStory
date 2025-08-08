// Utilitaire pour générer des PDF d'invitation
// Utilise jsPDF pour créer de vrais fichiers PDF
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface InvitationData {
  firstName: string;
  lastName: string;
  guestCode: string;
  invitationType: 'benediction' | 'soiree';
}

// Fonction pour générer un QR code avec image en arrière-plan
const generateQRCodeWithImage = async (guestCode: string, invitationType: 'benediction' | 'soiree'): Promise<string> => {
  try {
    // Générer un token d'authentification sécurisé
    const { generateAuthToken } = await import('./guestData');
    const authToken = generateAuthToken(guestCode, invitationType);
    
    // Créer l'URL de validation avec le token
    const validationUrl = `${window.location.origin}/validate/${guestCode}/${invitationType}/${authToken}`;
    
    const qrDataUrl = await QRCode.toDataURL(validationUrl, {
      width: 200,
      margin: 0,
      color: {
        dark: '#2c2c2c',
        light: '#f8f4e6'
      }
    });
    
    return qrDataUrl;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    // Fallback vers l'API externe
    const { generateAuthToken } = await import('./guestData');
    const authToken = generateAuthToken(guestCode, invitationType);
    const validationUrl = `${window.location.origin}/validate/${guestCode}/${invitationType}/${authToken}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(validationUrl)}&format=png&margin=0&qzone=2&ecc=M`;
    
    return qrUrl;
  }
};

// Fonction pour générer une invitation HTML élégante
export const generateInvitationHTML = async (data: InvitationData): Promise<void> => {
  // Déterminer le contenu selon le type d'invitation
  const invitationType = data.invitationType;
  
  let title, subtitle, message, fileName;
  
  if (invitationType === 'benediction') {
    title = '';
    subtitle = 'Joel & Eunice';
    message = `
      <div class="recipient-name">Cher(e) ${data.firstName} ${data.lastName},</div>
      
      <div class="main-text">
        <p>accompagnés de leurs familles respectives, <strong>MALUMBA et TSHIBAIE</strong>, ont l'honneur de vous inviter à rehausser de votre présence à la <strong>BENEDICTION NUPTIALE</strong> de leur mariage qui sera organisée le <strong>vendredi 29 Août 2025 à 11H00</strong> sur <strong>LA PELOUSE</strong> de la salle de fête <strong>KEMESHA</strong> située à l'adresse suivante : <strong>N°44, Avenue de La Justice, Kinshasa / Gombe RD CONGO</strong>.</p>
        
        <div class="note-box">
          <p><strong>NB :</strong> Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l'heure indiquée pour le bon déroulement du programme.</p>
        </div>
        
        <p><em>Aimable bienvenue</em></p>
      </div>
    `;
    fileName = `Invitation_Benediction_${data.firstName}_${data.lastName}`;
  } else {
    // Type 'soiree'
    title = '';
    subtitle = 'Joel & Eunice';
    message = `
      <div class="recipient-name">Cher(e) ${data.firstName} ${data.lastName},</div>
      
      <div class="main-text">
        <p>accompagnés de leurs familles respectives, <strong>MALUMBA et TSHIBAIE</strong>, ont l'honneur de vous inviter à rehausser de votre présence à la <strong>SOIRÉE DANSANTE</strong> de leur mariage qui sera organisée le <strong>vendredi 29 Août 2025 à 19H00</strong> dans la salle de fête <strong>KEMESHA</strong> située à l'adresse suivante : <strong>N°44, Avenue de La Justice, Kinshasa / Gombe RD CONGO</strong>.</p>
        
        <div class="note-box">
          <p><strong>NB :</strong> Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l'heure indiquée pour le bon déroulement du programme.</p>
        </div>
        
        <p><em>Aimable bienvenue</em></p>
      </div>
    `;
    fileName = `Invitation_Soiree_${data.firstName}_${data.lastName}`;
  }

  // Générer le QR code
  const qrCodeUrl = await generateQRCodeWithImage(data.guestCode, invitationType);

  // Créer le contenu HTML de l'invitation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title} - ${data.firstName} ${data.lastName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Dancing+Script:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
                 body {
           font-family: 'Cormorant Garamond', serif;
           background: #f8f4e6;
           color: #2c2c2c;
           line-height: 1.6;
           min-height: 100vh;
           padding: 20px;
         }
        
                 .invitation-container {
           width: 100%;
           max-width: 900px;
           margin: 0 auto;
           background: #f8f4e6;
           border: 3px solid #d4af37;
           border-radius: 0;
           box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2);
           overflow: visible;
           position: relative;
           padding: 40px;
         }
         
         .invitation-container::before {
           content: '';
           position: absolute;
           top: -6px;
           left: -6px;
           right: -6px;
           bottom: -6px;
           background: linear-gradient(45deg, #d4af37, #f4d03f, #d4af37, #f4d03f);
           background-size: 400% 400%;
           animation: borderGlow 4s ease-in-out infinite;
           z-index: -2;
         }
         
                   .floral-ornament-top-right {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 100px;
            height: 100px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d4af37;stop-opacity:1" /><stop offset="50%" style="stop-color:%23f4d03f;stop-opacity:1" /><stop offset="100%" style="stop-color:%23d4af37;stop-opacity:1" /></linearGradient></defs><g transform="rotate(45 60 60)"><circle cx="60" cy="60" r="8" fill="url(%23goldGrad)"/><circle cx="60" cy="30" r="6" fill="url(%23goldGrad)"/><circle cx="60" cy="90" r="6" fill="url(%23goldGrad)"/><circle cx="30" cy="60" r="6" fill="url(%23goldGrad)"/><circle cx="90" cy="60" r="6" fill="url(%23goldGrad)"/><circle cx="45" cy="45" r="4" fill="url(%23goldGrad)"/><circle cx="75" cy="45" r="4" fill="url(%23goldGrad)"/><circle cx="45" cy="75" r="4" fill="url(%23goldGrad)"/><circle cx="75" cy="75" r="4" fill="url(%23goldGrad)"/></g></svg>') no-repeat center;
            background-size: contain;
            z-index: 10;
            animation: sparkle 3s ease-in-out infinite;
          }
          
          .floral-ornament-bottom-left {
            position: absolute;
            bottom: -20px;
            left: -20px;
            width: 100px;
            height: 100px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d4af37;stop-opacity:1" /><stop offset="50%" style="stop-color:%23f4d03f;stop-opacity:1" /><stop offset="100%" style="stop-color:%23d4af37;stop-opacity:1" /></linearGradient></defs><g transform="rotate(-45 60 60)"><circle cx="60" cy="60" r="8" fill="url(%23goldGrad2)"/><circle cx="60" cy="30" r="6" fill="url(%23goldGrad2)"/><circle cx="60" cy="90" r="6" fill="url(%23goldGrad2)"/><circle cx="30" cy="60" r="6" fill="url(%23goldGrad2)"/><circle cx="90" cy="60" r="6" fill="url(%23goldGrad2)"/><circle cx="45" cy="45" r="4" fill="url(%23goldGrad2)"/><circle cx="75" cy="45" r="4" fill="url(%23goldGrad2)"/><circle cx="45" cy="75" r="4" fill="url(%23goldGrad2)"/><circle cx="75" cy="75" r="4" fill="url(%23goldGrad2)"/></g></svg>') no-repeat center;
            background-size: contain;
            z-index: 10;
            animation: sparkle 3s ease-in-out infinite reverse;
          }
          
          .celebration-border {
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border: 2px solid transparent;
            background: linear-gradient(45deg, #d4af37, #f4d03f, #d4af37, #f4d03f, #d4af37) border-box;
            background-size: 200% 200%;
            animation: borderGlow 4s ease-in-out infinite;
            z-index: -1;
          }
          
          .corner-ornaments {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
          }
          
          .corner-ornament {
            position: absolute;
            width: 40px;
            height: 40px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d4af37;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%23f4d03f;stop-opacity:0.8" /></linearGradient></defs><path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" fill="url(%23cornerGrad)"/></svg>') no-repeat center;
            background-size: contain;
            animation: cornerFloat 6s ease-in-out infinite;
          }
          
          .corner-ornament:nth-child(1) { top: 10px; left: 10px; animation-delay: 0s; }
          .corner-ornament:nth-child(2) { top: 10px; right: 10px; animation-delay: 1.5s; }
          .corner-ornament:nth-child(3) { bottom: 10px; left: 10px; animation-delay: 3s; }
          .corner-ornament:nth-child(4) { bottom: 10px; right: 10px; animation-delay: 4.5s; }
          
          .decorative-line {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d4af37, #f4d03f, #d4af37, transparent);
            animation: lineGlow 3s ease-in-out infinite;
          }
          
          .decorative-line.top {
            top: 20px;
            left: 50px;
            right: 50px;
          }
          
          .decorative-line.bottom {
            bottom: 20px;
            left: 50px;
            right: 50px;
          }
          
          .decorative-line.left {
            left: 20px;
            top: 50px;
            bottom: 50px;
            width: 2px;
            height: auto;
            background: linear-gradient(180deg, transparent, #d4af37, #f4d03f, #d4af37, transparent);
          }
          
          .decorative-line.right {
            right: 20px;
            top: 50px;
            bottom: 50px;
            width: 2px;
            height: auto;
            background: linear-gradient(180deg, transparent, #d4af37, #f4d03f, #d4af37, transparent);
          }
          
          @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
          }
          
                     @keyframes borderGlow {
             0%, 100% { background-position: 0% 50%; }
             50% { background-position: 100% 50%; }
           }
           
           @keyframes cornerFloat {
             0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
             50% { transform: translateY(-5px) rotate(180deg); opacity: 1; }
           }
           
           @keyframes lineGlow {
             0%, 100% { opacity: 0.6; transform: scaleX(1); }
             50% { opacity: 1; transform: scaleX(1.1); }
           }
           
           @keyframes subtitleOrnament {
             0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.8; }
             50% { transform: translateY(-50%) scale(1.2); opacity: 1; }
           }
        
                 .header {
           text-align: center;
           padding: 40px 0;
           background: transparent;
           border-bottom: none;
           position: relative;
         }
        
                 .subtitle {
           font-family: 'Dancing Script', cursive;
           font-size: 4rem;
           color: #2c2c2c;
           margin: 0;
           font-weight: 700;
           text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
           letter-spacing: 2px;
           position: relative;
         }
         
         .subtitle::before,
         .subtitle::after {
           content: '❦';
           position: absolute;
           top: 50%;
           transform: translateY(-50%);
           font-size: 2rem;
           color: #d4af37;
           animation: subtitleOrnament 4s ease-in-out infinite;
         }
         
         .subtitle::before {
           left: -60px;
           animation-delay: 0s;
         }
         
         .subtitle::after {
           right: -60px;
           animation-delay: 2s;
         }
        
                                   .content {
            padding: 40px 0;
            text-align: center;
            position: relative;
          }
         
         .recipient-line {
           font-family: 'Playfair Display', serif;
           font-size: 1.3rem;
           color: #2c2c2c;
           margin-bottom: 12px;
           font-weight: 400;
           text-align: center;
         }
         
         .recipient-name {
           font-family: 'Playfair Display', serif;
           font-size: 1.8rem;
           color: #2c2c2c;
           margin-bottom: 50px;
           font-weight: 600;
           text-align: center;
           width: 100%;
           padding: 20px 0;
           border-bottom: 2px solid rgba(212, 175, 55, 0.3);
         }
         
         .main-text {
           font-size: 1.4rem;
           color: #2c2c2c;
           line-height: 2.2;
           font-weight: 400;
           text-align: justify;
           text-justify: inter-word;
           max-width: 700px;
           margin: 0 auto;
         }
         
         .main-text p {
           margin: 20px 0;
           text-align: justify;
           text-justify: inter-word;
           padding: 0 20px;
         }
        
                           .main-text strong {
            color: #2c2c2c;
            font-weight: 700;
          }
          
          .note-box {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%);
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
          }
         
         .main-text em {
           font-style: italic;
           color: #d4af37;
           font-weight: 600;
           font-size: 1.6rem;
           display: block;
           margin: 30px 0 20px 0;
           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
         }
        
        .qr-section {
          text-align: center;
          margin: 40px 0;
          padding: 30px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 244, 230, 0.95) 100%);
          border-radius: 25px;
          border: 2px solid rgba(212, 175, 55, 0.3);
          position: relative;
        }
        
        .qr-section::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #d4af37, #f4d03f, #d4af37);
          border-radius: 25px;
          z-index: -1;
          opacity: 0.3;
        }
        
        .qr-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: #2c2c2c;
          margin-bottom: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .qr-description {
          font-size: 1rem;
          color: #6b6b6b;
          margin-bottom: 20px;
          font-style: italic;
        }
        
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        
        .qr-code {
          position: relative;
          display: inline-block;
        }
        
        .qr-image {
          width: 150px;
          height: 150px;
          border: 4px solid #d4af37;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          border-radius: 20px;
          transition: transform 0.3s ease;
        }
        
        .qr-image:hover {
          transform: scale(1.05);
        }
        
        .qr-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 3px solid #d4af37;
        }
        
        .logo-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
        }
        
        .logo-circle::before {
          content: "J&E";
          font-family: 'Dancing Script', cursive;
          font-size: 16px;
          font-weight: 700;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .qr-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .download-qr-btn {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          font-family: 'Playfair Display', serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .download-qr-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
          background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%);
        }
        
        .download-qr-btn:active {
          transform: translateY(-1px);
        }
        
        .security-info {
          margin-top: 25px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
          border: 2px solid rgba(76, 175, 80, 0.3);
          border-radius: 15px;
          text-align: center;
        }
        
        .security-info p {
          margin: 8px 0;
          font-size: 0.95rem;
          color: #2e7d32;
          font-weight: 500;
        }
        
        .footer {
          text-align: center;
          padding: 30px 50px;
          border-top: 2px solid rgba(212, 175, 55, 0.3);
          font-size: 1.1rem;
          color: #6b6b6b;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%);
        }
        
        .footer p {
          margin: 8px 0;
        }
        
                 /* Différenciation pour Bénédiction */
                   .benediction-style {
            border-color: #8B4513;
          }
          
                     .benediction-style .floral-ornament-top-right,
           .benediction-style .floral-ornament-bottom-left {
             background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="benedictionGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%238B4513;stop-opacity:1" /><stop offset="50%" style="stop-color:%23d4af37;stop-opacity:1" /><stop offset="100%" style="stop-color:%238B4513;stop-opacity:1" /></linearGradient></defs><g transform="rotate(45 60 60)"><circle cx="60" cy="60" r="8" fill="url(%23benedictionGrad)"/><circle cx="60" cy="30" r="6" fill="url(%23benedictionGrad)"/><circle cx="60" cy="90" r="6" fill="url(%23benedictionGrad)"/><circle cx="30" cy="60" r="6" fill="url(%23benedictionGrad)"/><circle cx="90" cy="60" r="6" fill="url(%23benedictionGrad)"/><circle cx="45" cy="45" r="4" fill="url(%23benedictionGrad)"/><circle cx="75" cy="45" r="4" fill="url(%23benedictionGrad)"/><circle cx="45" cy="75" r="4" fill="url(%23benedictionGrad)"/><circle cx="75" cy="75" r="4" fill="url(%23benedictionGrad)"/></g></svg>') no-repeat center;
             background-size: contain;
           }
           
           .benediction-style .celebration-border {
             background: linear-gradient(45deg, #8B4513, #d4af37, #8B4513, #d4af37);
           }
           
           .benediction-style .corner-ornament {
             background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="benedictionCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%238B4513;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%23d4af37;stop-opacity:0.8" /></linearGradient></defs><path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" fill="url(%23benedictionCornerGrad)"/></svg>') no-repeat center;
             background-size: contain;
           }
           
           .benediction-style .decorative-line {
             background: linear-gradient(90deg, transparent, #8B4513, #d4af37, #8B4513, transparent);
           }
           
           .benediction-style .decorative-line.left,
           .benediction-style .decorative-line.right {
             background: linear-gradient(180deg, transparent, #8B4513, #d4af37, #8B4513, transparent);
           }
         
         .benediction-style .subtitle {
           color: #8B4513;
         }
         
                   .benediction-style .note-box {
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%);
            border-color: rgba(139, 69, 19, 0.3);
          }
         
         .benediction-style .main-text em {
           color: #8B4513;
         }
         
         .benediction-style .qr-section {
           border: 2px solid #8B4513;
           background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(139, 69, 19, 0.05) 100%);
         }
         
         .benediction-style .qr-section::before {
           background: linear-gradient(45deg, #8B4513, #d4af37, #8B4513);
         }
         
         .benediction-style .qr-image {
           border-color: #8B4513;
         }
         
         .benediction-style .qr-overlay {
           border-color: #8B4513;
         }
         
         .benediction-style .logo-circle {
           background: linear-gradient(135deg, #8B4513 0%, #d4af37 50%, #8B4513 100%);
         }
         
         .benediction-style .download-qr-btn {
           background: linear-gradient(135deg, #8B4513 0%, #d4af37 100%);
           box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
         }
         
         .benediction-style .download-qr-btn:hover {
           box-shadow: 0 8px 25px rgba(139, 69, 19, 0.5);
           background: linear-gradient(135deg, #d4af37 0%, #8B4513 100%);
         }
         
         .benediction-style .footer {
           border-top-color: rgba(139, 69, 19, 0.3);
           background: linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(139, 69, 19, 0.02) 100%);
         }
         
         /* Différenciation pour Soirée */
                   .soiree-style {
            border-color: #FF6B6B;
          }
          
                     .soiree-style .floral-ornament-top-right,
           .soiree-style .floral-ornament-bottom-left {
             background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="soireeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23FF6B6B;stop-opacity:1" /><stop offset="50%" style="stop-color:%23d4af37;stop-opacity:1" /><stop offset="100%" style="stop-color:%23FF6B6B;stop-opacity:1" /></linearGradient></defs><g transform="rotate(-45 60 60)"><circle cx="60" cy="60" r="8" fill="url(%23soireeGrad)"/><circle cx="60" cy="30" r="6" fill="url(%23soireeGrad)"/><circle cx="60" cy="90" r="6" fill="url(%23soireeGrad)"/><circle cx="30" cy="60" r="6" fill="url(%23soireeGrad)"/><circle cx="90" cy="60" r="6" fill="url(%23soireeGrad)"/><circle cx="45" cy="45" r="4" fill="url(%23soireeGrad)"/><circle cx="75" cy="45" r="4" fill="url(%23soireeGrad)"/><circle cx="45" cy="75" r="4" fill="url(%23soireeGrad)"/><circle cx="75" cy="75" r="4" fill="url(%23soireeGrad)"/></g></svg>') no-repeat center;
             background-size: contain;
           }
           
           .soiree-style .celebration-border {
             background: linear-gradient(45deg, #FF6B6B, #d4af37, #FF6B6B, #d4af37);
           }
           
           .soiree-style .corner-ornament {
             background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="soireeCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23FF6B6B;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%23d4af37;stop-opacity:0.8" /></linearGradient></defs><path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" fill="url(%23soireeCornerGrad)"/></svg>') no-repeat center;
             background-size: contain;
           }
           
           .soiree-style .decorative-line {
             background: linear-gradient(90deg, transparent, #FF6B6B, #d4af37, #FF6B6B, transparent);
           }
           
           .soiree-style .decorative-line.left,
           .soiree-style .decorative-line.right {
             background: linear-gradient(180deg, transparent, #FF6B6B, #d4af37, #FF6B6B, transparent);
           }
         
         .soiree-style .subtitle {
           color: #FF6B6B;
         }
         
                   .soiree-style .note-box {
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%);
            border-color: rgba(255, 107, 107, 0.3);
          }
         
         .soiree-style .main-text em {
           color: #FF6B6B;
         }
         
         .soiree-style .qr-section {
           border: 2px solid #FF6B6B;
           background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 107, 107, 0.05) 100%);
         }
         
         .soiree-style .qr-section::before {
           background: linear-gradient(45deg, #FF6B6B, #d4af37, #FF6B6B);
         }
         
         .soiree-style .qr-image {
           border-color: #FF6B6B;
         }
         
         .soiree-style .qr-overlay {
           border-color: #FF6B6B;
         }
         
         .soiree-style .logo-circle {
           background: linear-gradient(135deg, #FF6B6B 0%, #d4af37 50%, #FF6B6B 100%);
         }
         
         .soiree-style .download-qr-btn {
           background: linear-gradient(135deg, #FF6B6B 0%, #d4af37 100%);
           box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
         }
         
         .soiree-style .download-qr-btn:hover {
           box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
           background: linear-gradient(135deg, #d4af37 0%, #FF6B6B 100%);
         }
         
         .soiree-style .footer {
           border-top-color: rgba(255, 107, 107, 0.3);
           background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 107, 107, 0.02) 100%);
         }
        
                 /* Responsive */
         @media (max-width: 768px) {
                       .invitation-container {
              margin: 10px;
              border-radius: 0;
              padding: 20px;
            }
            
                         .floral-ornament-top-right,
             .floral-ornament-bottom-left {
               width: 70px;
               height: 70px;
             }
             
                           .celebration-border {
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
              }
              
              .corner-ornament {
                width: 30px;
                height: 30px;
              }
              
              .decorative-line.top,
              .decorative-line.bottom {
                left: 30px;
                right: 30px;
              }
              
              .decorative-line.left,
              .decorative-line.right {
                left: 15px;
                right: 15px;
                top: 30px;
                bottom: 30px;
              }
           
           .header {
             padding: 40px 30px 30px;
           }
           
           .subtitle {
             font-size: 3rem;
           }
           
           .content {
             padding: 40px 30px;
           }
           
           .recipient-name {
             font-size: 1.5rem;
             margin-bottom: 40px;
             padding: 15px 0;
           }
           
           .main-text {
             font-size: 1.2rem;
             line-height: 2;
             max-width: 100%;
             text-align: justify;
             text-justify: inter-word;
           }
           
           .main-text p {
             margin: 15px 0;
             padding: 0 10px;
             text-align: justify;
             text-justify: inter-word;
           }
           
                       .note-box {
              padding: 15px;
              margin: 20px 0;
            }
           
           .main-text em {
             font-size: 1.4rem;
             margin: 25px 0 15px 0;
           }
           
           .qr-section {
             padding: 20px;
             margin: 30px 0;
           }
           
           .qr-image {
             width: 120px;
             height: 120px;
           }
           
           .qr-buttons {
             flex-direction: column;
             align-items: center;
           }
           
           .qr-title {
             font-size: 1.2rem;
           }
           
           .qr-description {
             font-size: 0.9rem;
           }
           
           .security-info {
             padding: 15px;
           }
           
           .security-info p {
             font-size: 0.85rem;
           }
           
           .download-qr-btn {
             width: 100%;
             max-width: 250px;
           }
         }
      </style>
      
      <script>
        function downloadQRCode(qrDataUrl, guestCode) {
          const link = document.createElement('a');
          link.href = qrDataUrl;
          link.download = \`QR_Code_\${guestCode}.png\`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      </script>
    </head>
    <body>
             <div class="invitation-container ${invitationType === 'benediction' ? 'benediction-style' : 'soiree-style'}">
         <div class="celebration-border"></div>
         <div class="floral-ornament-top-right"></div>
         <div class="floral-ornament-bottom-left"></div>
         
         <div class="corner-ornaments">
           <div class="corner-ornament"></div>
           <div class="corner-ornament"></div>
           <div class="corner-ornament"></div>
           <div class="corner-ornament"></div>
         </div>
         
         <div class="decorative-line top"></div>
         <div class="decorative-line bottom"></div>
         <div class="decorative-line left"></div>
         <div class="decorative-line right"></div>
         
         <div class="header">
           <p class="subtitle">${subtitle}</p>
         </div>
         
         <div class="content">
           ${message}
         </div>
        
        <div class="qr-section">
          <h3 class="qr-title">🔐 QR Code d'Authentification</h3>
          <p class="qr-description">Scannez ce QR code pour vérifier l'authenticité de cette invitation</p>
          <div class="qr-container">
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="QR Code d'authentification" class="qr-image" />
              <div class="qr-overlay">
                <div class="logo-circle">
                  <span>J&E</span>
                </div>
              </div>
            </div>
            <div class="qr-buttons">
              <button class="download-qr-btn" onclick="downloadQRCode('${qrCodeUrl}', '${data.guestCode}')">
                📱 Télécharger le QR Code
              </button>
            </div>
          </div>
          <div class="security-info">
            <p><strong>🔒 Sécurisé :</strong> Ce QR code contient un token d'authentification unique</p>
            <p><strong>✅ Valide :</strong> Vérification en temps réel de l'authenticité</p>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin-bottom: 10px; font-weight: 600;">Pour toute question, veuillez contacter les organisateurs</p>
          <p>📧 contact@joel-eunice-wedding.com | 📱 +243 XXX XXX XXX</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Télécharger le fichier HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.html`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Fonction alternative pour générer un PDF simple (fallback)
export const generateSimplePDF = (data: InvitationData): void => {
  const content = `
    INVITATION AU MARIAGE
    
    Cher(e) ${data.firstName} ${data.lastName},
    
    Nous avons le plaisir de vous inviter à célébrer notre mariage
    qui aura lieu le 29 Août 2025 à Kinshasa, RDC.
    
    Votre présence nous honorerait grandement.
    
    Avec toute notre affection,
    Joel & Eunice
    
    ---
    Date: 29 Août 2025
    Lieu: Kinshasa, RDC
    Code d'invité: ${data.guestCode}
    
    Pour toute question, veuillez contacter les organisateurs.
  `;

  // Créer un fichier texte téléchargeable
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Invitation_${data.firstName}_${data.lastName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}; 