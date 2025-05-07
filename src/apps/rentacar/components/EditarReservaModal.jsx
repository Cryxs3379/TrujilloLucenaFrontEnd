import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    alert('✅ Cliente confirmado y movido a la lista de clientes');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Editar Reserva</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {[
            ['nombre', 'Nombre'],
            ['apellidos', 'Apellidos'],
            ['email', 'Email'],
            ['dni', 'DNI'],
            ['telefono', 'Teléfono'],
            ['categoriacoche', 'Categoría Coche'],
            ['fecharecogercoche', 'Fecha Recogida', 'date'],
            ['horarecogercoche', 'Hora Recogida', 'time'],
            ['fechadevolvercoche', 'Fecha Devolución', 'date'],
            ['horadevolvercoche', 'Hora Devolución', 'time'],
          ].map(([name, label, type = 'text']) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputLabelProps={type !== 'text' ? { shrink: true } : {}}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleConfirmar}
          sx={{ mt: 4 }}
        >
          Confirmar Cliente
        </Button>
      </Box>
    </Modal>
  );
};

export default EditarReservaModal;
