import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarGlobal = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const rutaBiblioteca = usuario ? "/biblioteca" : "/login";

  const handleLogout = () => {
    logout(); // 👈 Llama a tu context para limpiar la sesión
    navigate('/'); // 👈 Después te lleva al home
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1.5rem',
      padding: '1.5rem 2rem',
      backgroundColor: '#111111',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.2rem',
      borderBottom: '3px solid #000000',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavItem to="/">🏠 Home</NavItem>
        <NavItem to={rutaBiblioteca}>🎬 Biblioteca</NavItem>
        <NavItem to="/logincalendario">📅 Calendario</NavItem>
      </div>

      {/* Botón de Logout a la derecha */}
      {usuario && (
        <button onClick={handleLogout} style={{
          position: 'absolute',
          right: '2rem',
          backgroundColor: '#dc3545',
          color: '#ffffff',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#b02a37'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          🚪 Cerrar sesión
        </button>
      )}
    </nav>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: '#000000',
        padding: '0.8rem 1.2rem',
        border: '2px solid #000000',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#000000';
        e.target.style.color = '#ffffff';
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.color = '#000000';
        e.target.style.transform = 'scale(1)';
      }}
    >
      {children}
    </Link>
  );
};

export default NavbarGlobal;
