import React, { useEffect, useState } from 'react';
import { getPeliculas } from '../api/api';
import MovieCard from '../components/MovieCard';
import NavbarBiblioteca from '../layout/NavbarBiblioteca';


const Biblioteca = () => {
  const [peliculas, setPeliculas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  useEffect(() => {
    const fetchPeliculas = async () => {
      const data = await getPeliculas();
      setPeliculas(data);
    };
    fetchPeliculas();
  }, []);

  return (
    <div>
      {usuario && <NavbarBiblioteca />} {/* navbar local visible solo logueado */}
    <div style={{ padding: '2rem' }}>
        <h2>Biblioteca de Películas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {peliculas.map(p => <MovieCard key={p._id} pelicula={p} />)}
      </div>
    </div>
    </div>
  );
};

export default Biblioteca;
