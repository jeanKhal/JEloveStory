import React, { useState, useRef } from 'react';
import './InvitationGenerator.css';

interface InvitationData {
  guestName: string;
  coupleName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  rsvpDate: string;
  rsvpContact: string;
  message: string;
}

const InvitationGenerator: React.FC = () => {
  const [invitationData, setInvitationData] = useState<InvitationData>({
    guestName: '',
    coupleName: 'Joel & Eunice',
    date: '15 Juin 2024',
    time: '14h00',
    venue: 'Église Saint-Pierre',
    address: '123 Rue de la Paix, 75001 Paris',
    rsvpDate: '1er Juin 2024',
    rsvpContact: '+33 1 23 45 67 89',
    message: 'Nous avons le plaisir de vous inviter à célébrer notre union.'
  });

  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [previewMode, setPreviewMode] = useState(false);
  const invitationRef = useRef<HTMLDivElement>(null);

  const templates = [
    { id: 'classic', name: 'Classique', preview: '🎭' },
    { id: 'elegant', name: 'Élégant', preview: '✨' },
    { id: 'romantic', name: 'Romantique', preview: '💕' },
    { id: 'modern', name: 'Moderne', preview: '🌟' },
    { id: 'vintage', name: 'Vintage', preview: '🌹' }
  ];

  const handleInputChange = (field: keyof InvitationData, value: string) => {
    setInvitationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownload = () => {
    if (invitationRef.current) {
      // Ici vous pouvez implémenter la logique de téléchargement
      // Par exemple, utiliser html2canvas pour convertir en image
      alert('Fonctionnalité de téléchargement à implémenter');
    }
  };

  const handlePrint = () => {
    if (invitationRef.current) {
      window.print();
    }
  };

  const renderInvitation = () => {
    const templateClass = `invitation-template-${selectedTemplate}`;
    
    return (
      <div ref={invitationRef} className={`invitation-preview ${templateClass}`}>
        <div className="invitation-content">
          <div className="invitation-header">
            <h1 className="couple-names">{invitationData.coupleName}</h1>
            <p className="invitation-subtitle">Ont le plaisir de vous inviter</p>
          </div>

          <div className="invitation-body">
            <p className="guest-name">Cher(e) {invitationData.guestName || 'Invité(e)'}</p>
            
            <p className="message">{invitationData.message}</p>

            <div className="event-details">
              <div className="detail-item">
                <span className="detail-label">Date :</span>
                <span className="detail-value">{invitationData.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Heure :</span>
                <span className="detail-value">{invitationData.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Lieu :</span>
                <span className="detail-value">{invitationData.venue}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Adresse :</span>
                <span className="detail-value">{invitationData.address}</span>
              </div>
            </div>

            <div className="rsvp-section">
              <p className="rsvp-text">
                Merci de confirmer votre présence avant le {invitationData.rsvpDate}
              </p>
              <p className="rsvp-contact">{invitationData.rsvpContact}</p>
            </div>
          </div>

          <div className="invitation-footer">
            <p className="footer-text">Nous espérons vous y voir nombreux</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="invitation-generator">
      <div className="container">
        <div className="generator-header">
          <h1>Générateur d'Invitations</h1>
          <p>Créez votre invitation personnalisée pour le grand jour</p>
        </div>

        <div className="generator-content">
          {/* Formulaire */}
          <div className="form-section">
            <h2>Personnalisation</h2>
            
            <div className="form-group">
              <label>Nom de l'invité(e) :</label>
              <input
                type="text"
                value={invitationData.guestName}
                onChange={(e) => handleInputChange('guestName', e.target.value)}
                placeholder="Nom de l'invité(e)"
              />
            </div>

            <div className="form-group">
              <label>Noms des mariés :</label>
              <input
                type="text"
                value={invitationData.coupleName}
                onChange={(e) => handleInputChange('coupleName', e.target.value)}
                placeholder="Noms des mariés"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date :</label>
                <input
                  type="text"
                  value={invitationData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  placeholder="Date du mariage"
                />
              </div>
              <div className="form-group">
                <label>Heure :</label>
                <input
                  type="text"
                  value={invitationData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  placeholder="Heure"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Lieu :</label>
              <input
                type="text"
                value={invitationData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                placeholder="Lieu de la cérémonie"
              />
            </div>

            <div className="form-group">
              <label>Adresse :</label>
              <textarea
                value={invitationData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Adresse complète"
                rows={2}
              />
            </div>

            <div className="form-group">
              <label>Message personnalisé :</label>
              <textarea
                value={invitationData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Message personnalisé"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date limite RSVP :</label>
                <input
                  type="text"
                  value={invitationData.rsvpDate}
                  onChange={(e) => handleInputChange('rsvpDate', e.target.value)}
                  placeholder="Date limite"
                />
              </div>
              <div className="form-group">
                <label>Contact RSVP :</label>
                <input
                  type="text"
                  value={invitationData.rsvpContact}
                  onChange={(e) => handleInputChange('rsvpContact', e.target.value)}
                  placeholder="Téléphone ou email"
                />
              </div>
            </div>
          </div>

          {/* Sélection du template */}
          <div className="template-section">
            <h2>Choisissez un style</h2>
            <div className="template-grid">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`template-option ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="template-preview">{template.preview}</div>
                  <span className="template-name">{template.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="actions-section">
            <button
              className="btn-preview"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Masquer l\'aperçu' : 'Voir l\'aperçu'}
            </button>
            
            <div className="action-buttons">
              <button className="btn-print" onClick={handlePrint}>
                Imprimer
              </button>
              <button className="btn-download" onClick={handleDownload}>
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Aperçu */}
        {previewMode && (
          <div className="preview-section">
            <h2>Aperçu de votre invitation</h2>
            <div className="preview-container">
              {renderInvitation()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationGenerator; 