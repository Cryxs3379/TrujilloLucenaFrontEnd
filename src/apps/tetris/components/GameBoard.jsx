import React, { useEffect, useRef } from 'react';
import Stage from './Stage';
import { checkCollision } from '../utils/checkCollision';

const GameBoard = ({
  player,
  level,               // ← nuevo: nivel actual
  setGameOver,
  updatePlayerPos,
  stage,
  dropTime,
  gameStarted,
  paused,
  setDropTime,
  playerRef,
  lockStartRef,
}) => {
  /* ——— tablero siempre fresco ——— */
  const stageRef = useRef(stage);
  useEffect(() => { stageRef.current = stage; }, [stage]);

  /* ——— lock‑delay dinámico ——— */
  const getLockDelay = () => Math.max(100, 500 - level * 20);

  const drop = () => {
    const current       = playerRef.current;
    const currentStage  = stageRef.current;
    const LOCK_DELAY_MS = getLockDelay();

    if (!checkCollision(current, currentStage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
      lockStartRef.current = null;
    } else {
      if (lockStartRef.current === null) {
        lockStartRef.current = Date.now();
        return;
      }
      if (Date.now() - lockStartRef.current < LOCK_DELAY_MS) return;

      if (current.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      lockStartRef.current = null;
    }
  };

  /* ——— intervalo de caída automática ——— */
  useEffect(() => {
    if (!paused && dropTime && gameStarted) {
      const id = setInterval(drop, dropTime);
      return () => clearInterval(id);
    }
  }, [dropTime, paused, gameStarted]);

  return <Stage stage={stage} />;
};

export default GameBoard;
