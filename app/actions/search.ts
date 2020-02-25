/* eslint-disable import/prefer-default-export */
import actions from '../constants/actions.json';

export const setSearch = payload => ({
  type: actions.setSearch,
  payload
});
