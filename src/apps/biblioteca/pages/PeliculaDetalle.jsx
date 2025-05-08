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

  if (!pelicula) return <p className="p-4">Cargando...</p>;

  return (
    <>
      {usuario && <NavbarBiblioteca />}
      <div className="container my-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none mb-3">
            ⬅️ Volver
          </button>

          <h2 className="mb-3">{pelicula.nombre}</h2>

          <div className="text-center">
            <img
              src={pelicula.imagen}
              alt={pelicula.nombre}
              className="img-fluid rounded mb-4"
              style={{ maxWidth: '300px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
          </div>

          <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
          <p><strong>Fecha de creación:</strong> {new Date(pelicula.fecha_creacion).toLocaleDateString()}</p>
          <p><strong>Ver legalmente:</strong> {pelicula.ver_legalmente?.join(', ')}</p>

          <pre className="bg-light p-3 rounded mt-4">
            <strong>Ver menos legalmente:</strong> {JSON.stringify(pelicula.ver_menos_legalmente, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default PeliculaDetalle;
