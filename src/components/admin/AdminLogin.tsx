import React, { useState } from 'react';

const ADMIN_PASSWORD = 'admin2024';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: '60px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 18px rgba(229,57,53,0.10)', padding: 32 }}>
      <h2 style={{ color: '#e53935', textAlign: 'center', marginBottom: 18 }}>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(''); }}
          style={{ width: '100%', padding: '12px 10px', borderRadius: 8, border: '1.5px solid #e53935', marginBottom: 14 }}
        />
        {error && <div style={{ color: '#e53935', marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 22, padding: '10px 0', fontWeight: 600, width: '100%', fontSize: '1.08rem', cursor: 'pointer' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default AdminLogin; 