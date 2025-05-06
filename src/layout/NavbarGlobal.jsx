import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarGlobal = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const rutaBiblioteca = usuario ? "/biblioteca" : "/login";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#111111',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.1rem',
      borderBottom: '3px solid #000000',
    }}>
      <NavItem to="/">🏠 Home</NavItem>
      <NavItem to={rutaBiblioteca}>🎬 Biblioteca</NavItem>
      <NavItem to="/logincalendario">📅 Calendario</NavItem>
      <NavItem to="/rentacar">🚗 Rentacar</NavItem>
      <NavItem to="/tetris">🧩 Tetris</NavItem>

      <style>{`
        @media (max-width: 768px) {
          nav {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        }
      `}</style>
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
        padding: '0.6rem 1rem',
        border: '2px solid #000000',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        flex: '1 1 120px', // <-- permite redimensionar en responsive
        textAlign: 'center',
        minWidth: '100px',
        maxWidth: '180px',
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
