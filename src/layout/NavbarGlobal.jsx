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
    <nav className="bg-dark border-bottom border-black py-2">
      <div className="container-fluid d-flex justify-content-center flex-wrap gap-2">
        <NavItem to="/"><span role="img" aria-label="Home">🏠</span> Home</NavItem>
        <NavItem to={rutaBiblioteca}><span role="img" aria-label="Biblioteca">🎬</span> Biblioteca</NavItem>
        <NavItem to="/logincalendario"><span role="img" aria-label="Calendario">📅</span> Calendario</NavItem>
        <NavItem to="/rentacar"><span role="img" aria-label="Rentacar">🚗</span> Rentacar</NavItem>
        <NavItem to="/tetris"><span role="img" aria-label="Tetris">🧩</span> Tetris</NavItem>
      </div>
    </nav>
  );
};

const NavItem = ({ to, children }) => (
  <Link
    to={to}
    className="btn btn-outline-dark bg-white d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm text-decoration-none text-dark"
    style={{
      minWidth: '90px',
      maxWidth: '150px',
      fontSize: '0.95rem',
      transition: 'all 0.25s ease',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#000';
      e.target.style.color = '#fff';
      e.target.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#fff';
      e.target.style.color = '#000';
      e.target.style.transform = 'scale(1)';
    }}
  >
    {children}
  </Link>
);

export default NavbarGlobal;
