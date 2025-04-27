import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    onLogout(); // 👈 ACTUALIZA EL ESTADO
    navigate('/');
  };

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) return null;

  return (
    <nav style={{
      padding: '1rem 2rem',
      background: '#ffffff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div>
        <Link to="/biblioteca" style={{ marginRight: '1.5rem', textDecoration: 'none', color: '#333', fontWeight: '500' }}>📚 Biblioteca</Link>
        <Link to="/megustan" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>❤️ Me gustan</Link>
      </div>
      <button onClick={handleLogout} style={{
        background: '#ff4d4f',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.3s'
      }}>🚪 Cerrar sesión</button>
    </nav>
    
  );
};


export default NavBar;