import React, { useState } from 'react';
import './Bibliotheque.css';

const Bibliotheque: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedFaculte, setSelectedFaculte] = useState<any>(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Données des facultés
  const facultes = [
    {
      id: 1,
      nom: 'Faculté de Médecine',
      icone: '🏥',
      description: 'Formation en médecine, pharmacie et sciences de la santé',
      couleur: '#e74c3c'
    },
    {
      id: 2,
      nom: 'Faculté de Droit',
      icone: '⚖️',
      description: 'Formation en droit civil, pénal et sciences juridiques',
      couleur: '#3498db'
    },
    {
      id: 3,
      nom: 'Faculté des Sciences',
      icone: '🔬',
      description: 'Formation en sciences naturelles, physique et chimie',
      couleur: '#2ecc71'
    },
    {
      id: 4,
      nom: 'Faculté des Lettres',
      icone: '📚',
      description: 'Formation en langues, littérature et sciences humaines',
      couleur: '#f39c12'
    },
    {
      id: 5,
      nom: 'Faculté d\'Ingénierie',
      icone: '⚙️',
      description: 'Formation en génie civil, électrique et mécanique',
      couleur: '#9b59b6'
    },
    {
      id: 6,
      nom: 'Faculté d\'Économie',
      icone: '💰',
      description: 'Formation en économie, gestion et sciences commerciales',
      couleur: '#1abc9c'
    },
    {
      id: 7,
      nom: 'Faculté de Psychologie',
      icone: '🧠',
      description: 'Formation en psychologie clinique et sciences cognitives',
      couleur: '#e67e22'
    },
    {
      id: 8,
      nom: 'Faculté d\'Agronomie',
      icone: '🌾',
      description: 'Formation en agriculture, élevage et sciences agronomiques',
      couleur: '#27ae60'
    },
    {
      id: 9,
      nom: 'Faculté de Théologie',
      icone: '⛪',
      description: 'Formation en théologie, philosophie et sciences religieuses',
      couleur: '#34495e'
    },
    {
      id: 10,
      nom: 'Faculté de Sciences Sociales',
      icone: '👥',
      description: 'Formation en sociologie, anthropologie et sciences politiques',
      couleur: '#8e44ad'
    },
    {
      id: 11,
      nom: 'Faculté de Sciences de l\'Éducation',
      icone: '🎓',
      description: 'Formation en pédagogie, didactique et sciences de l\'éducation',
      couleur: '#16a085'
    },
    {
      id: 12,
      nom: 'Faculté de Médecine Vétérinaire',
      icone: '🐾',
      description: 'Formation en médecine vétérinaire et santé animale',
      couleur: '#d35400'
    }
  ];



  // Filtrer les facultés
  const filteredFacultes = facultes.filter(faculte => {
    const matchesSearch = faculte.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculte.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Fonctions pour le modal de connexion
  const handleVisiterClick = (faculte: any) => {
    setSelectedFaculte(faculte);
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validation basique
    if (!loginData.email.trim()) {
      setErrors({ email: 'L\'identifiant est requis' });
      return;
    }
    if (!loginData.password.trim()) {
      setErrors({ password: 'Le mot de passe est requis' });
      return;
    }
    
    // Ici vous pouvez ajouter la logique de connexion
    console.log('Tentative de connexion pour:', selectedFaculte?.nom);
    console.log('Email:', loginData.email);
    console.log('Password:', loginData.password);
    
    // Simuler une connexion réussie
    alert(`Connexion réussie à ${selectedFaculte?.nom}!`);
    setShowLoginModal(false);
    setLoginData({ email: '', password: '' });
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setLoginData({ email: '', password: '' });
    setErrors({});
  };

  const handleCreateAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setErrors({});
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validation des champs
    const newErrors: {[key: string]: string} = {};
    
    if (!registerData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    if (!registerData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }
    if (!registerData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!registerData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!registerData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Ici vous pouvez ajouter la logique d'inscription
    console.log('Tentative d\'inscription pour:', selectedFaculte?.nom);
    console.log('Données d\'inscription:', registerData);
    
    // Simuler une inscription réussie
    alert(`Inscription réussie à ${selectedFaculte?.nom}!`);
    setShowRegisterModal(false);
    setRegisterData({ nom: '', prenom: '', email: '', password: '', confirmPassword: '' });
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
    setRegisterData({ nom: '', prenom: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="bibliotheque-container">
      {/* En-tête */}
      <div className="bibliotheque-header">
        <h1 className="bibliotheque-title">Bibliothèque Numérique</h1>
        <p className="bibliotheque-description">
          Découvrez notre collection de ressources numériques pour enrichir vos compétences
        </p>
      </div>

             {/* Barre de recherche */}
       <div className="bibliotheque-filters">
         <div className="search-container">
           <input
             type="text"
             placeholder="Rechercher une faculté..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="search-input"
           />
           <span className="search-icon">🔍</span>
         </div>
       </div>

      

      {/* Liste des facultés */}
      <div className="facultes-container">
        {filteredFacultes.length > 0 ? (
          <div className="facultes-grid">
            {filteredFacultes.map(faculte => (
              <div key={faculte.id} className="faculte-card" style={{borderTopColor: faculte.couleur}}>
                                 <div className="faculte-header">
                   <span className="faculte-icone" style={{color: faculte.couleur}}>{faculte.icone}</span>
                 </div>
                 
                 <div className="faculte-content">
                   <h3 className="faculte-nom">{faculte.nom}</h3>
                 </div>
                
                                 <div className="faculte-actions">
                   <button 
                     className="btn-visiter" 
                     style={{backgroundColor: faculte.couleur}}
                     onClick={() => handleVisiterClick(faculte)}
                   >
                     🏛️ Visiter
                   </button>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>Aucune faculté trouvée</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Section d'aide */}
      <div className="bibliotheque-help">
        <h3>Besoin d'aide ?</h3>
        <p>
          Si vous ne trouvez pas la faculté que vous cherchez ou si vous avez des questions 
          sur les formations proposées, n'hésitez pas à nous contacter.
        </p>
                 <button className="btn-contact">Contactez-nous</button>
       </div>

       {/* Modal de connexion */}
       {showLoginModal && (
         <div className="login-modal-overlay" onClick={handleCloseModal}>
           <div className="login-modal" onClick={(e) => e.stopPropagation()}>
             <div className="login-modal-header">
               <h3>Connexion à {selectedFaculte?.nom}</h3>
               <button className="login-modal-close" onClick={handleCloseModal}>
                 ✕
               </button>
             </div>
             
             <form onSubmit={handleLoginSubmit} className="login-form">
                               <div className="form-group">
                  <label htmlFor="email">Id</label>
                  <input
                    type="text"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                    placeholder="Votre identifiant"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
               
               <div className="form-group">
                 <label htmlFor="password">Mot de passe</label>
                 <input
                   type="password"
                   id="password"
                   value={loginData.password}
                   onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                   required
                   placeholder="Votre mot de passe"
                   className={errors.password ? 'error' : ''}
                 />
                 {errors.password && <span className="error-message">{errors.password}</span>}
               </div>
               
                               <div className="login-actions">
                  <button type="submit" className="btn-login">
                    Se connecter
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    Annuler
                  </button>
                </div>
                
                <div className="login-footer">
                                     <p>
                     Pas encore de compte ?{' '}
                     <a href="#" className="create-account-link" onClick={handleCreateAccountClick}>
                       Créer un compte
                     </a>
                   </p>
                </div>
             </form>
           </div>
         </div>
               )}

        {/* Modal d'inscription */}
        {showRegisterModal && (
          <div className="login-modal-overlay" onClick={handleCloseRegisterModal}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
              <div className="login-modal-header">
                <h3>Inscription à {selectedFaculte?.nom}</h3>
                <button className="login-modal-close" onClick={handleCloseRegisterModal}>
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleRegisterSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    value={registerData.nom}
                    onChange={(e) => setRegisterData({...registerData, nom: e.target.value})}
                    required
                    placeholder="Votre nom"
                    className={errors.nom ? 'error' : ''}
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    value={registerData.prenom}
                    onChange={(e) => setRegisterData({...registerData, prenom: e.target.value})}
                    required
                    placeholder="Votre prénom"
                    className={errors.prenom ? 'error' : ''}
                  />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">Email</label>
                  <input
                    type="email"
                    id="register-email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    required
                    placeholder="votre@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">Mot de passe</label>
                  <input
                    type="password"
                    id="register-password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                    placeholder="Votre mot de passe"
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                    placeholder="Confirmez votre mot de passe"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                
                <div className="login-actions">
                  <button type="submit" className="btn-login">
                    S'inscrire
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCloseRegisterModal}>
                    Annuler
                  </button>
                </div>
                
                <div className="login-footer">
                  <p>
                    Déjà un compte ?{' '}
                    <a href="#" className="create-account-link" onClick={(e) => {
                      e.preventDefault();
                      setShowRegisterModal(false);
                      setShowLoginModal(true);
                    }}>
                      Se connecter
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Bibliotheque; 