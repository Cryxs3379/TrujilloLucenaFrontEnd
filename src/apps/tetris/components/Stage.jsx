// Stage.jsx
import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { TETROMINOS } from '../utils/tetrominos';

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 30px)`};
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 30px)`};
  background: #111;
  border: 2px solid #333;
`;

const Stage = ({ stage }) => (
  <StyledStage rows={stage.length} cols={stage[0].length}>
    {stage.map((row, y) =>
      row.map((cell, x) => {
        const cellType = cell[0];
        const color = TETROMINOS[cellType]?.color || '0, 0, 0';
        return <Cell key={`${y}-${x}`} type={cellType} color={color} />;
      })
    )}
  </StyledStage>
);

export default Stage;
