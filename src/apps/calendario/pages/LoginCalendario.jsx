// LoginCalendario.jsx
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
    <div style={styles.container}>
      {/* Panel informativo */}
      <div style={styles.left}>
        <h2 style={styles.heading}>📅 Calendario colaborativo con historial de acciones</h2>
        <p>
          Aplicación web completa para gestionar eventos de forma colaborativa, con historial en vivo
          de acciones realizadas por los usuarios. Desarrollada con el stack <strong>MERN</strong> y FullCalendar.
        </p>

        <h3 style={styles.subheading}>🚀 Funcionalidades principales</h3>
        <ul>
          <li>Calendario interactivo para crear, editar y eliminar eventos.</li>
          <li>Historial de acciones en vivo, mostrando quién hizo qué y cuándo.</li>
          <li>Autenticación segura con JWT y localStorage.</li>
          <li>API RESTful para login, eventos y registro de historial.</li>
          <li>Feedback visual con SweetAlert2 y diseño responsive.</li>
        </ul>

        <h3 style={styles.subheading}>🛠️ Tecnologías utilizadas</h3>
        <ul>
          <li>Frontend: React 18, FullCalendar, SweetAlert2.</li>
          <li>Backend: Node.js y Express.</li>
          <li>Base de datos: MongoDB + Mongoose.</li>
          <li>Autenticación: JWT + localStorage.</li>
        </ul>

        <h3 style={styles.subheading}>🎯 ¿Qué aprendí con este proyecto?</h3>
        <ul>
          <li>Integrar bibliotecas de terceros como FullCalendar y SweetAlert2 en React.</li>
          <li>Diseñar un historial en vivo y mostrarlo de forma scrollable y actualizada.</li>
          <li>Implementar JWT y localStorage para sesiones seguras y persistentes.</li>
          <li>Manejar operaciones CRUD de manera eficiente con Express y MongoDB.</li>
          <li>Crear una experiencia de usuario fluida y moderna.</li>
        </ul>

        <h3 style={styles.subheading}>🔑 Usuarios de prueba</h3>
        <ul>
          <li><code>prueba1@gmail.com / 123456</code></li>
          <li><code>prueba2@gmail.com / 123456</code></li>
        </ul>

        <p style={styles.summary}>
          Este proyecto demuestra mis habilidades fullstack y mi enfoque en la experiencia de usuario.
        </p>
      </div>

      {/* Formulario de inicio de sesión */}
      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>🔐 Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Entrar</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f7f7f7',
    flexWrap: 'wrap',
  },
  left: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ddd',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    minWidth: '300px',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
    padding: '2rem',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '480px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
  },
  input: {
    padding: '0.9rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1.1rem',
    outline: 'none',
  },
  button: {
    padding: '0.9rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    marginTop: '1rem',
    color: '#dc3545',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    marginBottom: '1rem',
  },
  subheading: {
    marginTop: '1.2rem',
    color: '#333',
  },
  summary: {
    marginTop: '1rem',
    fontStyle: 'italic',
    color: '#555',
  },
};

export default LoginCalendario;
