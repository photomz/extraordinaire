import { GetState, Dispatch } from '../reducers/types';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// export function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }

const increment = () => ({
  type: INCREMENT_COUNTER
});

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }

const decrement = () => ({
  type: DECREMENT_COUNTER
});

// export function incrementIfOdd() {
//   return (dispatch: Dispatch, getState: GetState) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

const incrementIfOdd = () => (dispatch: Dispatch, state: GetState) => {
  const { counter } = state();
  if (counter % 2 === 0) return;

  dispatch(increment());
};

// export function incrementAsync(delay = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }

const incrementAsync = (delay = 1000) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
};
