import React from 'react';
import { useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { useActions } from '../utils';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
} from '../actions/counter';
import counterStateType from '../reducers/types';

const StatefulCounter = () => {
  const counter = useSelector(state => state.counter);
  const [
    incrementAction,
    decrementAction,
    incrementIfOddAction,
    incrementAsyncAction
  ] = useActions([increment, decrement, incrementIfOdd, incrementAsync]);
  return (
    <Counter
      increment={incrementAction}
      decrement={decrementAction}
      incrementIfOdd={incrementIfOddAction}
      incrementAsync={incrementAsyncAction}
      counter={counter}
    />
  );
};

export default StatefulCounter;
