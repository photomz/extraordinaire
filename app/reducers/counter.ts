import { Action } from 'redux';
import actions from '../constants/actions.json';

const initialState = 0;

export default function counter(
  state: number = initialState,
  action: Action<string>
) {
  const { type } = action;
  switch (type) {
    case actions.fireSearch:
      return state + 1;
    default:
      return state;
  }
}
