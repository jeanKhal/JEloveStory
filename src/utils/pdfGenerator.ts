// Utilitaire pour générer des PDF d'invitation
// Utilise les APIs natives du navigateur
import QRCode from 'qrcode';

export interface InvitationData {
  firstName: string;
  lastName: string;
  guestCode: string;
  invitationType?: 'benediction' | 'soiree';
}

// Fonction pour générer un QR code avec image en arrière-plan
const generateQRCodeWithImage = async (guestCode: string): Promise<string> => {
  try {
    // Générer le QR code localement
    const qrData = `JOEL-EUNICE-WEDDING-${guestCode}`;
    const qrDataUrl = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 0,
      color: {
        dark: '#2c2c2c',
        light: '#f8f4e6'
      }
    });
    
    return `
      <div class="qr-container">
        <div class="qr-code">
          <img src="${qrDataUrl}" alt="QR Code" class="qr-image" />
          <div class="qr-overlay">
            <div class="qr-logo">
              <div class="logo-circle"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    // Fallback vers l'API externe
    const qrData = `JOEL-EUNICE-WEDDING-${guestCode}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&format=png&margin=0&qzone=2&ecc=M`;
    
    return `
      <div class="qr-container">
        <div class="qr-code">
          <img src="${qrUrl}" alt="QR Code" class="qr-image" />
          <div class="qr-overlay">
            <div class="qr-logo">
              <div class="logo-circle"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

// Fonction pour générer un PDF d'invitation
export const generateInvitationPDF = async (data: InvitationData): Promise<void> => {
  // Déterminer le contenu selon le type d'invitation
  const invitationType = data.invitationType || 'both';
  
  let title, subtitle, message, fileName;
  
  if (invitationType === 'benediction') {
    title = ''; // Pas de titre pour la bénédiction
    subtitle = 'Joel & Eunice';
    message = `
      accompagnés de leurs familles respectives, MALUMBA et TSHIBAIE, ont l'honneur de vous inviter à rehausser de votre présence à la BENEDICTION NUPTIALE de leur mariage qui sera organisée le vendredi 29 Août 2025 à 11H00 sur LA PELOUSE de la salle de fête KEMESHA située à l'adresse suivante :<br><br>
      
             <div style="text-align: center;">
         <strong>Numéro 44 Avenue de la justice, kinshasa/gombe RD CONGO</strong>
       </div><br><br>
      
      <div class="note-box">
        <strong>NB :</strong> Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l'heure indiquée pour le bon déroulement du programme
      </div><br>
      
      <div style="text-align: center;">
        <em>Aimable Bienvenue</em>
      </div>
    `;
    fileName = `Invitation_Benediction_${data.firstName}_${data.lastName}`;
  } else if (invitationType === 'soiree') {
    title = ''; // Pas de titre pour la soirée
    subtitle = 'Joel & Eunice';
    message = `
      accompagnés de leurs familles respectives, MALUMBA et TSHIBAIE, ont l'honneur de vous inviter à rehausser de votre présence à la SOIRÉE DANSANTE de leur mariage qui sera organisée le vendredi 29 Août 2025 à 19H00 dans la salle de fête KEMESHA située à l'adresse suivante :<br><br>
      
      <div style="text-align: center;">
        <strong>Numéro 44 Avenue de la justice, kinshasa/gombe RD CONGO</strong>
      </div><br><br>
      
      <div class="note-box">
        <strong>NB :</strong> Votre présence sera un honneur pour nous et nous vous prions par conséquent de bien vouloir veiller au respect de l'heure indiquée pour le bon déroulement du programme
      </div><br>
      
      <div style="text-align: center;">
        <em>Aimable Bienvenue</em>
      </div>
    `;
    fileName = `Invitation_Soiree_${data.firstName}_${data.lastName}`;
  } else {
    // Type 'both' ou par défaut
    title = 'Invitation au Mariage';
    subtitle = 'Joel & Eunice';
    message = `
      Nous avons le plaisir de vous inviter à célébrer notre mariage
      qui aura lieu le 29 Août 2025 à Kinshasa, RDC.
      
      Votre présence nous honorerait grandement et nous permettrait
      de partager ce moment unique avec vous.
    `;
    fileName = `Invitation_Mariage_${data.firstName}_${data.lastName}`;
  }

  // Créer le contenu HTML de l'invitation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title} - ${data.firstName} ${data.lastName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .invitation-container {
          width: 100%;
          max-width: 800px;
          background: #f8f4e6;
          border: 2px solid #d4af37;
          position: relative;
          overflow: hidden;
          page-break-inside: avoid;
        }
        
        .ornamental-border {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 1px solid #d4af37;
          pointer-events: none;
        }
        
        .floral-ornament-top {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 120px;
          height: 80px;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTEwIDIwQzExMCAxNSA5MCAxMCA3MCAxMEM1MCAxMCAzMCAxNSA0MCAyMEM1MCAyNSA3MCAzMCA5MCAzMEMxMTAgMzAgMTEwIDI1IDExMCAyMFoiIGZpbGw9IiNkNGFmMzciLz4KPHBhdGggZD0iTTEwMCAzMEMxMDAgMjUgODAgMjAgNjAgMjBDNDAgMjAgMjAgMjUgMzAgMzBDNDAgMzUgNjAgNDAgODAgNDBDMTAwIDQwIDEwMCAzNSAxMDAgMzBaIiBmaWxsPSIjZDRhZjM3Ii8+CjxwYXRoIGQ9Ik05MCA0MEM5MCAzNSA3MCAzMCA1MCAzMEMzMCAzMCAxMCAzNSAyMCA0MEMzMCA0NSA1MCA1MCA3MCA1MEM5MCA1MCA5MCA0NSA5MCA0MFoiIGZpbGw9IiNkNGFmMzciLz4KPHBhdGggZD0iTTgwIDUwQzgwIDQ1IDYwIDQwIDQwIDQwQzIwIDQwIDAgNDUgMTAgNTBDMjAgNTUgNDAgNjAgNjAgNjBDODAgNjAgODAgNTUgODAgNTBaIiBmaWxsPSIjZDRhZjM3Ii8+Cjwvc3ZnPgo=') no-repeat center;
          background-size: contain;
          opacity: 0.8;
        }
        
        .floral-ornament-bottom {
          position: absolute;
          bottom: 10px;
          left: 10px;
          width: 120px;
          height: 80px;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgNjBDMTAgNTUgMzAgNTAgNTAgNTBDNzAgNTAgOTAgNTUgODAgNjBDNzAgNjUgNTAgNzAgMzAgNzBDMTAgNzAgMTAgNjUgMTAgNjBaIiBmaWxsPSIjZDRhZjM3Ii8+CjxwYXRoIGQ9Ik0yMCA1MEMyMCA0NSA0MCA0MCA2MCA0MEM4MCA0MCAxMDAgNDUgOTAgNTBDODAgNTUgNjAgNjAgNDAgNjBDMjAgNjAgMjAgNTUgMjAgNTBaIiBmaWxsPSIjZDRhZjM3Ii8+CjxwYXRoIGQ9Ik0zMCA0MEMzMCAzNSA1MCAzMCA3MCAzMEM5MCAzMCAxMTAgMzUgMTAwIDQwQzkwIDQ1IDcwIDUwIDUwIDUwQzMwIDUwIDMwIDQ1IDMwIDQwWiIgZmlsbD0iI2Q0YWYzNyIvPgo8cGF0aCBkPSJNNDAgMzBDNDAgMjUgNjAgMjAgODAgMjBIMTAwQzEwMCAyNSAxMDAgMzAgOTAgMzVDODAgNDAgNjAgNDUgNDAgNDVDMjAgNDUgMjAgNDAgMjAgMzVMMjAgMzBaIiBmaWxsPSIjZDRhZjM3Ii8+Cjwvc3ZnPgo=') no-repeat center;
          background-size: contain;
          opacity: 0.8;
        }
        
        .header {
          text-align: center;
          padding: 60px 40px 40px;
          position: relative;
        }
        

        
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #d4af37;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        
        .subtitle {
          font-family: 'Dancing Script', cursive;
          font-size: 3.5rem;
          color: #2c2c2c;
          margin: 0;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .content {
          padding: 0 60px 50px;
          text-align: left;
        }
        
        .greeting {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #2c2c2c;
          margin-bottom: 35px;
          font-weight: 600;
        }
        
        .message {
          font-size: 1.3rem;
          color: #2c2c2c;
          margin-bottom: 40px;
          line-height: 2;
          font-weight: 400;
          text-align: justify;
        }
        
        .note-box {
          background: rgba(212, 175, 55, 0.1);
          border-left: 4px solid #d4af37;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
          font-weight: 500;
        }
        
        .message strong {
          color: #d4af37;
          font-weight: 700;
        }
        
        .message em {
          font-style: italic;
          color: #d4af37;
          font-weight: 600;
        }
        
        .signature {
          font-family: 'Dancing Script', cursive;
          font-size: 1.8rem;
          color: #d4af37;
          margin: 40px 0;
          font-weight: 600;
          text-align: center;
        }
        
        .qr-container {
          text-align: center;
          margin: 40px 0;
          padding: 30px;
        }
        
        .qr-code {
          position: relative;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        .qr-image {
          width: 150px;
          height: 150px;
          border: 2px solid #d4af37;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
                 .qr-overlay {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 60px;
           height: 60px;
           background: white;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
           border: 2px solid #d4af37;
         }
         
         .qr-logo {
           width: 50px;
           height: 50px;
           position: relative;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 50%;
           overflow: hidden;
         }
         
                   .logo-circle {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
            border-radius: 50%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
          }
          
          .logo-circle::before {
            content: "J&E";
            font-family: 'Dancing Script', cursive;
            font-size: 18px;
            font-weight: 700;
            color: white;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
        

        
        .footer {
          text-align: center;
          padding: 30px 40px;
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          font-size: 0.9rem;
          color: #6b6b6b;
        }
        
        .ornament {
          font-size: 2rem;
          color: #d4af37;
          margin: 30px 0;
          text-align: center;
        }
        
        @media print {
          body {
            background: #f8f4e6;
            padding: 0;
            margin: 0;
          }
          
          .invitation-container {
            box-shadow: none;
            border: 2px solid #d4af37;
            margin: 20px;
            page-break-inside: avoid;
          }
          
          .qr-image {
            box-shadow: none;
            border: 2px solid #d4af37;
          }
        }
        
        @media (max-width: 768px) {
          .invitation-container {
            margin: 10px;
          }
          
          .header {
            padding: 40px 20px 30px;
          }
          

          
          .title {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 2.5rem;
          }
          
          .content {
            padding: 0 30px 40px;
          }
          
          .message {
            font-size: 1.1rem;
          }
          
          .note-box {
            padding: 15px;
            margin: 15px 0;
          }
          
          .qr-image {
            width: 120px;
            height: 120px;
          }
          
          .qr-overlay {
            width: 45px;
            height: 45px;
          }
          
          .qr-logo {
            width: 35px;
            height: 35px;
          }
          
          .logo-circle {
            width: 35px;
            height: 35px;
          }
          
          .logo-circle::before {
            font-size: 14px;
          }
          

          

          
          .floral-ornament-top,
          .floral-ornament-bottom {
            width: 80px;
            height: 60px;
          }
        }
      </style>
    </head>
    <body>
      <div class="invitation-container">
        <div class="ornamental-border"></div>
        <div class="floral-ornament-top"></div>
        <div class="floral-ornament-bottom"></div>
        
                 <div class="header">
           ${title ? `
           <h1 class="title">${title}</h1>
           <p class="subtitle">${subtitle}</p>
           ` : `
           <p class="subtitle">${subtitle}</p>
           `}
         </div>
        
                 <div class="content">
           ${invitationType === 'benediction' ? `
           <p class="greeting">Cher(e) ${data.firstName} ${data.lastName},</p>
           
           <p class="message">
             ${message}
           </p>
           ` : `
           <p class="greeting">Cher(e) ${data.firstName} ${data.lastName},</p>
           
           <p class="message">
             ${message}
           </p>
           
           <div class="ornament">❦</div>
           
           <p class="signature">Avec toute notre affection,<br>Joel & Eunice</p>
           `}
         </div>
        
                 ${await generateQRCodeWithImage(data.guestCode)}
        
        <div class="footer">
          <p style="margin-bottom: 10px; font-weight: 600;">Pour toute question, veuillez contacter les organisateurs</p>
          <p>📧 contact@joel-eunice-wedding.com | 📱 +243 XXX XXX XXX</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Créer un blob avec le contenu HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Ouvrir dans une nouvelle fenêtre pour impression
  const printWindow = window.open(url, '_blank');
  
  if (printWindow) {
    printWindow.onload = () => {
      // Attendre que la page soit chargée puis imprimer
      setTimeout(() => {
        printWindow.print();
        // Fermer la fenêtre après impression
        setTimeout(() => {
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 1000);
      }, 500);
    };
  } else {
    // Fallback si la fenêtre ne peut pas être ouverte
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
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