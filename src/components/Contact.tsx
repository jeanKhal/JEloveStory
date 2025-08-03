import React, { useState } from 'react';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'jean.marie@example.com',
      action: 'mailto:jean.marie@example.com'
    },
    {
      icon: '📱',
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      action: 'tel:+33123456789'
    },
    {
      icon: '📍',
      title: 'Adresse',
      value: '456 Avenue des Rois, 78000 Versailles',
      action: 'https://maps.google.com'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="contact-success">
            <div className="success-icon">✅</div>
            <h1>Message envoyé !</h1>
            <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
            <button 
              className="btn-new-message"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
                });
              }}
            >
              Nouveau message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>Un message ? N&apos;hésitez pas à nous contacter !</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Nos Coordonnées</h2>
            <div className="info-list">
              {contactInfo.map((info, index) => (
                <div key={`contact-info-${info.title.replace(/\s+/g, '-')}-${index}`} className="info-item">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-details">
                    <h3>{info.title}</h3>
                    <a href={info.action} target="_blank" rel="noopener noreferrer">
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h3>Suivez-nous</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">🐦</a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Envoyez-nous un message</h2>
            
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
              <label>Sujet *</label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              >
                <option value="">Choisissez un sujet</option>
                <option value="rsvp">Confirmation de présence</option>
                <option value="logistics">Logistique</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                placeholder="Votre message..."
                rows={5}
              />
            </div>

            <button type="submit" className="btn-submit">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 