import React from 'react';
import styled from 'styled-components';
import NextPiece from './NextPiece';

const PanelWrapper = styled.div`
  width: clamp(140px, 32vw, 220px);
  padding: 1.25rem;
  background: linear-gradient(145deg,#1f1f1f,#2d2d2d);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,.4);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  order: 1;
  flex: 0 1 140px;   /* puede encoger pero no crecer */
  min-width: 0;      /* necesario para que flex calcule bien */

  @media (max-width: 768px) {
    width: 100px;        /* coincide con la fórmula (100px + gap + bordes) */
    flex: 0 1 100px;
    padding: 0.8rem;
    gap: 0.5rem;
    font-size: 0.75rem;
    align-items: center;
  }
`;

const Button = styled.button`
  margin: 0.3rem 0.2rem;
  padding: 0.4rem 0.6rem;
  background: linear-gradient(90deg,#333,#555);
  color: #fff;
  border: 1px solid #666;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background .3s, transform .2s;

  &:hover    { background: linear-gradient(90deg,#444,#666); transform: scale(1.03);}
  &:disabled { opacity:.5; cursor:not-allowed;}
`;

const ScorePanel = ({
  gameStarted, gameOver, paused,
  score, lines, level,
  nextTetromino,
  handleStart, setPaused,
}) => (
  <PanelWrapper>
    {!gameStarted ? (
      <Button onClick={handleStart}>▶️</Button>
    ) : (
      <>
        <NextPiece tetromino={nextTetromino} />

        <p>🎯 <strong>S:</strong> {score}</p>
        <p>📈 <strong>L:</strong> {lines}</p>
        <p>⚡ <strong>Lv:</strong> {level}</p>

        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
          <Button onClick={handleStart}>🔄</Button>
          <Button onClick={() => setPaused(p=>!p)} disabled={gameOver}>
            {paused ? '▶️' : '⏸️'}
          </Button>
        </div>
      </>
    )}
  </PanelWrapper>
);

export default ScorePanel;
