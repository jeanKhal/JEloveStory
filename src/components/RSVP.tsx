import React, { useState, useEffect } from 'react';
import './RSVP.css';
import { loadGuestListFromFile, findGuest, generateGuestCode, Guest } from '../utils/excelReader';
import { generateInvitationPDF } from '../utils/pdfGenerator';
import image1 from '../assets/_MT_0194.jpeg';
import image2 from '../assets/_MT_0204.jpeg';
import image3 from '../assets/_MT_0221.jpeg';


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

  // Charger automatiquement le fichier liste.xlsx au montage du composant
  useEffect(() => {
    const loadGuestList = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const guests = await loadGuestListFromFile();
        setInvitedGuests(guests);
        setIsExcelLoaded(true);
        
        console.log(`✅ Liste des invités chargée avec succès : ${guests.length} invités trouvés`);
      } catch (error) {
        console.error('❌ Erreur lors du chargement de la liste des invités:', error);
        setError('Erreur lors du chargement de la liste des invités. Vérifiez que le fichier liste.xlsx existe.');
        setIsExcelLoaded(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadGuestList();
  }, []);

  // Fonction pour vérifier l'invité (insensible à la casse)
  const checkGuest = () => {
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

    // Simulation d'une vérification asynchrone
    setTimeout(() => {
      const foundGuest = findGuest(invitedGuests, firstName, lastName);

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
    }, 1000);
  };

  // Fonction pour générer et télécharger l'invitation PDF
  const generateInvitation = () => {
    if (!guestFound) return;

    setIsGenerating(true);

    // Simulation de génération d'invitation
    setTimeout(() => {
      const guestCode = generateGuestCode(guestFound.firstName, guestFound.lastName);
      
      // Générer le PDF d'invitation
      generateInvitationPDF({
        firstName: guestFound.firstName,
        lastName: guestFound.lastName,
        guestCode: guestCode
      });

      setIsGenerating(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="section-header">
            <h2>Confirmer ma présence</h2>
            <p>Chargement de la liste des invités...</p>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Lecture du fichier liste.xlsx...</p>
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
                    
                    <div className="action-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={generateInvitation}
                        disabled={isGenerating}
                      >
                        {isGenerating ? 'Génération...' : '📄 Télécharger mon invitation PDF'}
                      </button>
                      
                      <button className="btn btn-secondary">
                        ✅ Confirmer ma présence
                      </button>
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
               <h4>🏰 Hôtel Rotana Kinshasa</h4>
               <p className="venue-address">
                 <strong>📍 Adresse :</strong> Boulevard du 30 Juin, Kinshasa, RDC
               </p>
               <button 
                 className="btn btn-primary venue-directions-btn"
                 onClick={() => {
                   // Coordonnées GPS de l'Hôtel Rotana Kinshasa
                   const destination = "-4.4419,15.2663";
                   const destinationName = "Hôtel Rotana Kinshasa";
                   
                   // Vérifier si la géolocalisation est supportée
                   if (navigator.geolocation) {
                     navigator.geolocation.getCurrentPosition(
                       (position) => {
                         const userLat = position.coords.latitude;
                         const userLng = position.coords.longitude;
                         const origin = `${userLat},${userLng}`;
                         
                         // Ouvrir Google Maps avec l'itinéraire
                         const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Boulevard+du+30+Juin,+Kinshasa,+RDC/@${destination},15z/`;
                         window.open(mapsUrl, '_blank');
                       },
                       (error) => {
                         // Si la géolocalisation échoue, ouvrir juste la destination
                         const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Boulevard+du+30+Juin,+Kinshasa,+RDC`;
                         window.open(mapsUrl, '_blank');
                       }
                     );
                   } else {
                     // Fallback si la géolocalisation n'est pas supportée
                     const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Boulevard+du+30+Juin,+Kinshasa,+RDC`;
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
               
                               <div className="hotels-grid">
                  <div className="hotel-card simple">
                    <h4>🏨 Grand Hôtel Kinshasa</h4>
                    <p><strong>📍 Distance :</strong> 0.5 km du Rotana</p>
                    <button 
                      className="btn btn-secondary hotel-directions-btn"
                      onClick={() => {
                        const destination = "-4.4419,15.2663";
                        const destinationName = "Grand Hôtel Kinshasa";
                        
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const userLat = position.coords.latitude;
                              const userLng = position.coords.longitude;
                              const origin = `${userLat},${userLng}`;
                              
                              const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Kinshasa,+RDC/@${destination},15z/`;
                              window.open(mapsUrl, '_blank');
                            },
                            (error) => {
                              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                              window.open(mapsUrl, '_blank');
                            }
                          );
                        } else {
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                          window.open(mapsUrl, '_blank');
                        }
                      }}
                    >
                      🚗 Itinéraire
                    </button>
                  </div>

                  <div className="hotel-card simple">
                    <h4>🏨 Hotel Memling</h4>
                    <p><strong>📍 Distance :</strong> 1.2 km du Rotana</p>
                    <button 
                      className="btn btn-secondary hotel-directions-btn"
                      onClick={() => {
                        const destination = "-4.4419,15.2663";
                        const destinationName = "Hotel Memling Kinshasa";
                        
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const userLat = position.coords.latitude;
                              const userLng = position.coords.longitude;
                              const origin = `${userLat},${userLng}`;
                              
                              const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Kinshasa,+RDC/@${destination},15z/`;
                              window.open(mapsUrl, '_blank');
                            },
                            (error) => {
                              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                              window.open(mapsUrl, '_blank');
                            }
                          );
                        } else {
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                          window.open(mapsUrl, '_blank');
                        }
                      }}
                    >
                      🚗 Itinéraire
                    </button>
                  </div>

                  <div className="hotel-card simple">
                    <h4>🏨 Hotel Royal</h4>
                    <p><strong>📍 Distance :</strong> 0.8 km du Rotana</p>
                    <button 
                      className="btn btn-secondary hotel-directions-btn"
                      onClick={() => {
                        const destination = "-4.4419,15.2663";
                        const destinationName = "Hotel Royal Kinshasa";
                        
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const userLat = position.coords.latitude;
                              const userLng = position.coords.longitude;
                              const origin = `${userLat},${userLng}`;
                              
                              const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Kinshasa,+RDC/@${destination},15z/`;
                              window.open(mapsUrl, '_blank');
                            },
                            (error) => {
                              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                              window.open(mapsUrl, '_blank');
                            }
                          );
                        } else {
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                          window.open(mapsUrl, '_blank');
                        }
                      }}
                    >
                      🚗 Itinéraire
                    </button>
                  </div>

                  <div className="hotel-card simple">
                    <h4>🏨 Hotel Sultani</h4>
                    <p><strong>📍 Distance :</strong> 1.5 km du Rotana</p>
                    <button 
                      className="btn btn-secondary hotel-directions-btn"
                      onClick={() => {
                        const destination = "-4.4419,15.2663";
                        const destinationName = "Hotel Sultani Kinshasa";
                        
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const userLat = position.coords.latitude;
                              const userLng = position.coords.longitude;
                              const origin = `${userLat},${userLng}`;
                              
                              const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinationName},+Kinshasa,+RDC/@${destination},15z/`;
                              window.open(mapsUrl, '_blank');
                            },
                            (error) => {
                              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                              window.open(mapsUrl, '_blank');
                            }
                          );
                        } else {
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destinationName},+Kinshasa,+RDC`;
                          window.open(mapsUrl, '_blank');
                        }
                      }}
                    >
                      🚗 Itinéraire
                    </button>
                  </div>
                </div>
             </div>

            

            
           
            
          </div>
                 </div>

         {/* Section Programme */}
         <div className="program-section">
           <div className="section-header">
             <h2>📅 Programme de la Journée</h2>
           </div>

           <div className="program-timeline">
             <div className="timeline-item">
               <div className="timeline-image">
                 <img src={image1} alt="Cérémonie religieuse" />
               </div>
               <div className="timeline-content">
                 <div className="timeline-time">14:00</div>
                                   <h3>💒 Cérémonie Religieuse</h3>
                  <p>KEMESHA, Kinshasa</p>
                 <div className="timeline-details">
                   <span>⏰ Durée : 1h30</span>
                   <span>👔 Tenue : Élégante</span>
                 </div>
               </div>
             </div>

             <div className="timeline-item">
               <div className="timeline-image">
                 <img src={image2} alt="Cocktail de réception" />
               </div>
               <div className="timeline-content">
                 <div className="timeline-time">16:00</div>
                 <h3>🥂 Cocktail de Réception</h3>
                 <p>Hôtel Rotana - Jardin</p>
                 <div className="timeline-details">
                   <span>⏰ Durée : 1h</span>
                   <span>🍾 Apéritifs et canapés</span>
                 </div>
               </div>
             </div>

             <div className="timeline-item">
               <div className="timeline-image">
                 <img src={image3} alt="Dîner de mariage" />
               </div>
               <div className="timeline-content">
                 <div className="timeline-time">18:00</div>
                 <h3>🍽️ Dîner de Mariage</h3>
                 <p>Hôtel Rotana - Salle de réception</p>
                 <div className="timeline-details">
                   <span>⏰ Durée : 3h</span>
                   <span>🎵 Musique et danses</span>
                 </div>
               </div>
             </div>


           </div>
         </div>
       </div>
     </section>
   );
 };

export default RSVP; 