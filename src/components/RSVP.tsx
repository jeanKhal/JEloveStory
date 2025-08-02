import React, { useState } from 'react';
import './RSVP.css';

interface RSVPForm {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no' | '';
  dietaryRestrictions: string;
  message: string;
}

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPForm>({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    attending: '',
    dietaryRestrictions: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof RSVPForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi
    console.log('RSVP submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rsvp-page">
        <div className="container">
          <div className="rsvp-success">
            <div className="success-icon">✅</div>
            <h1>Merci pour votre réponse !</h1>
            <p>Nous avons bien reçu votre confirmation de présence.</p>
            <p>Nous avons hâte de vous voir le jour J !</p>
            <button 
              className="btn-new-rsvp"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  guests: 1,
                  attending: '',
                  dietaryRestrictions: '',
                  message: ''
                });
              }}
            >
              Nouvelle réponse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rsvp-page">
      <div className="container">
        <div className="rsvp-header">
          <h1>Confirmez Votre Présence</h1>
          <p>Merci de nous confirmer votre présence avant le 1er Juin 2024</p>
        </div>

        <div className="rsvp-content">
          <div className="rsvp-info">
            <h2>Informations Importantes</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div>
                  <h3>Date limite</h3>
                  <p>1er Juin 2024</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">👥</span>
                <div>
                  <h3>Invitations</h3>
                  <p>Maximum 2 personnes par invitation</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🍽️</span>
                <div>
                  <h3>Réception</h3>
                  <p>Dîner et cocktail inclus</p>
                </div>
              </div>
            </div>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>
            <h2>Formulaire de Réponse</h2>
            
            <div className="form-group">
              <label>Nom complet *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Votre nom complet"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Assistez-vous à notre mariage ? *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={(e) => handleInputChange('attending', e.target.value)}
                    required
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Oui, avec plaisir !</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={(e) => handleInputChange('attending', e.target.value)}
                    required
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Non, malheureusement</span>
                </label>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <>
                <div className="form-group">
                  <label>Nombre de personnes</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  >
                    <option value={1}>1 personne</option>
                    <option value={2}>2 personnes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Régime alimentaire</label>
                  <textarea
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                    placeholder="Allergies, régimes spéciaux, etc."
                    rows={3}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Message (optionnel)</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Un petit mot pour les mariés..."
                rows={4}
              />
            </div>

            <button type="submit" className="btn-submit">
              Envoyer ma réponse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RSVP; 