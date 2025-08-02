import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./LoginModal.css";
import logo from "../images/logo.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      onLoginSuccess && onLoginSuccess();
      onClose();
    } catch (err: any) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess && onLoginSuccess();
      onClose();
    } catch (err: any) {
      setError("Erreur lors de la connexion Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>×</button>
        <img src={logo} alt="Logo" className="login-modal-logo" />
        <h2 className="login-modal-title">Connexion à votre espace</h2>
        <form onSubmit={handleEmailLogin} className="login-form">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <div className="login-divider">ou</div>
        <button className="google-login-btn" onClick={handleGoogleLogin} disabled={loading} aria-label="Se connecter avec Google">
          <svg className="google-logo-svg" width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" fill="#fff"/>
            <text x="24" y="32" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#4285F4" font-weight="bold">G</text>
          </svg>
        </button>
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
};

export default LoginModal; 