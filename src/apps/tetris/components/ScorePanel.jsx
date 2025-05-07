import React from 'react';
import styled from 'styled-components';
import NextPiece from './NextPiece';

const PanelWrapper = styled.div`
  width: clamp(140px, 32vw, 220px);        /* escritorio */
  padding: 1.5rem;
  background: linear-gradient(145deg,#1f1f1f,#2d2d2d);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  order: 1;                                /* junto al tablero */

  @media (max-width: 768px) {
    width: clamp(90px, 24vw, 120px);       /* 📱 extra‑estrecho */
    padding: 1rem;
    gap: 0.6rem;
    font-size: 0.8rem;
    align-items: center;
    text-align: center;
  }
`;

const Button = styled.button`
  margin: 0.4rem 0.25rem;
  padding: 0.45rem 0.7rem;
  background: linear-gradient(90deg,#333,#555);
  color: #fff;
  border: 1px solid #666;
  border-radius: 6px;
  font-size: 0.85rem;
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
      <Button onClick={handleStart}>▶️ Iniciar</Button>
    ) : (
      <>
        <h3 style={{ margin:0 }}>Next</h3>
        <NextPiece tetromino={nextTetromino} />

        <p>🎯 <strong>S:</strong> <span style={{color:'#00ffea'}}>{score}</span></p>
        <p>📈 <strong>L:</strong> <span style={{color:'#5aff00'}}>{lines}</span></p>
        <p>⚡ <strong>Lv:</strong> <span style={{color:'#ffcc00'}}>{level}</span></p>
        {gameOver && <p style={{color:'red',fontWeight:'bold'}}>💀</p>}

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
