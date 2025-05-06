import React from 'react';
import styled from 'styled-components';
import NextPiece from './NextPiece';

const PanelWrapper = styled.div`
  min-width: 180px;
  padding: 1.5rem;
  background: linear-gradient(145deg, #1f1f1f, #2d2d2d);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const Button = styled.button`
  margin: 0.5rem 0.25rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg, #333, #555);
  color: white;
  border: 1px solid #666;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  &:hover {
    background: linear-gradient(90deg, #444, #666);
    transform: scale(1.03);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ScorePanel = ({
  gameStarted,
  gameOver,
  paused,
  score,
  lines,
  level,
  nextTetromino,
  handleStart,
  setPaused,
}) => {
  return (
    <PanelWrapper>
      {!gameStarted ? (
        <Button onClick={handleStart}>▶️ Iniciar</Button>
      ) : (
        <>
          <h2>Next Piece</h2>
          <NextPiece tetromino={nextTetromino} />

          <div>
            <h2>Score Panel</h2>
            <p>🎯 <strong>Score:</strong> <span style={{ color: '#00ffea' }}>{score}</span></p>
            <p>📈 <strong>Lines:</strong> <span style={{ color: '#5aff00' }}>{lines}</span></p>
            <p>⚡ <strong>Level:</strong> <span style={{ color: '#ffcc00' }}>{level}</span></p>
            {gameOver && <p style={{ color: 'red', fontWeight: 'bold' }}>💀 Game Over</p>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Button onClick={handleStart}>🔄 Reiniciar</Button>
            <Button onClick={() => setPaused(prev => !prev)} disabled={gameOver}>
              {paused ? '▶️ Reanudar' : '⏸️ Pausa'}
            </Button>
          </div>
        </>
      )}
    </PanelWrapper>
  );
};

export default ScorePanel;
