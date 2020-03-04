/* eslint-disable import/prefer-default-export */
import { Action } from 'redux';
import actions from '../constants/actions.json';
import { SearchState } from '../reducers/types';

export const setSearch = (payload: SearchState): Action<string> => ({
  type: actions.setSearch,
  payload
});

export const changeSearchOption = (
  payload: Record<string, string | boolean>
): Action<string> => ({
  type: actions.changeOption,
  payload
});
