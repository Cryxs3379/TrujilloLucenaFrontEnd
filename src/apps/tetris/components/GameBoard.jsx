import React, { useEffect, useRef } from 'react';
import Stage from './Stage';
import { checkCollision } from '../utils/checkCollision';

const GameBoard = ({
  player,
  level,               // se sigue recibiendo pero no lo usamos ya
  setGameOver,
  updatePlayerPos,
  stage,
  dropTime,            // ← ritmo de caída: será nuestro lock‑delay
  gameStarted,
  paused,
  setDropTime,
  playerRef,
  lockStartRef,
}) => {
  /* tablero siempre fresco */
  const stageRef = useRef(stage);
  useEffect(() => { stageRef.current = stage; }, [stage]);

  /* lock‑delay = dropTime (mínimo 100 ms por seguridad) */
  const getLockDelay = () => Math.max(100, dropTime);

  const drop = () => {
    const current      = playerRef.current;
    const currentStage = stageRef.current;
    const LOCK_MS      = getLockDelay();

    if (!checkCollision(current, currentStage, { x: 0, y: 1 })) {
      /* la pieza baja normalmente → se reinician contadores */
      updatePlayerPos({ x: 0, y: 1, collided: false });
      lockStartRef.current = null;        // deja de estar apoyada
    } else {
      /* la pieza está apoyada */
      if (lockStartRef.current === null) {
        lockStartRef.current = Date.now();  // empezamos a contar
        return;
      }

      if (Date.now() - lockStartRef.current < LOCK_MS) return;

      /* fin del margen → fijar pieza */
      if (current.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      lockStartRef.current = null;        // comenzará la siguiente pieza
    }
  };

  /* caída automática */
  useEffect(() => {
    if (!paused && dropTime && gameStarted) {
      const id = setInterval(drop, dropTime);
      return () => clearInterval(id);
    }
  }, [dropTime, paused, gameStarted]);

  return <Stage stage={stage} />;
};

export default GameBoard;
