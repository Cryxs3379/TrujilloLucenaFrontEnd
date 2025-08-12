import React, { useEffect, useMemo, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  getEventos,
  crearEvento,
  eliminarEvento as apiEliminarEvento,
  actualizarEvento,
  getHistorial,
  crearHistorial,
} from '../api/apiCalendario';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const toDateTimeLocal = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  const off = dt.getTimezoneOffset();
  const local = new Date(dt.getTime() - off * 60000);
  return local.toISOString().slice(0, 16);
};
const toISO = (value) => new Date(value).toISOString();
const fmt = (d) => new Date(d).toLocaleString();

const HomeCalendario = () => {
  const [eventos, setEventos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const usuario = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('userCalendario')); }
    catch { return null; }
  }, []);

  // 🔐 regla: solo edita si role === 'editor'
  const canEdit = usuario?.role === 'editor';

  const cargarEventos = useCallback(async () => {
    try {
      setLoadingEventos(true);
      const data = await getEventos();
      setEventos(
        data.map((e) => ({
          id: e._id,
          title: e.title,
          start: e.start,
          end: e.end ?? e.start,
          description: e.description,
        }))
      );
    } catch (error) {
      console.error('❌ Error al cargar eventos:', error);
      Swal.fire('Error', 'No se pudieron cargar los eventos', 'error');
    } finally {
      setLoadingEventos(false);
    }
  }, []);

  const cargarHistorial = useCallback(async () => {
    try {
      setLoadingHistorial(true);
      const data = await getHistorial();
      setHistorial(
        [...data].sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        )
      );
    } catch (error) {
      console.error('❌ Error al cargar historial:', error);
    } finally {
      setLoadingHistorial(false);
    }
  }, []);

  useEffect(() => {
    cargarEventos();
    cargarHistorial();
  }, [cargarEventos, cargarHistorial]);

  const registrarHistorial = useCallback(
    async (accion, eventoTitulo) => {
      if (!usuario) return;
      try {
        await crearHistorial({
          usuarioId: usuario.id || usuario._id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          accion,
          eventoTitulo,
        });
        cargarHistorial();
      } catch (err) {
        console.error('❌ Error al registrar historial:', err);
      }
    },
    [usuario, cargarHistorial]
  );

  const handleDateClick = useCallback(async (info) => {
    const { value, isConfirmed } = await MySwal.fire({
      title: 'Crear nueva nota 📋',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Descripción"></textarea>
        <input type="datetime-local" id="swal-start" class="swal2-input" value="${info.dateStr}T09:00">
        <input type="datetime-local" id="swal-end" class="swal2-input" value="${info.dateStr}T10:00">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById('swal-title').value.trim();
        const description = document.getElementById('swal-description').value.trim();
        const start = document.getElementById('swal-start').value;
        const end = document.getElementById('swal-end').value;
        if (!title || !start || !end) {
          Swal.showValidationMessage('Título e intervalos son obligatorios');
          return;
        }
        if (new Date(start) > new Date(end)) {
          Swal.showValidationMessage('El inicio no puede ser mayor que el fin');
          return;
        }
        return { title, description, start: toISO(start), end: toISO(end) };
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed && value) {
      try {
        await crearEvento(value);
        await cargarEventos();
        registrarHistorial('creó el evento', value.title);
      } catch (err) {
        console.error('❌ Error al crear evento:', err);
        Swal.fire('Error', 'No se pudo crear el evento', 'error');
      }
    }
  }, [cargarEventos, registrarHistorial]);

  const handleEventClick = useCallback(async (info) => {
    if (!canEdit) {
      // 👁️ viewer: solo ver detalle
      return verDetalle(info);
    }

    // editor: menú completo
    const res = await MySwal.fire({
      title: `Opciones para "${info.event.title}"`,
      showCancelButton: true, // Eliminar
      showDenyButton: true,   // Ver detalle
      confirmButtonText: '✏️ Editar',
      denyButtonText: '👁️ Ver detalle',
      cancelButtonText: '🗑️ Eliminar',
      reverseButtons: true,
    });

    if (res.isConfirmed) {
      editarEvento(info);
    } else if (res.isDenied) {
      verDetalle(info);
    } else if (res.isDismissed) {
      eliminarEventoClick(info);
    }
  }, [canEdit]);

  const eliminarEventoClick = useCallback(async (info) => {
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
        await apiEliminarEvento(info.event.id);
        await cargarEventos();
        registrarHistorial('eliminó el evento', info.event.title);
        Swal.fire('Eliminado', 'Tu nota ha sido eliminada', 'success');
      } catch (err) {
        console.error('❌ Error al eliminar evento:', err);
        Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
      }
    }
  }, [cargarEventos, registrarHistorial]);

  const editarEvento = useCallback(async (info) => {
    const { value, isConfirmed } = await MySwal.fire({
      title: 'Editar nota 📋',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título" value="${info.event.title}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Descripción">${info.event.extendedProps.description || ''}</textarea>
        <input type="datetime-local" id="swal-start" class="swal2-input" value="${toDateTimeLocal(info.event.start)}">
        <input type="datetime-local" id="swal-end" class="swal2-input" value="${toDateTimeLocal(info.event.end || info.event.start)}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById('swal-title').value.trim();
        const description = document.getElementById('swal-description').value.trim();
        const start = document.getElementById('swal-start').value;
        const end = document.getElementById('swal-end').value;
        if (!title || !start || !end) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return;
        }
        if (new Date(start) > new Date(end)) {
          Swal.showValidationMessage('El inicio no puede ser mayor que el fin');
          return;
        }
        return { title, description, start: toISO(start), end: toISO(end) };
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed && value) {
      try {
        await actualizarEvento(info.event.id, value);
        await cargarEventos();
        registrarHistorial('modificó el evento', value.title);
        Swal.fire('¡Actualizado!', 'La nota ha sido modificada', 'success');
      } catch (err) {
        console.error('❌ Error al actualizar evento:', err);
        Swal.fire('Error', 'No se pudo actualizar el evento', 'error');
      }
    }
  }, [cargarEventos, registrarHistorial]);

  const verDetalle = async (info) => {
    await Swal.fire({
      title: info.event.title,
      html: `
        <p><strong>Descripción:</strong> ${info.event.extendedProps.description || 'Sin descripción'}</p>
        <p><strong>Inicio:</strong> ${fmt(info.event.start)}</p>
        <p><strong>Fin:</strong> ${fmt(info.event.end)}</p>
      `,
      padding: '2em',
      background: '#fff',
    });
  };

  const handleEventDrop = useCallback(async (info) => {
    const payload = {
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: info.event.start?.toISOString(),
      end: (info.event.end || info.event.start)?.toISOString(),
    };
    try {
      await actualizarEvento(info.event.id, payload);
      await cargarEventos();
      registrarHistorial('movió el evento', info.event.title);
    } catch (err) {
      console.error('❌ Error al mover evento:', err);
      Swal.fire('Error', 'No se pudo mover el evento', 'error');
      info.revert();
    }
  }, [cargarEventos, registrarHistorial]);

  const handleEventResize = useCallback(async (info) => {
    const payload = {
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: info.event.start?.toISOString(),
      end: info.event.end?.toISOString(),
    };
    try {
      await actualizarEvento(info.event.id, payload);
      await cargarEventos();
      registrarHistorial('redimensionó el evento', info.event.title);
    } catch (err) {
      console.error('❌ Error al redimensionar evento:', err);
      Swal.fire('Error', 'No se pudo actualizar la duración', 'error');
      info.revert();
    }
  }, [cargarEventos, registrarHistorial]);

  return (
    <div className="container py-4">
      {usuario && (
        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm mb-4">
          <span className="fw-semibold">
            Bienvenido {usuario.nombre} {usuario.apellido} 👋🏻
            <span className="ms-2 badge bg-secondary">
              Rol: {usuario.role}
            </span>
            {!canEdit && (
              <span className="ms-2 badge bg-warning text-dark">
                Solo lectura
              </span>
            )}
          </span>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              localStorage.removeItem('userCalendario');
              localStorage.removeItem('tokenCalendario');
              window.location.href = '/logincalendario';
            }}
          >
            🔒 Cerrar sesión
          </button>
        </div>
      )}

      <h2 className="mb-3">📅 Calendario de Eventos</h2>
      {loadingEventos && <p className="text-muted">Cargando eventos…</p>}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        events={eventos}
        // 🔒 permisos por rol
        editable={canEdit}
        dateClick={canEdit ? handleDateClick : undefined}
        eventClick={handleEventClick}
        eventDrop={canEdit ? handleEventDrop : undefined}
        eventResize={canEdit ? handleEventResize : undefined}
        nowIndicator={true}
        locale="es"
        firstDay={1}
      />

      <h3 className="mt-5">🕑 Historial de Acciones</h3>
      {loadingHistorial && <p className="text-muted">Cargando historial…</p>}
      <div className="bg-white rounded p-3 mt-3 shadow-sm" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {historial.length === 0 ? (
          <p className="text-muted">❌ No hay acciones registradas todavía.</p>
        ) : (
          historial.map((h) => (
            <div key={h._id} className="border-bottom pb-2 mb-2">
              <p>
                <strong>{h.nombre} {h.apellido}</strong> {h.accion} ➔ <em>{h.eventoTitulo}</em>
              </p>
              <p className="text-muted small">{h.fecha ? fmt(h.fecha) : ''}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeCalendario;
