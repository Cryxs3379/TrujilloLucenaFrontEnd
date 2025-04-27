import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPeliculas } from '../api/api';
import NavbarBiblioteca from '../layout/NavbarBiblioteca';

const PeliculaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const fetchData = async () => {
      const peliculas = await getPeliculas();
      const peli = peliculas.find(p => p._id === id);
      setPelicula(peli);
    };
    fetchData();
  }, [id]);

  if (!pelicula) return <p style={{ padding: '2rem' }}>Cargando...</p>;

  return (
    <>
      {usuario && <NavbarBiblioteca />}
      <div style={{
        padding: '2rem',
        width: '90vw',
        maxWidth: '1100px',
        margin: 'auto',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent',
          border: 'none',
          color: '#007bff',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>⬅️ Volver</button>

        <h2 style={{ marginBottom: '1rem' }}>{pelicula.nombre}</h2>

        <div style={{ textAlign: 'center' }}>
          <img
            src={pelicula.imagen}
            alt={pelicula.nombre}
            style={{
              width: '300px',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
        <p><strong>Fecha de creación:</strong> {new Date(pelicula.fecha_creacion).toLocaleDateString()}</p>
        <p><strong>Ver legalmente:</strong> {pelicula.ver_legalmente?.join(', ')}</p>

        <pre style={{
          background: '#f8f8f8',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <strong>Ver menos legalmente:</strong> {JSON.stringify(pelicula.ver_menos_legalmente, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default PeliculaDetalle;
