import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCalendario } from '../api/apiCalendario';

const LoginCalendario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginCalendario(email, password);
      localStorage.setItem('tokenCalendario', token);
      localStorage.setItem('userCalendario', JSON.stringify(user));
      navigate('/homecalendario'); // 👈 lo mandamos al home
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', width: '300px'
      }}>
        <h2>Login Calendario 📅</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.8rem' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.8rem' }}
        />
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Entrar
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginCalendario;
