import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

const ActionButton = styled.button`
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  cursor: pointer;
  font-family: Arial, Helvetica, Helvetica Neue, sans-serif;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CounterLabel = styled.div`
  position: absolute;
  top: 30%;
  left: 45%;
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: -0.025em;
`;

const BackButton = styled.div`
  position: absolute;
  top: 0;
  left: 16px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  top: 500px;
  width: 480px;
  margin: 0 auto;
`;

type CounterProps = {
  increment: () => void;
  incrementIfOdd: () => void;
  incrementAsync: () => void;
  decrement: () => void;
  counter: number;
};

const Counter = ({
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
  counter
}: CounterProps) => (
  <>
    <BackButton data-tid="backButton">
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
    </BackButton>
    <CounterLabel data-tid="counter">{counter}</CounterLabel>
    <ButtonWrapper>
      <ActionButton onClick={increment} data-tclass="btn">
        <i className="fa fa-plus" />
      </ActionButton>
      <ActionButton onClick={decrement} data-tclass="btn">
        <i className="fa fa-minus" />
      </ActionButton>
      <ActionButton onClick={incrementIfOdd} data-tclass="btn">
        odd
      </ActionButton>
      <ActionButton onClick={() => incrementAsync()} data-tclass="btn">
        async
      </ActionButton>
    </ButtonWrapper>
  </>
);

export default Counter;
