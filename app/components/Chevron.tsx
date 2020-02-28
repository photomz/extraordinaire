import React, { useState } from 'react';
import styled from 'styled-components';
import $ from '../styles/global';

const Wrapper = styled.div`
  height: 100%;
  width: ${({ size }) => size}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChevronSVG = styled.svg`
  cursor: pointer;
  width: 100%;
  height: ${({ size }) => size}px;
  margin-right: ${$.layout.margin5}px;
  fill: ${$.color.gray2};
  transform: rotate(${({ counter }) => 180 * counter}deg);
  transition: transform 0.5s ${$.easingFn.standard};
`;

interface Props {
  handler: () => void;
  size: number;
}

const Chevron = ({ handler = () => {}, size = 25 }: Props) => {
  const [counter, setCounter] = useState(0);
  return (
    <Wrapper size={size}>
      <ChevronSVG
        size={size}
        viewBox="0 0 9 5.56"
        counter={counter}
        onClick={e => {
          setCounter(prev => prev + 1);
          handler(e);
        }}
      >
        <path d="M7.94,0,4.5,3.44,1.06,0,0,1.06l4.5,4.5L9,1.06Z" />
      </ChevronSVG>
    </Wrapper>
  );
};

export default Chevron;
