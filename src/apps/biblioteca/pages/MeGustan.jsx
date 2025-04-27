import React from 'react';
import MovieCard from '../components/MovieCard';
import NavbarBiblioteca from '../layout/NavbarBiblioteca';

const MeGustan = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const likes = usuario?.peliculaslike || [];

  return (
    <div>
      {usuario && <NavbarBiblioteca />} {/* navbar local visible solo logueado */}
    <div style={{ padding: '2rem' }}>
      <h2>🎬 Películas que me gustan</h2>
      {likes.length === 0 ? (
        <p>No has dado like a ninguna película todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {likes.map((pelicula, i) => (
            <MovieCard key={pelicula._id || i} pelicula={pelicula} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MeGustan;
