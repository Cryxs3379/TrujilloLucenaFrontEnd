import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const NavbarBiblioteca = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between', // 🔁 izquierda y derecha
      alignItems: 'center',
      padding: '0.6rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #000000',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
      {/* Izquierda: navegación */}
      <div style={{ display: 'flex', gap: '3rem' }}>
        <NavItem to="/biblioteca" icon="🎞️" label="Películas" />
        <NavItem to="/megustan" icon="❤️" label="Favoritos" />
      </div>

      {/* Derecha: acción */}
      <LogoutButton onClick={handleLogout} />
    </nav>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    style={{
      textDecoration: 'none',
      color: '#000000',
      padding: '0.5rem 1.2rem',
      border: '2px solid #000000',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      transition: 'all 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontWeight: '600',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.04)'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#000000';
      e.target.style.color = '#ffffff';
      e.target.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#ffffff';
      e.target.style.color = '#000000';
      e.target.style.transform = 'scale(1)';
    }}
  >
    <span style={{ fontSize: '1.5rem' }}>{icon}</span> {label}
  </Link>
);

const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '0.5rem 1.2rem',
      border: '2px solid #000000',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontFamily: 'Poppins, sans-serif',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontWeight: '600',
      transition: 'all 0.25s ease',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.04)'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#000000';
      e.target.style.color = '#ffffff';
      e.target.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#ffffff';
      e.target.style.color = '#000000';
      e.target.style.transform = 'scale(1)';
    }}
  >
    <span style={{ fontSize: '1.5rem' }}>🚪</span> Salir
  </button>
);

export default NavbarBiblioteca;
