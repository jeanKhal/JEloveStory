import React, { useState } from 'react';
import './Formations.css';

interface Formation {
  id: string;
  titre: string;
  categorie: string;
  description: string;
  duree: string;
}

interface RegistrationForm {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
}

const formations = [
  // Développement Web
  { id: '1', titre: 'Développement Web - Initiation', description: 'Bases du HTML, CSS, JavaScript.', duree: '2 semaines', categorie: 'Développement Web' },
  { id: '2', titre: 'Développement Web - Avancé', description: 'React, Node.js, déploiement.', duree: '3 semaines', categorie: 'Développement Web' },
  // Design
  { id: '3', titre: 'Design Graphique', description: 'Photoshop, Illustrator, identité visuelle.', duree: '2 semaines', categorie: 'Design' },
  { id: '4', titre: 'UX/UI Design', description: 'Principes de l\'expérience utilisateur et interface.', duree: '2 semaines', categorie: 'Design' },
  // Marketing Digital
  { id: '5', titre: 'Marketing Digital - Fondamentaux', description: 'SEO, réseaux sociaux, emailing.', duree: '2 semaines', categorie: 'Marketing Digital' },
  { id: '6', titre: 'Publicité en ligne', description: 'Google Ads, Facebook Ads.', duree: '1 semaine', categorie: 'Marketing Digital' },
  // Data Science
  { id: '7', titre: 'Data Science - Initiation', description: 'Python, analyse de données.', duree: '2 semaines', categorie: 'Data Science' },
  { id: '8', titre: 'Machine Learning', description: 'Introduction aux algorithmes d\'apprentissage.', duree: '2 semaines', categorie: 'Data Science' },
  // Cybersécurité
  { id: '9', titre: 'Cybersécurité - Bonnes pratiques', description: 'Sécurité des mots de passe, phishing.', duree: '1 semaine', categorie: 'Cybersécurité' },
  { id: '10', titre: 'Protection des données', description: 'RGPD, sauvegarde, confidentialité.', duree: '1 semaine', categorie: 'Cybersécurité' },
  // Bureautique
  { id: '11', titre: 'Bureautique - Word & Excel', description: 'Maîtrise des outils bureautiques.', duree: '1 semaine', categorie: 'Bureautique' },
  { id: '12', titre: 'Bureautique - PowerPoint', description: 'Création de présentations efficaces.', duree: '1 semaine', categorie: 'Bureautique' },
  // Initiation Informatique
  { id: '13', titre: 'Initiation Informatique - Débutant', description: 'Découverte de l\'ordinateur et d\'internet.', duree: '1 semaine', categorie: 'Initiation Informatique' },
  { id: '14', titre: 'Initiation Informatique - Sécurité', description: 'Sécurité de base, antivirus.', duree: '1 semaine', categorie: 'Initiation Informatique' },
  // Réseaux sociaux
  { id: '15', titre: 'Réseaux sociaux - Utilisation', description: 'Facebook, WhatsApp, Instagram.', duree: '1 semaine', categorie: 'Réseaux sociaux' },
  { id: '16', titre: 'Réseaux sociaux - Stratégie', description: 'Développer sa présence en ligne.', duree: '1 semaine', categorie: 'Réseaux sociaux' },
  // Gestion de projet
  { id: '17', titre: 'Gestion de projet - Bases', description: 'Méthodes et outils de gestion.', duree: '2 semaines', categorie: 'Gestion de projet' },
  { id: '18', titre: 'Gestion de projet - Outils numériques', description: 'Trello, Asana, outils collaboratifs.', duree: '1 semaine', categorie: 'Gestion de projet' },
  // Entrepreneuriat
  { id: '19', titre: 'Entrepreneuriat - Lancer son activité', description: 'Business model, étude de marché.', duree: '2 semaines', categorie: 'Entrepreneuriat' },
  { id: '20', titre: 'Entrepreneuriat - Financement', description: 'Recherche de financements, pitch.', duree: '1 semaine', categorie: 'Entrepreneuriat' },
  // Comptabilité
  { id: '21', titre: 'Comptabilité - Initiation', description: 'Principes de base, gestion des comptes.', duree: '1 semaine', categorie: 'Comptabilité' },
  { id: '22', titre: 'Comptabilité - Logiciels', description: 'Utilisation de logiciels comptables.', duree: '1 semaine', categorie: 'Comptabilité' },
  // Langues
  { id: '23', titre: 'Langues - Anglais', description: 'Anglais général et professionnel.', duree: '2 semaines', categorie: 'Langues' },
  { id: '24', titre: 'Langues - Français', description: 'Perfectionnement en français.', duree: '2 semaines', categorie: 'Langues' },
  // Communication
  { id: '25', titre: 'Communication - Prise de parole', description: 'Techniques oratoires, confiance.', duree: '1 semaine', categorie: 'Communication' },
  { id: '26', titre: 'Communication - Communication digitale', description: 'Outils et réseaux numériques.', duree: '1 semaine', categorie: 'Communication' },
  // Audiovisuel
  { id: '27', titre: 'Audiovisuel - Vidéo', description: 'Tournage, montage vidéo.', duree: '2 semaines', categorie: 'Audiovisuel' },
  { id: '28', titre: 'Audiovisuel - Son', description: 'Prise de son, montage audio.', duree: '1 semaine', categorie: 'Audiovisuel' },
  // Robotique
  { id: '29', titre: 'Robotique - Initiation', description: 'Découverte de la robotique.', duree: '2 semaines', categorie: 'Robotique' },
  { id: '30', titre: 'Robotique - Programmation', description: 'Programmer un robot simple.', duree: '2 semaines', categorie: 'Robotique' },
  // Impression 3D
  { id: '31', titre: 'Impression 3D - Bases', description: 'Modélisation et impression 3D.', duree: '2 semaines', categorie: 'Impression 3D' },
  { id: '32', titre: 'Impression 3D - Projets', description: 'Réalisation de projets concrets.', duree: '2 semaines', categorie: 'Impression 3D' },
];

const Formations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    prenom: '',
    nom: '',
    telephone: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<RegistrationForm>>({});
  const formationsPerPage = 5;

  // Filtrer les formations par catégorie et recherche
  const filtered = formations.filter(formation => {
    const matchesCategory = selectedCategory === '' || formation.categorie === selectedCategory;
    const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calcul de la pagination
  const totalPages = Math.ceil(filtered.length / formationsPerPage);
  const startIndex = (currentPage - 1) * formationsPerPage;
  const endIndex = startIndex + formationsPerPage;
  const currentFormations = filtered.slice(startIndex, endIndex);

  // Réinitialiser la page quand les filtres changent
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(formations.map(f => f.categorie)));

  const openFormationModal = (formation: Formation) => {
    setSelectedFormation(formation);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFormation(null);
  };

  const handleRegistration = () => {
    setShowRegistrationForm(true);
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
    setRegistrationForm({ prenom: '', nom: '', telephone: '', email: '' });
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Partial<RegistrationForm> = {};

    if (!registrationForm.prenom.trim()) {
      errors.prenom = 'Le prénom est requis';
    }

    if (!registrationForm.nom.trim()) {
      errors.nom = 'Le nom est requis';
    }

    if (!registrationForm.telephone.trim()) {
      errors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^\+[1-9]\d{1,14}$/.test(registrationForm.telephone)) {
      errors.telephone = 'Format international requis (ex: +243123456789)';
    }

    if (!registrationForm.email.trim()) {
      errors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationForm.email)) {
      errors.email = 'Format d\'email invalide';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Ici vous pouvez ajouter la logique d'envoi des données
      alert(`Inscription confirmée pour ${selectedFormation?.titre}\n\nPrénom: ${registrationForm.prenom}\nNom: ${registrationForm.nom}\nTéléphone: ${registrationForm.telephone}\nEmail: ${registrationForm.email}`);
      
      closeRegistrationForm();
      closeModal();
    }
  };

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setRegistrationForm(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  // Fonction pour obtenir l'icône selon la catégorie
  const getFormationIcon = (categorie: string) => {
    const icons: { [key: string]: string } = {
      'Développement Web': '💻',
      'Design': '🎨',
      'Marketing Digital': '📱',
      'Data Science': '📊',
      'Cybersécurité': '🔒',
      'Bureautique': '📄',
      'Initiation Informatique': '🖥️',
      'Réseaux sociaux': '📱',
      'Gestion de projet': '📋',
      'Entrepreneuriat': '💼',
      'Comptabilité': '💰',
      'Langues': '🌍',
      'Communication': '📢',
      'Audiovisuel': '🎬',
      'Robotique': '🤖',
      'Impression 3D': '🖨️'
    };
    return icons[categorie] || '📚';
  };

  return (
    <div className="formations-container">
      <h2 className="formations-title">Nos Formations</h2>

      {/* Barre de recherche et filtre */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        <div className="filter-box">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
          </svg>
        </div>
      </div>

      {/* Informations sur les résultats */}
      <div className="results-info">
        <span className="results-count">
          {filtered.length} formation{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
          {totalPages > 1 && ` (page ${currentPage} sur ${totalPages})`}
        </span>
        {(selectedCategory || searchTerm) && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Tableau des formations */}
      <div className="table-container">
        <table className="formations-table">
          <thead>
            <tr>
              <th>Formation</th>
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {currentFormations.map((formation) => (
              <tr key={formation.id} className="formation-row">
                <td className="formation-title">{formation.titre}</td>
                <td className="formation-category">
                  <span className="category-badge">{formation.categorie}</span>
                </td>
                <td className="formation-duration">
                  <div className="duration-content">
                    <svg className="duration-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <span className="duration-badge">{formation.duree}</span>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => openFormationModal(formation)}
                    className="details-btn"
                    title="Voir les détails"
                  >
                                                        <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="no-formations">
          {searchTerm || selectedCategory ? 
            'Aucune formation ne correspond à votre recherche.' : 
            'Aucune formation disponible pour le moment.'
          }
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filtered.length)} sur {filtered.length} formations
          </div>
          
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
              Précédent
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Suivant
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal de détails */}
      {showModal && selectedFormation && (
        <div className="formation-modal-overlay" onClick={closeModal}>
          <div className="formation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h3 className="modal-title">{selectedFormation.titre}</h3>
                <p className="modal-subtitle">Détails de la formation</p>
              </div>
              <button onClick={closeModal} className="modal-close-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="modal-content">
              <div className="formation-details">
                <div className="detail-card category-card">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3z"/>
                      <path d="M9 9h6v6H9z"/>
                    </svg>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Catégorie</span>
                    <span className="detail-value category-value">{selectedFormation.categorie}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Durée</span>
                    <span className="detail-value">{selectedFormation.duree}</span>
                  </div>
                </div>

                <div className="detail-card description-card">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Description</span>
                    <p className="detail-description">{selectedFormation.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={closeModal} className="modal-cancel-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Annuler
              </button>
              <button onClick={handleRegistration} className="modal-register-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-2-2"/>
                  <path d="M16 16h6"/>
                </svg>
                S'enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulaire d'inscription */}
      {showRegistrationForm && selectedFormation && (
        <div className="formation-modal-overlay" onClick={closeRegistrationForm}>
          <div className="formation-modal registration-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h3 className="modal-title">Inscription à la formation</h3>
                <p className="modal-subtitle">{selectedFormation.titre}</p>
              </div>
              <button onClick={closeRegistrationForm} className="modal-close-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-content">
              <div className="registration-form">
                <div className="form-group">
                  <label htmlFor="prenom" className="form-label">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    value={registrationForm.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    className={`form-input ${formErrors.prenom ? 'error' : ''}`}
                    placeholder="Votre prénom"
                  />
                  {formErrors.prenom && <span className="error-message">{formErrors.prenom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="nom" className="form-label">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    value={registrationForm.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    className={`form-input ${formErrors.nom ? 'error' : ''}`}
                    placeholder="Votre nom"
                  />
                  {formErrors.nom && <span className="error-message">{formErrors.nom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="telephone" className="form-label">Numéro de téléphone *</label>
                  <input
                    type="tel"
                    id="telephone"
                    value={registrationForm.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    className={`form-input ${formErrors.telephone ? 'error' : ''}`}
                    placeholder="+243123456789"
                  />
                  {formErrors.telephone && <span className="error-message">{formErrors.telephone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Adresse email *</label>
                  <input
                    type="email"
                    id="email"
                    value={registrationForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="votre.email@exemple.com"
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
              </div>
            </form>

            <div className="modal-footer">
              <button onClick={closeRegistrationForm} className="modal-cancel-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Annuler
              </button>
              <button onClick={handleFormSubmit} className="modal-register-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
                Confirmer l'inscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formations; 