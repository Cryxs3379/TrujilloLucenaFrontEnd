// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, contrasena);
      localStorage.setItem('usuario', JSON.stringify(user));
      onLogin?.(user);
      navigate('/biblioteca');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={styles.container}>
      {/* Panel informativo */}
      <div style={styles.left}>
        <h2 style={styles.heading}>🗂 Arquitectura ― “Netflix de bolsillo”</h2>
        <p><strong>MERN:</strong> MongoDB · Express/Node · React.</p>

        <h3 style={styles.subheading}>1️⃣ Interfaz (React)</h3>
        <ul>
          <li>Lista el catálogo, muestra botón ❤️ y sección de favoritos.</li>
        </ul>

        <h3 style={styles.subheading}>2️⃣ API (Express)</h3>
        <ul>
          <li><code>PUT /usuarios/:id/like</code> agrega la película al array.</li>
          <li><code>DELETE /usuarios/:id/like</code> la quita del array.</li>
        </ul>

        <h3 style={styles.subheading}>3️⃣ Base de datos (MongoDB)</h3>
        <ul>
          <li>Cada documento <code>Usuario</code> aloja su propio array <code>peliculaslike</code>.</li>
        </ul>

        <h3 style={styles.subheading}>4️⃣ Sesión (localStorage)</h3>
        <ul>
          <li>El usuario completo se guarda tras el login y tras cada cambio de likes.</li>
        </ul>

        <h3 style={styles.subheading}>5️⃣ Usuarios de prueba</h3>
        <ul>
          <li><code>usuariocalendario1@gmail.com / 123456</code></li>
          <li><code>usuariocalendario2@gmail.com / 123456</code></li>
        </ul>

        <p style={styles.summary}>
          En síntesis: catálogo global + favoritos personales persistentes, todo actualizado al instante.
        </p>
      </div>

      {/* Formulario de inicio de sesión */}
      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>🎬 Iniciar sesión</h2>
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
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
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
    maxWidth: '340px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
    fontSize: '1.5rem',
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
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
    marginTop: '1.5rem',
    color: '#333',
  },
  summary: {
    marginTop: '1rem',
    fontStyle: 'italic',
    color: '#555',
  },
};

export default Login;