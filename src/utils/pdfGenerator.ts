// Utilitaire pour générer des PDF d'invitation
// Utilise les APIs natives du navigateur

export interface InvitationData {
  firstName: string;
  lastName: string;
  guestCode: string;
}

// Fonction pour générer un PDF d'invitation
export const generateInvitationPDF = (data: InvitationData): void => {
  // Créer le contenu HTML de l'invitation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invitation au Mariage - ${data.firstName} ${data.lastName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 40px;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #f8f4e6 0%, #ffffff 100%);
          color: #2c2c2c;
          line-height: 1.6;
        }
        
        .invitation-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 2px solid #d4af37;
          position: relative;
          overflow: hidden;
        }
        
        .invitation-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #d4af37, #e8c39e, #d4af37);
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #f8f4e6;
          padding-bottom: 30px;
        }
        
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .subtitle {
          font-family: 'Dancing Script', cursive;
          font-size: 1.8rem;
          color: #6b6b6b;
          margin: 0;
          font-weight: 600;
        }
        
        .content {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .greeting {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: #2c2c2c;
          margin-bottom: 30px;
          font-weight: 600;
        }
        
        .message {
          font-size: 1.1rem;
          color: #6b6b6b;
          margin-bottom: 30px;
          line-height: 1.8;
        }
        
        .signature {
          font-family: 'Dancing Script', cursive;
          font-size: 1.6rem;
          color: #d4af37;
          margin: 30px 0;
          font-weight: 600;
        }
        
        .details {
          background: #f8f4e6;
          padding: 30px;
          border-radius: 15px;
          margin: 30px 0;
          border-left: 4px solid #d4af37;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-size: 1rem;
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
        }
        
        .detail-label {
          font-weight: 600;
          color: #2c2c2c;
        }
        
        .detail-value {
          color: #d4af37;
          font-weight: 500;
        }
        
        .guest-code {
          background: linear-gradient(135deg, #d4af37, #e8c39e);
          color: white;
          padding: 15px 25px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1.1rem;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 0.05em;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #f8f4e6;
          font-size: 0.9rem;
          color: #6b6b6b;
        }
        
        .ornament {
          font-size: 2rem;
          color: #d4af37;
          margin: 20px 0;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          
          .invitation-container {
            box-shadow: none;
            border: 1px solid #d4af37;
            padding: 40px;
          }
        }
      </style>
    </head>
    <body>
      <div class="invitation-container">
        <div class="header">
          <h1 class="title">Invitation au Mariage</h1>
          <p class="subtitle">Joel & Eunice</p>
        </div>
        
        <div class="content">
          <p class="greeting">Cher(e) ${data.firstName} ${data.lastName},</p>
          
          <p class="message">
            Nous avons le plaisir de vous inviter à célébrer notre mariage
            qui aura lieu le 29 Août 2025 à Kinshasa, RDC.
          </p>
          
          <p class="message">
            Votre présence nous honorerait grandement et nous permettrait
            de partager ce moment unique avec vous.
          </p>
          
          <div class="ornament">❦</div>
          
          <p class="signature">Avec toute notre affection,<br>Joel & Eunice</p>
        </div>
        
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">📅 Date :</span>
            <span class="detail-value">29 Août 2025</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">📍 Lieu :</span>
            <span class="detail-value">Kinshasa, RDC</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">🕐 Horaire :</span>
            <span class="detail-value">À confirmer</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">👔 Code vestimentaire :</span>
            <span class="detail-value">Élégant</span>
          </div>
        </div>
        
        <div class="guest-code">
          Code d'invité : ${data.guestCode}
        </div>
        
        <div class="footer">
          <p>Pour toute question, veuillez contacter les organisateurs</p>
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
    link.download = `Invitation_${data.firstName}_${data.lastName}.html`;
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