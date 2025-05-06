import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { createStage } from './utils/createStage';
import { checkCollision } from './utils/checkCollision';
import { usePlayer } from './kooks/usePlayer';
import { useStage } from './kooks/useStage';

import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import TouchControls from './components/TouchControls';

/* ——— estilos ——— */
const Wrapper = styled.div`
  background-image: url('/images/tetrisbackground.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  @media (max-width: 768px) { padding: 1rem; }
`;
const GameArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Tetris = () => {
  /* ——— estado general ——— */
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused]           = useState(false);
  const [gameOver, setGameOver]       = useState(false);

  /* ——— jugador ——— */
  const [
    player,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    nextTetromino,
  ] = usePlayer();

  const playerRef    = useRef(player);
  const lockStartRef = useRef(null);
  useEffect(() => { playerRef.current = player; }, [player]);

  /* ——— tablero / puntuación ——— */
  const [dropTime, setDropTime]        = useState(1000);
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore]  = useState(0);
  const [lines, setLines]  = useState(0);
  const [level, setLevel]  = useState(0);
  const linePoints = [0, 40, 100, 300, 1200];

  /* ——— helpers ——— */
  const getLockDelay = () => Math.max(100, 500 - level * 20);

  /* ——— movimiento lateral ——— */
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
      lockStartRef.current = null;
    }
  };

  /* ——— rotar ——— */
  const playerRotateWithReset = (stage, dir) => {
    playerRotate(stage, dir);
    lockStartRef.current = null;
  };

  /* ——— caída manual ——— */
  const drop = () => {
    const current = playerRef.current;

    if (!checkCollision(current, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
      lockStartRef.current = null;
    } else {
      if (lockStartRef.current === null) {
        lockStartRef.current = Date.now();
        return;
      }
      if (Date.now() - lockStartRef.current < getLockDelay()) return;

      if (current.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      lockStartRef.current = null;
    }
  };
  const dropPlayer = () => drop();

// dentro del useEffect que depende de rowsCleared
useEffect(() => {
  if (rowsCleared > 0) {
    const totalLines = lines + rowsCleared;
    const nextLevel  = Math.floor(totalLines / 10);
    if (nextLevel > level) {
      setLevel(nextLevel);
      setDropTime(Math.max(100, 1000 - nextLevel * 100));
    }
    /* 🔧 protegemos el índice; cualquier valor ≥4 cuenta como Tetris */
    const clearedIdx = Math.min(rowsCleared, linePoints.length - 1);
    setScore(prev => prev + linePoints[clearedIdx] * (level + 1));    // ✅ queda solo esta

    setLines(totalLines);
  }
}, [rowsCleared]);


  /* ——— teclado ——— */
  const handleKey = useCallback(({ keyCode }) => {
    if (!gameOver && gameStarted && !paused) {
      if (keyCode === 37) movePlayer(-1);                       // ←
      else if (keyCode === 39) movePlayer(1);                   // →
      else if (keyCode === 40) dropPlayer();                    // ↓
      else if (keyCode === 38) playerRotateWithReset(stage, 1); // ↑
    }
  }, [gameOver, gameStarted, paused, stage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* ——— iniciar / reiniciar ——— */
  const handleStart = () => {
    setGameStarted(true);
    setPaused(false);
    setGameOver(false);
    setDropTime(1000);
    setScore(0);
    setLines(0);
    setLevel(0);
    lockStartRef.current = null;
    resetPlayer();
    setStage(createStage());
  };

  /* ——— bloqueo scroll móvil ——— */
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  /* ——— render ——— */
  return (
    <Wrapper>
      <GameArea>
        {gameStarted && (
          <GameBoard
            player={player}
            level={level}                 /* ← se pasa el nivel actual */
            setGameOver={setGameOver}
            updatePlayerPos={updatePlayerPos}
            stage={stage}
            dropTime={dropTime}
            gameStarted={gameStarted}
            paused={paused}
            setDropTime={setDropTime}
            playerRef={playerRef}
            lockStartRef={lockStartRef}
          />
        )}

        <ScorePanel
          gameStarted={gameStarted}
          gameOver={gameOver}
          paused={paused}
          score={score}
          lines={lines}
          level={level}
          nextTetromino={nextTetromino}
          handleStart={handleStart}
          setPaused={setPaused}
        />
      </GameArea>

      {gameStarted && (
        <TouchControls
          movePlayer={movePlayer}
          playerRotate={playerRotateWithReset}
          dropPlayer={dropPlayer}
          stage={stage}
        />
      )}
    </Wrapper>
  );
};

export default Tetris;
