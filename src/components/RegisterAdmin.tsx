import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import LoginAdmin from './LoginAdmin';

const RegisterAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);
    try {
      // Crée l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Ajoute le rôle admin dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date()
      });
      setMessage('Administrateur créé avec succès !');
      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (showLogin) {
    return <LoginAdmin />;
  }

  return (
    <div style={{ maxWidth: 420, margin: '2.5rem auto', padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fff', boxShadow: '0 2px 12px rgba(229,57,53,0.07)' }}>
      <h2 style={{ textAlign: 'center', color: '#e53935', marginBottom: 24 }}>Créer un administrateur</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="admin-email" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input
            id="admin-email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label htmlFor="admin-password" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Mot de passe</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 0',
            background: loading ? '#ccc' : '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 17,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            marginBottom: 8
          }}
        >
          {loading ? 'Création...' : "Créer l'admin"}
        </button>
        {message && (
          <p style={{
            marginTop: 12,
            color: success ? '#388e3c' : '#d32f2f',
            background: success ? '#e8f5e9' : '#ffebee',
            border: `1px solid ${success ? '#388e3c' : '#d32f2f'}`,
            borderRadius: 6,
            padding: '10px 12px',
            textAlign: 'center',
            fontWeight: 500
          }}>{message}</p>
        )}
      </form>
      <button
        type="button"
        onClick={() => setShowLogin(true)}
        style={{
          width: '100%',
          padding: '10px 0',
          background: '#fff',
          color: '#e53935',
          border: '1px solid #e53935',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 10,
          transition: 'background 0.2s, color 0.2s'
        }}
      >
        Se connecter
      </button>
    </div>
  );
};

export default RegisterAdmin; 