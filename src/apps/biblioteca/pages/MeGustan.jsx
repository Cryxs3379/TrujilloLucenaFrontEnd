import React from 'react';
import MovieCard from '../components/MovieCard';
import NavbarBiblioteca from '../layout/NavbarBiblioteca';

const MeGustan = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const likes = usuario?.peliculaslike || [];

  return (
    <div>
      {usuario && <NavbarBiblioteca />}
      <div className="container py-4">
        <h2 className="mb-4">🎬 Películas que me gustan</h2>
        {likes.length === 0 ? (
          <p>No has dado like a ninguna película todavía.</p>
        ) : (
          <div className="row g-4">
            {likes.map((pelicula, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pelicula._id || i}>
                <MovieCard pelicula={pelicula} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeGustan;
