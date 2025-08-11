import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './RSVP.css';
import { findGuest, generateGuestCode, Guest } from '../utils/excelReader';
import { loadGuestListHybrid, findGuestInList } from '../utils/guestData';
import { generateInvitationHTML } from '../utils/pdfGenerator';

const RSVP: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [guestFound, setGuestFound] = useState<Guest | null>(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [invitedGuests, setInvitedGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExcelLoaded, setIsExcelLoaded] = useState(false);

  // Optimisation : Charger la liste des invités avec un délai réduit
  useEffect(() => {
    const loadGuestList = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Charger la liste des invités (Excel en local, données intégrées en ligne)
        const guests = await loadGuestListHybrid();
        setInvitedGuests(guests);
        setIsExcelLoaded(true);
        console.log(`✅ Liste des invités chargée avec succès : ${guests.length} invités trouvés`);
      } catch (error) {
        console.error('❌ Erreur lors du chargement de la liste des invités:', error);
        setIsExcelLoaded(false);
        setError('La vérification des invités n\'est pas disponible. Veuillez nous contacter directement.');
      } finally {
        setIsLoading(false);
      }
    };

    // Réduire le délai de chargement
    const timer = setTimeout(loadGuestList, 100);
    return () => clearTimeout(timer);
  }, []);

  // Optimisation : Fonction mémorisée pour vérifier l'invité
  const checkGuest = useCallback(() => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!isExcelLoaded || invitedGuests.length === 0) {
      setError('La liste des invités n\'est pas encore chargée');
      return;
    }

    setIsChecking(true);
    setError('');
    setGuestFound(null);

    // Réduire le timeout de vérification
    setTimeout(() => {
      const foundGuest = findGuestInList(firstName, lastName);

      if (foundGuest) {
        setGuestFound(foundGuest);
        setError('');
        console.log(`✅ Invité trouvé : ${foundGuest.firstName} ${foundGuest.lastName}`);
      } else {
        setError('Désolé, votre nom ne figure pas sur notre liste d\'invités. Veuillez contacter les organisateurs.');
        setGuestFound(null);
        console.log(`❌ Invité non trouvé : ${firstName} ${lastName}`);
      }
      setIsChecking(false);
    }, 300); // Réduit de 1000ms à 300ms
  }, [firstName, lastName, isExcelLoaded, invitedGuests.length]);

  // Optimisation : Fonction mémorisée pour télécharger l'invitation
  const downloadInvitation = useCallback(async (invitationType: 'benediction' | 'soiree') => {
    if (!guestFound) return;

    setIsGenerating(true);

    try {
      const guestCode = generateGuestCode(guestFound.firstName, guestFound.lastName);
      
      // Générer et télécharger l'invitation HTML
      await generateInvitationHTML({
        firstName: guestFound.firstName,
        lastName: guestFound.lastName,
        guestCode: guestCode,
        invitationType: invitationType
      });
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      setError('Erreur lors de la génération de l\'invitation. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  }, [guestFound]);

  // Optimisation : Mémoriser les boutons d'action
  const actionButtons = useMemo(() => {
    if (!guestFound) return null;

    const buttons = [];
    
    if (guestFound.invitationType === 'benediction') {
      buttons.push(
        <button 
          key="benediction"
          className="btn btn-primary"
          onClick={() => downloadInvitation('benediction')}
          disabled={isGenerating}
        >
          {isGenerating ? 'Génération...' : '⛪ Télécharger invitation Bénédiction'}
        </button>
      );
    }
    
    if (guestFound.invitationType === 'soiree') {
      buttons.push(
        <button 
          key="soiree"
          className="btn btn-primary"
          onClick={() => downloadInvitation('soiree')}
          disabled={isGenerating}
        >
          {isGenerating ? 'Génération...' : '🎉 Télécharger invitation Soirée'}
        </button>
      );
    }
    
    if (guestFound.invitationType === 'both') {
      buttons.push(
        <div key="both" className="both-invitations">
          <button 
            className="btn btn-primary"
            onClick={() => downloadInvitation('benediction')}
            disabled={isGenerating}
          >
            {isGenerating ? 'Génération...' : '⛪ Télécharger invitation Bénédiction'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => downloadInvitation('soiree')}
            disabled={isGenerating}
          >
            {isGenerating ? 'Génération...' : '🎉 Télécharger invitation Soirée'}
          </button>
        </div>
      );
    }
    
    buttons.push(
      <button key="confirm" className="btn btn-secondary">
        ✅ Confirmer ma présence
      </button>
    );
    
    return buttons;
  }, [guestFound, isGenerating, downloadInvitation]);

  // Optimisation : Mémoriser les badges d'invitation
  const invitationBadges = useMemo(() => {
    if (!guestFound) return null;

    const badges = [];
    
    if (guestFound.invitationType === 'benediction') {
      badges.push(<span key="benediction" className="badge benediction">⛪ Bénédiction Nuptiale</span>);
    }
    if (guestFound.invitationType === 'soiree') {
      badges.push(<span key="soiree" className="badge soiree">🎉 Soirée Dansante</span>);
    }
    if (guestFound.invitationType === 'both') {
      badges.push(
        <span key="benediction" className="badge benediction">⛪ Bénédiction Nuptiale</span>,
        <span key="soiree" className="badge soiree">🎉 Soirée Dansante</span>
      );
    }
    
    return badges;
  }, [guestFound]);

  if (isLoading) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="section-header">
            <h2>Confirmer ma présence</h2>
            <p>Initialisation du système de vérification...</p>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Vérification de la disponibilité...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="container">
        <div className="section-header">
          <h2>Confirmer ma présence</h2>
          <p>Vérifiez votre invitation et confirmez votre présence</p>
          <div className="rsvp-welcome-text">
            <p>
              Que vous soyez là pour danser, rire, pleurer de joie (ou tout ça à la fois), votre présence est ce qui rendra cette journée encore plus mémorable.
            </p>
            <p>
              C'est de ce cadre que nous vous prions de bien vouloir confirmer votre présence à notre mariage.
            </p>
          </div>
        </div>

        <div className="rsvp-content">
          <div className="rsvp-form">
                          <div className="guest-check-section">
                <h3>🔍 Vérifier mon invitation</h3>
                <p>Entrez votre nom pour vérifier votre invitation</p>



                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                    className={error && !firstName ? 'error' : ''}
                    disabled={!isExcelLoaded}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom"
                    className={error && !lastName ? 'error' : ''}
                    disabled={!isExcelLoaded}
                  />
                </div>

                <button 
                  className="btn btn-primary check-btn"
                  onClick={checkGuest}
                  disabled={isChecking || !isExcelLoaded}
                >
                  {isChecking ? 'Vérification...' : 'Vérifier mon invitation'}
                </button>

              {error && (
                <div className="error-message">
                  <span>⚠️ {error}</span>
                  {error.includes('contacter les organisateurs') && (
                    <div className="contact-info">
                      <p><strong>Pour toute question :</strong></p>
                      <p>📧 Email : contact@joel-eunice-wedding.com</p>
                      <p>📱 Téléphone : +243 XXX XXX XXX</p>
                    </div>
                  )}
                </div>
              )}

                             {guestFound && (
                 <div className="guest-found">
                   <div className="success-message">
                     <span>✅ Invitation trouvée !</span>
                   </div>
                   
                   <div className="guest-info">
                     <h3>Bienvenue {guestFound.firstName} {guestFound.lastName}</h3>
                     <p>Votre invitation a été vérifiée avec succès.</p>
                     
                     {/* Affichage du type d'invitation */}
                     <div className="invitation-type">
                       <h4>Vos invitations :</h4>
                       <div className="invitation-badges">
                         {invitationBadges}
                       </div>
                     </div>
                     
                     <div className="action-buttons">
                       {actionButtons}
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>

                 {/* Section Lieu */}
         <div className="accommodation-section">
           <div className="section-header">
             <h2>📍 Lieu</h2>
           </div>

          <div className="accommodation-content">
                         {/* Adresse et Itinéraire */}
                           <div className="venue-simple">
                <h4>🏰 KEMESHA</h4>
                <p className="venue-address">
                  <strong>📍 Adresse :</strong> KEMESHA, Kinshasa, RDC
                </p>
               <button 
                 className="btn btn-primary venue-directions-btn"
                                   onClick={() => {
                    // Coordonnées GPS de KEMESHA
                    const destination = "-4.4419,15.2663";
                    const destinationName = "KEMESHA";
                    
                    // Vérifier si la géolocalisation est supportée
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const userLat = position.coords.latitude;
                          const userLng = position.coords.longitude;
                          const origin = `${userLat},${userLng}`;
                          
                          // Ouvrir Google Maps avec l'itinéraire
                          const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Kinshasa,+RDC/@${destination},15z/`;
                          window.open(mapsUrl, '_blank');
                        },
                        (error) => {
                          // Si la géolocalisation échoue, ouvrir juste la destination
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                          window.open(mapsUrl, '_blank');
                        }
                      );
                    } else {
                      // Fallback si la géolocalisation n'est pas supportée
                      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                      window.open(mapsUrl, '_blank');
                    }
                  }}
               >
                 🚗 Obtenir l'itinéraire depuis ma position
               </button>
             </div>

                         {/* Logements Recommandés */}
                           <div className="recommended-hotels">
                <h3>🏨 Logement à proximité recommandé</h3>
                
                <div className="hotels-intro">
                  <p>Pour vous aider à organiser votre séjour, voici quelques suggestions de logements situés à proximité du lieu de la cérémonie/réception.</p>
                  <p>Ces hébergements sont donnés à titre indicatif, et nous vous invitons à réserver dès que possible, car les disponibilités peuvent varier rapidement.</p>
                </div>

                                 <div className="hotels-list">
                   <h4>Options dans les environs :</h4>
                   <div className="hotels-grid">
                     <div className="hotel-card">
                       <h5>🏨 SANAM</h5>
                       <p><strong>📍 Distance :</strong> 2.5 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~8 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "SANAM Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers SANAM
                       </button>
                     </div>
                     
                     <div className="hotel-card">
                       <h5>🏨 Sultani Hôtel</h5>
                       <p><strong>📍 Distance :</strong> 1.8 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~6 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "Sultani Hôtel Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers Sultani
                       </button>
                     </div>
                     
                     <div className="hotel-card">
                       <h5>🏨 Novotel Kinshasa</h5>
                       <p><strong>📍 Distance :</strong> 3.2 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~10 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "Novotel Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers Novotel
                       </button>
                     </div>
                     
                     <div className="hotel-card">
                       <h5>🏨 Hôtel Rotana</h5>
                       <p><strong>📍 Distance :</strong> 2.8 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~9 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "Hôtel Rotana Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers Rotana
                       </button>
                     </div>
                     
                     <div className="hotel-card">
                       <h5>🏨 Hilton Kinshasa</h5>
                       <p><strong>📍 Distance :</strong> 4.1 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~12 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "Hilton Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers Hilton
                       </button>
                     </div>
                     
                     <div className="hotel-card">
                       <h5>🏨 Pullman Kinshasa</h5>
                       <p><strong>📍 Distance :</strong> 3.7 km de KEMESHA</p>
                       <p><strong>⏱️ Temps :</strong> ~11 minutes en voiture</p>
                       <button 
                         className="btn btn-secondary hotel-directions-btn"
                         onClick={() => {
                           const destination = "Pullman Kinshasa";
                           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                           window.open(mapsUrl, '_blank');
                         }}
                       >
                         🚗 Itinéraire vers Pullman
                       </button>
                     </div>
                     
                                           <div className="hotel-card">
                        <h5>🏨 Sanash</h5>
                        <p><strong>📍 Distance :</strong> ~2.0 km de KEMESHA</p>
                        <p><strong>⏱️ Temps :</strong> ~7 minutes en voiture</p>
                        <button 
                          className="btn btn-secondary hotel-directions-btn"
                          onClick={() => {
                            const destination = "Sanash Kinshasa";
                            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                            window.open(mapsUrl, '_blank');
                          }}
                        >
                          🚗 Itinéraire vers Sanash
                        </button>
                      </div>
                     
                                           <div className="hotel-card">
                        <h5>🏨 Robem Tower</h5>
                        <p><strong>📍 Distance :</strong> ~2.2 km de KEMESHA</p>
                        <p><strong>⏱️ Temps :</strong> ~8 minutes en voiture</p>
                        <button 
                          className="btn btn-secondary hotel-directions-btn"
                          onClick={() => {
                            const destination = "Robem Tower Kinshasa";
                            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                            window.open(mapsUrl, '_blank');
                          }}
                        >
                          🚗 Itinéraire vers Robem Tower
                        </button>
                      </div>
                   </div>
                 </div>

                <div className="hotels-contact">
                  <p>Si vous avez besoin d'un petit coup de main pour trouver un logement ou poser une question, contactez-nous directement. Nous serons ravis de vous aider !</p>
                </div>
              </div>

            

            
           
            
          </div>
                 </div>


       </div>
     </section>
   );
 };

export default RSVP; 