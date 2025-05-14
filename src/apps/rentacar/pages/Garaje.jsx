// src/apps/rentacar/pages/Garaje.jsx
import React, { useEffect, useState } from 'react';
import { getClientes } from '../api/apiRentacar';

const Garaje = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();

        // Ordenar por fecha y hora de recogida
        const ordenados = [...data].sort((a, b) => {
          const dateTimeA = new Date(`${a.fecharecogercoche}T${a.horarecogercoche}`);
          const dateTimeB = new Date(`${b.fecharecogercoche}T${b.horarecogercoche}`);
          return dateTimeA - dateTimeB;
        });

        setClientes(ordenados);
      } catch (error) {
        console.error('❌ Error al cargar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">🚗 Garaje (ordenado por recogida)</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light text-center">
            <tr>
              <th>Teléfono</th>
              <th>Fecha Recogida</th>
              <th>Hora Recogida</th>
              <th>Fecha Devolución</th>
              <th>Hora Devolución</th>
              <th>ID Coche</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.telefono}</td>
                <td>{cliente.fecharecogercoche}</td>
                <td>{cliente.horarecogercoche}</td>
                <td>{cliente.fechadevolvercoche}</td>
                <td>{cliente.horadevolvercoche}</td>
                <td>{cliente.idcoche}</td>
                <td>{cliente.marcacoche}</td>
                <td>{cliente.modelocoche}</td>
                <td>{cliente.categoriacoche}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Garaje;
