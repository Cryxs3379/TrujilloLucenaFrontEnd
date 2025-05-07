// src/apps/calendario/api/apiCalendario.js
import axios from 'axios';

// URLS Base
 //const API_LOGIN = 'http://localhost:10000/api/logincalendario';
 //const API_EVENTOS = 'http://localhost:10000/api/calendario'; // 👈 NUEVA para eventos
 //const API_HISTORIAL = 'http://localhost:10000/api/historial'; // ✅ AÑADIR ESTA LÍNEA
const API_LOGIN = 'https://trujillolucenabackend.onrender.com/api/logincalendario';
const API_EVENTOS = 'https://trujillolucenabackend.onrender.com/api/calendario';
const API_HISTORIAL = 'https://trujillolucenabackend.onrender.com/api/historial';

// 🔐 Login para Calendario
export const loginCalendario = async (email, password) => {
  const res = await axios.post(API_LOGIN, { email, password });
  return res.data;
};

// 📅 Obtener todos los eventos
export const getEventos = async () => {
  const res = await axios.get(API_EVENTOS);
  return res.data;
};

// 📅 Crear un evento nuevo
export const crearEvento = async (evento) => {
  const res = await axios.post(API_EVENTOS, evento);
  return res.data;
};

// 📅 Actualizar un evento existente
export const actualizarEvento = async (id, eventoActualizado) => {
  const res = await axios.put(`${API_EVENTOS}/${id}`, eventoActualizado);
  return res.data;
};

// 📅 Eliminar un evento
export const eliminarEvento = async (id) => {
  const res = await axios.delete(`${API_EVENTOS}/${id}`);
  return res.data;
};
// 🆕 historial
export const getHistorial = async () => {
  const res = await axios.get(API_HISTORIAL); // 🛑 Aquí falla porque no existe aún API_HISTORIAL
  return res.data;
};

export const crearHistorial = async (accion) => {
  const res = await axios.post(API_HISTORIAL, accion);
  return res.data;
};