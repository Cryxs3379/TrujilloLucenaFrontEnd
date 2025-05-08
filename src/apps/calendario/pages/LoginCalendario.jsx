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
      navigate('/homecalendario');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ width: '300px' }}>
        <h2 className="mb-3">Login Calendario 📅</h2>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default LoginCalendario;
