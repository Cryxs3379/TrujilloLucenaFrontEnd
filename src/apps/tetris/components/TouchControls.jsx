import React from 'react';
import styled from 'styled-components';

const ControlsWrapper = styled.div`
  display: none;
  order: 2;                       /* debajo de tablero+panel */
  flex-basis: 100%;               /* ocupa línea completa al wrap */

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    button {
      padding: 1rem;
      font-size: 1.4rem;
      background: #222;
      color: #fff;
      border: 1px solid #444;
      border-radius: 6px;
      min-width: clamp(60px, 18vw, 90px);
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const TouchControls = ({ movePlayer, playerRotate, dropPlayer, stage }) => (
  <ControlsWrapper>
    <button onClick={() => movePlayer(-1)}   onTouchStart={() => movePlayer(-1)}>◀️</button>
    <button onClick={() => playerRotate(stage, 1)} onTouchStart={() => playerRotate(stage, 1)}>🔄</button>
    <button onClick={() => movePlayer(1)}    onTouchStart={() => movePlayer(1)}>▶️</button>
    <button onClick={() => dropPlayer()}     onTouchStart={() => dropPlayer()}>⬇️</button>
  </ControlsWrapper>
);

export default TouchControls;
