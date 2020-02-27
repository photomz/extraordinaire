/* eslint-disable import/prefer-default-export */
import actions from '../constants/actions.json';
import { SearchState } from '../reducers/types';

// interface Action {
//   type: string;
//   payload: Record<string, string | boolean>;
// }

export const setSearch = (payload: SearchState) => ({
  type: actions.setSearch,
  payload
});

export const changeSearchOption = (
  payload: Record<string, string | boolean>
) => ({
  types: actions.changeOption,
  payload
});
