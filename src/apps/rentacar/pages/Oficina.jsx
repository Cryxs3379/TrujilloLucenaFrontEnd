// Oficina.jsx
import React, { useEffect, useState } from 'react';
import { getReservas, getClientes, confirmarCliente } from '../api/apiRentacar';
import EditarReservaModal from '../components/EditarReservaModal';

const Oficina = () => {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataReservas = await getReservas();
      const dataClientes = await getClientes();
      setReservas(dataReservas);
      setClientes(dataClientes);
    };
    fetchData();
  }, []);

  const handleEditar = (reserva) => {
    setReservaSeleccionada(reserva);
    setModalAbierto(true);
  };

  const handleConfirmarCliente = async (reservaActualizada) => {
    try {
      await confirmarCliente(reservaActualizada);
      setModalAbierto(false);
      // Actualizar las listas
      const dataReservas = await getReservas();
      const dataClientes = await getClientes();
      setReservas(dataReservas);
      setClientes(dataClientes);
    } catch (error) {
      console.error('Error al confirmar cliente:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Categoría Coche</th>
            <th>Fecha Recogida</th>
            <th>Hora Recogida</th>
            <th>Fecha Devolución</th>
            <th>Hora Devolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.nombre}</td>
              <td>{reserva.apellidos}</td>
              <td>{reserva.email}</td>
              <td>{reserva.dni}</td>
              <td>{reserva.telefono}</td>
              <td>{reserva.categoriacoche}</td>
              <td>{reserva.fecharecogercoche}</td>
              <td>{reserva.horarecogercoche}</td>
              <td>{reserva.fechadevolvercoche}</td>
              <td>{reserva.horadevolvercoche}</td>
              <td>
                <button onClick={() => handleEditar(reserva)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>👥 Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Categoría Coche</th>
            <th>Fecha Recogida</th>
            <th>Hora Recogida</th>
            <th>Fecha Devolución</th>
            <th>Hora Devolución</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.email}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.categoriacoche}</td>
              <td>{cliente.fecharecogercoche}</td>
              <td>{cliente.horarecogercoche}</td>
              <td>{cliente.fechadevolvercoche}</td>
              <td>{cliente.horadevolvercoche}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && (
        <EditarReservaModal
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          reserva={reservaSeleccionada}
          onConfirmar={handleConfirmarCliente}
        />
      )}
    </div>
  );
};

export default Oficina;
