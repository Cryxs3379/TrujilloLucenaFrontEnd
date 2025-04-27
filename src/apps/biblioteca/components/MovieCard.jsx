import React from 'react';
import { useNavigate } from 'react-router-dom';
import { likePelicula, removeLike } from '../api/api';

const MovieCard = ({ pelicula }) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const likes = usuario?.peliculaslike || [];
  const yaLeGusta = likes.some(p => p._id === pelicula._id);

  const handleClickDetalle = () => {
    navigate(`/pelicula/${pelicula._id}`);
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation(); // ⛔ evita que dispare el click de navegación

    try {
      let updatedUser;
      if (yaLeGusta) {
        updatedUser = await removeLike(usuario._id, pelicula);
      } else {
        updatedUser = await likePelicula(usuario._id, pelicula);
      }

      localStorage.setItem('usuario', JSON.stringify(updatedUser));
      window.location.reload(); // hasta tener estado global
    } catch (err) {
      console.error('❌ Error al actualizar like:', err);
    }
  };

  return (
    <div
  onClick={handleClickDetalle}
  style={{
    border: '1px solid #eee',
    borderRadius: '10px',
    width: '220px',
    padding: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    background: 'white'
  }}
>
  <img src={pelicula.imagen} alt={pelicula.nombre} style={{
    width: '100%',
    borderRadius: '6px',
    marginBottom: '0.5rem'
  }} />
  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{pelicula.nombre}</h3>
  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}><em>Haz clic para ver más</em></p>
  <button
  type="button"      
  onClick={handleLikeToggle}
  style={{
    padding: '0.5rem 1rem',
    background: yaLeGusta ? '#dc3545' : '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer'
  }}
>
  {yaLeGusta ? '💔 Quitar de Me gusta' : '❤️ Me gusta'}
</button>

</div>

  );
};

export default MovieCard;
