import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const LoginAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Connexion réussie !');
      setSuccess(true);
      setEmail('');
      setPassword('');
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 800);
    } catch (error: any) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '2.5rem auto', padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fff', boxShadow: '0 2px 12px rgba(229,57,53,0.07)' }}>
      <h2 style={{ textAlign: 'center', color: '#e53935', marginBottom: 24 }}>Connexion administrateur</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="login-email" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label htmlFor="login-password" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Mot de passe</label>
          <input
            id="login-password"
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
          {loading ? 'Connexion...' : "Se connecter"}
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
    </div>
  );
};

export default LoginAdmin; 