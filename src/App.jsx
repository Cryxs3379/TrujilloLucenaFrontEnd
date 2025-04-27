import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/Home';                         // NUEVO
import Biblioteca from './apps/biblioteca/pages/Biblioteca';
import MeGustan from './apps/biblioteca/pages/MeGustan';
import Login from './apps/biblioteca/pages/Login';
import PeliculaDetalle from './apps/biblioteca/pages/PeliculaDetalle';
import NavbarGlobal from './layout/NavbarGlobal';       // Nuevo navbar siempre visible
import RutaPrivada from './apps/biblioteca/components/RutaPrivada';
import { Navigate } from 'react-router-dom';
import LoginCalendario from './apps/calendario/pages/LoginCalendario';
import HomeCalendario from './apps/calendario/pages/HomeCalendario';
import './App.css'; // 🎯 Importar CSS global

<Routes>
  ...
  <Route path="/logincalendario" element={<LoginCalendario />} />
  <Route path="/homecalendario" element={<HomeCalendario />} />
</Routes>


function AppWrapper() {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(user);

    const actualizarUsuario = () => {
      const newUser = JSON.parse(localStorage.getItem('usuario'));
      setUsuario(newUser);
    };

    window.addEventListener('storage', actualizarUsuario);
    return () => window.removeEventListener('storage', actualizarUsuario);
  }, []);

  return (
    <BrowserRouter>
      <NavbarGlobal usuario={usuario} onLogout={() => setUsuario(null)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logincalendario" element={<LoginCalendario />} />
        <Route path="/Homecalendario" element={<HomeCalendario />} />
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
        <Route path="/biblioteca" element={
          <RutaPrivada usuario={usuario}>
            <Biblioteca />
          </RutaPrivada>
        } />
        <Route path="/megustan" element={
          <RutaPrivada usuario={usuario}>
            <MeGustan />
          </RutaPrivada>
        } />
        <Route path="/pelicula/:id" element={
          <RutaPrivada usuario={usuario}>
            <PeliculaDetalle />
          </RutaPrivada>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
