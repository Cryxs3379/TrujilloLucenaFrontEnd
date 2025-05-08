import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  getEventos,
  crearEvento,
  eliminarEvento,
  actualizarEvento,
  getHistorial,
  crearHistorial,
} from '../api/apiCalendario';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const HomeCalendario = () => {
  const [eventos, setEventos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('userCalendario'));

  useEffect(() => {
    cargarEventos();
    cargarHistorial();
  }, []);

  const cargarEventos = async () => {
    try {
      const data = await getEventos();
      setEventos(data.map(evento => ({
        id: evento._id,
        title: evento.title,
        start: evento.start,
        end: evento.end,
        description: evento.description,
      })));
    } catch (error) {
      console.error('❌ Error al cargar eventos:', error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const data = await getHistorial();
      setHistorial(data);
    } catch (error) {
      console.error('❌ Error al cargar historial:', error);
    }
  };

  const registrarHistorial = async (accion, eventoTitulo) => {
    if (!usuario) return;
    try {
      await crearHistorial({
        usuarioId: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        accion,
        eventoTitulo,
      });
      cargarHistorial();
    } catch (err) {
      console.error('❌ Error al registrar historial:', err);
    }
  };

  const handleDateClick = async (info) => {
    const { value: formValues } = await MySwal.fire({
      title: 'Crear nueva nota 📋',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Descripción"></textarea>
        <input type="datetime-local" id="swal-start" class="swal2-input" value="${info.dateStr}T00:00">
        <input type="datetime-local" id="swal-end" class="swal2-input" value="${info.dateStr}T01:00">
      `,
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.maxWidth = '600px';
          popup.style.width = '90vw';
          popup.style.overflowX = 'hidden';
        }
      },
      preConfirm: () => {
        const title = document.getElementById('swal-title').value;
        const description = document.getElementById('swal-description').value;
        const start = document.getElementById('swal-start').value;
        const end = document.getElementById('swal-end').value;
        if (!title || !start || !end) {
          Swal.showValidationMessage('Título y fechas son obligatorios');
        }
        return { title, description, start, end };
      },
    });

    if (formValues) {
      try {
        await crearEvento(formValues);
        cargarEventos();
        registrarHistorial('creó el evento', formValues.title);
      } catch (err) {
        console.error('❌ Error al crear evento:', err);
      }
    }
  };

  const handleEventClick = async (info) => {
    const { value: action } = await MySwal.fire({
      title: `Opciones para "${info.event.title}"`,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: '✏️ Editar',
      denyButtonText: '👁️ Ver detalle',
      cancelButtonText: '🗑️ Eliminar',
      reverseButtons: true,
    });

    if (action === true) {
      editarEvento(info);
    } else if (action === false) {
      verDetalle(info);
    } else {
      eliminarEventoClick(info);
    }
  };

  const eliminarEventoClick = async (info) => {
    const result = await Swal.fire({
      title: `¿Eliminar "${info.event.title}"?`,
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await eliminarEvento(info.event.id);
        cargarEventos();
        registrarHistorial('eliminó el evento', info.event.title);
        Swal.fire('Eliminado', 'Tu nota ha sido eliminada', 'success');
      } catch (err) {
        console.error('❌ Error al eliminar evento:', err);
      }
    }
  };

  const editarEvento = async (info) => {
    const { value: formValues } = await MySwal.fire({
      title: 'Editar nota 📋',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título" value="${info.event.title}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Descripción">${info.event.extendedProps.description}</textarea>
        <input type="datetime-local" id="swal-start" class="swal2-input" value="${formatDateInput(info.event.start)}">
        <input type="datetime-local" id="swal-end" class="swal2-input" value="${formatDateInput(info.event.end)}">
      `,
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.maxWidth = '600px';
          popup.style.width = '90vw';
          popup.style.overflowX = 'hidden';
        }
      },
      preConfirm: () => {
        const title = document.getElementById('swal-title').value;
        const description = document.getElementById('swal-description').value;
        const start = document.getElementById('swal-start').value;
        const end = document.getElementById('swal-end').value;
        if (!title || !start || !end) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }
        return { title, description, start, end };
      },
    });

    if (formValues) {
      try {
        await actualizarEvento(info.event.id, formValues);
        cargarEventos();
        registrarHistorial('modificó el evento', formValues.title);
        Swal.fire('¡Actualizado!', 'La nota ha sido modificada', 'success');
      } catch (err) {
        console.error('❌ Error al actualizar evento:', err);
      }
    }
  };

  const verDetalle = async (info) => {
    await Swal.fire({
      title: info.event.title,
      html: `
        <p><strong>Descripción:</strong> ${info.event.extendedProps.description || 'Sin descripción'}</p>
        <p><strong>Inicio:</strong> ${formatDate(info.event.start)}</p>
        <p><strong>Fin:</strong> ${formatDate(info.event.end)}</p>
      `,
      padding: '2em',
      color: '#716add',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.maxWidth = '600px';
          popup.style.width = '90vw';
          popup.style.overflowX = 'hidden';
        }
      },
    });
  };

  const handleEventDrop = async (info) => {
    const eventoActualizado = {
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: info.event.start,
      end: info.event.end,
    };
    try {
      await actualizarEvento(info.event.id, eventoActualizado);
      cargarEventos();
      registrarHistorial('movió el evento', info.event.title);
    } catch (err) {
      console.error('❌ Error al mover evento:', err);
    }
  };

  const formatDateInput = (date) => new Date(date).toISOString().slice(0, 16);
  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="container py-4">
      {usuario && (
        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm mb-4">
          <span className="fw-semibold">
            Bienvenido {usuario.nombre} {usuario.apellido} 👋🏻
          </span>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              localStorage.removeItem('userCalendario');
              window.location.href = '/logincalendario';
            }}
          >
            🔒 Cerrar sesión
          </button>
        </div>
      )}

      <h2 className="mb-3">📅 Calendario de Eventos</h2>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={eventos}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        eventDrop={handleEventDrop}
      />

      <h3 className="mt-5">🕑 Historial de Acciones</h3>
      <div className="bg-white rounded p-3 mt-3 shadow-sm" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {historial.length === 0 ? (
          <p className="text-muted">❌ No hay acciones registradas todavía.</p>
        ) : (
          historial.map(h => (
            <div key={h._id} className="border-bottom pb-2 mb-2">
              <p><strong>{h.nombre} {h.apellido}</strong> {h.accion} ➔ <em>{h.eventoTitulo}</em></p>
              <p className="text-muted small">{new Date(h.fecha).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeCalendario;
