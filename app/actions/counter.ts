import { GetState, Dispatch } from '../reducers/types';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// export function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }

export const increment = () => ({
  type: INCREMENT_COUNTER
});

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }

export const decrement = () => ({
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

export const incrementIfOdd = () => (dispatch: Dispatch, state: GetState) => {
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

export const incrementAsync = (delay = 1000) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};
