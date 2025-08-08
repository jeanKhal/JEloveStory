import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateInvitation } from '../utils/guestData';
import './Validation.css';

interface ValidationResult {
  isValid: boolean;
  guest?: {
    firstName: string;
    lastName: string;
    invitationType: string;
  };
  message: string;
}

const Validation: React.FC = () => {
  const { guestCode, invitationType, token } = useParams<{
    guestCode: string;
    invitationType: 'benediction' | 'soiree';
    token: string;
  }>();
  
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateInvitationCode = async () => {
      if (!guestCode || !invitationType) {
        setValidationResult({
          isValid: false,
          message: 'Paramètres de validation manquants.'
        });
        setIsLoading(false);
        return;
      }

      try {
        // Simuler un délai pour l'effet de validation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const result = validateInvitation(guestCode, invitationType);
        setValidationResult(result);
      } catch (error) {
        setValidationResult({
          isValid: false,
          message: 'Erreur lors de la validation de l\'invitation.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    validateInvitationCode();
  }, [guestCode, invitationType]);

  if (isLoading) {
    return (
      <div className="validation-container">
        <div className="validation-loading">
          <div className="loading-spinner"></div>
          <h2>Validation de l'authenticité...</h2>
          <p>Vérification en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="validation-container">
      <div className={`validation-card ${validationResult?.isValid ? 'valid' : 'invalid'}`}>
        <div className="validation-header">
          <div className={`validation-icon ${validationResult?.isValid ? 'valid' : 'invalid'}`}>
            {validationResult?.isValid ? '✓' : '✗'}
          </div>
          <h1>Validation d'Authenticité</h1>
        </div>
        
        <div className="validation-content">
          <h2>{validationResult?.isValid ? 'Invitation Authentique' : 'Invitation Non Valide'}</h2>
          
          {validationResult?.guest && (
            <div className="guest-info">
              <p><strong>Invité :</strong> {validationResult.guest.firstName} {validationResult.guest.lastName}</p>
              <p><strong>Type d'invitation :</strong> {validationResult.guest.invitationType}</p>
              <p><strong>Événement validé :</strong> {invitationType === 'benediction' ? 'Bénédiction Nuptiale' : 'Soirée Dansante'}</p>
            </div>
          )}
          
          <div className="validation-message">
            <p>{validationResult?.message}</p>
          </div>
          
          {validationResult?.isValid && (
            <div className="validation-success">
              <div className="success-animation">
                <span>🎉</span>
                <span>✨</span>
                <span>🎊</span>
              </div>
              <p>Cette invitation est authentique et valide pour l'événement.</p>
            </div>
          )}
          
          {!validationResult?.isValid && (
            <div className="validation-error">
              <p>⚠️ Cette invitation ne peut pas être validée.</p>
              <p>Veuillez contacter les organisateurs pour plus d'informations.</p>
            </div>
          )}
        </div>
        
        <div className="validation-footer">
          <button 
            className="back-button"
            onClick={() => window.history.back()}
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Validation;
