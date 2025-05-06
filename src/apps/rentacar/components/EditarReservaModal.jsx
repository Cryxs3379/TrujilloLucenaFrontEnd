// EditarReservaModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const EditarReservaModal = ({ open, onClose, reserva, onConfirmar }) => {
  const [form, setForm] = useState({ ...reserva });

  useEffect(() => {
    setForm({ ...reserva });
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmar = () => {
    onConfirmar(form);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ /* estilos del modal */ }}>
        <h2>Editar Reserva</h2>
        <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth />
        <TextField label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
        <TextField label="DNI" name="dni" value={form.dni} onChange={handleChange} fullWidth />
        <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} fullWidth />
        <TextField label="Categoría Coche" name="categoriacoche" value={form.categoriacoche} onChange={handleChange} fullWidth />
        <TextField label="Fecha Recogida" name="fecharecogercoche" type="date" value={form.fecharecogercoche} onChange={handleChange} fullWidth />
        <TextField label="Hora Recogida" name="horarecogercoche" type="time" value={form.horarecogercoche} onChange={handleChange} fullWidth />
        <TextField label="Fecha Devolución" name="fechadevolvercoche" type="date" value={form.fechadevolvercoche} onChange={handleChange} fullWidth />
        <TextField label="Hora Devolución" name="horadevolvercoche" type="time" value={form.horadevolvercoche} onChange={handleChange} fullWidth />
        <Button variant="contained" color="primary" onClick={handleConfirmar}>
          Confirmar Cliente
        </Button>
      </Box>
    </Modal>
  );
};

export default EditarReservaModal;
