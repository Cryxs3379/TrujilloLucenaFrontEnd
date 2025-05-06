import React from 'react';
import styled from 'styled-components';

const ControlsWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    button {
      padding: 0.8rem 1.2rem;
      font-size: 1.2rem;
      background: #222;
      color: #fff;
      border: 1px solid #444;
      border-radius: 6px;
      min-width: 80px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const TouchControls = ({ movePlayer, playerRotate, dropPlayer, stage }) => (
  <ControlsWrapper>
    <button onClick={() => movePlayer(-1)} onTouchStart={() => movePlayer(-1)}>◀️</button>
    <button onClick={() => playerRotate(stage, 1)} onTouchStart={() => playerRotate(stage, 1)}>🔄</button>
    <button onClick={() => movePlayer(1)} onTouchStart={() => movePlayer(1)}>▶️</button>
    <button onClick={() => dropPlayer()}  onTouchStart={() => dropPlayer()}>⬇️</button>
  </ControlsWrapper>
);

export default TouchControls;
