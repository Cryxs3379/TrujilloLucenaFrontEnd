// NextPiece.jsx
import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { TETROMINOS } from '../utils/tetrominos';

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 2rem;

  h3 {
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 30px)`};
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 30px)`};
`;

const NextPiece = ({ tetromino }) => {
  return (
    <Wrapper>
      <h3>Next</h3>
      <Grid rows={tetromino.shape.length} cols={tetromino.shape[0].length}>
        {tetromino.shape.map((row, y) =>
          row.map((cell, x) => {
            const type = cell || 0;
            const color = TETROMINOS[type]?.color || '0, 0, 0';
            return <Cell key={`${y}-${x}`} type={type} color={color} />;
          })
        )}
      </Grid>
    </Wrapper>
  );
};

export default NextPiece;
