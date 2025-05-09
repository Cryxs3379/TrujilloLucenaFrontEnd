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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 px-3">
        {/* 📘 Lado Izquierdo: Documentación */}
        <div className="col-md-6 mb-4 mb-md-0 bg-white rounded p-4 shadow">
          <h3 className="text-primary mb-3">🧠 Pila tecnológica</h3>
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Capa</th>
                <th>Tecnología</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Front-end</td><td>React 18 + FullCalendar + SweetAlert2</td><td>Interfaz interactiva del calendario y diálogos modales</td></tr>
              <tr><td>API</td><td>Node.js · Express</td><td>Endpoints REST para login, eventos y registro de acciones</td></tr>
              <tr><td>Base de datos</td><td>MongoDB + Mongoose</td><td>Persiste usuarios, eventos y colección de historial</td></tr>
              <tr><td>Sesión</td><td>JWT + localStorage</td><td>Autenticación simple en el navegador</td></tr>
            </tbody>
          </table>

          <h4 className="mt-4 text-primary">🔄 Flujo de usuario</h4>
          <ul>
            <li><strong>Login:</strong> POST /api/logincalendario → guarda <code>token</code> y <code>user</code> en localStorage → navega a <code>/homecalendario</code>.</li>
            <li><strong>Inicio:</strong> GET /api/calendario y /api/historial para mostrar calendario y historial.</li>
            <li><strong>Crear evento:</strong> SweetAlert2 recoge datos → POST /api/calendario → actualiza vista e historial.</li>
            <li><strong>Editar/mover/eliminar:</strong> PUT o DELETE según la acción → se refresca y registra en /api/historial.</li>
            <li><strong>Historial en vivo:</strong> Se muestra debajo del calendario, scrollable y actualizado en cada acción.</li>
          </ul>
        </div>

        {/* 🔐 Lado Derecho: Login */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center gap-4">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '340px' }}>
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

          {/* Usuarios de prueba */}
          <div className="bg-white p-3 rounded shadow-sm text-center" style={{ maxWidth: '340px', fontSize: '0.9rem' }}>
            <h6 className="text-secondary mb-2">🧪 Usuarios de prueba</h6>
            <div><strong>prueba1@gmail.com</strong> · <em>123456</em></div>
            <div><strong>prueba2@gmail.com</strong> · <em>123456</em></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCalendario;
