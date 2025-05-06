import React, { useState } from 'react';
import { crearReserva } from '../api/apiRentacar';

const Reservas = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    dni: '',
    telefono: '',
    categoriacoche: '',
    fecharecogercoche: '',
    horarecogercoche: '',
    fechadevolvercoche: '',
    horadevolvercoche: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearReserva(form);
      alert('✅ Reserva creada correctamente');
      setForm({
        nombre: '',
        apellidos: '',
        email: '',
        dni: '',
        telefono: '',
        categoriacoche: '',
        fecharecogercoche: '',
        horarecogercoche: '',
        fechadevolvercoche: '',
        horadevolvercoche: ''
      });
    } catch (err) {
      console.error('❌ Error al crear la reserva', err);
      alert('❌ Error al crear la reserva');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 Crear Reserva</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', gap: '1rem' }}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="text" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} required />
        <input type="number" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input type="text" name="categoriacoche" placeholder="Categoría del coche" value={form.categoriacoche} onChange={handleChange} required />
        
        <label>📅 Fecha y hora de recogida:</label>
        <input type="date" name="fecharecogercoche" value={form.fecharecogercoche} onChange={handleChange} required />
        <input type="time" name="horarecogercoche" value={form.horarecogercoche} onChange={handleChange} required />
        
        <label>📅 Fecha y hora de devolución:</label>
        <input type="date" name="fechadevolvercoche" value={form.fechadevolvercoche} onChange={handleChange} required />
        <input type="time" name="horadevolvercoche" value={form.horadevolvercoche} onChange={handleChange} required />

        <button type="submit" style={{ padding: '0.7rem', fontWeight: 'bold', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Reservar 🚗
        </button>
      </form>
    </div>
  );
};

export default Reservas;
