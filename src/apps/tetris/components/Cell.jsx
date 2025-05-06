
// Cell.jsx
import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ color, type }) => `rgba(${color}, ${type === 0 ? 0.05 : 1})`};
  border: ${({ type }) => (type === 0 ? '1px solid #222' : '2px solid #000')};
  box-sizing: border-box;
  transition: all 0.2s ease;
`;

const Cell = ({ type, color }) => <StyledCell type={type} color={color} />;

export default React.memo(Cell);
