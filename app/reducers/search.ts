import { SearchState } from './types';
import actions from '../constants/actions.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: SearchState = {
  keyword: 'Communism',
  year: '',
  paperType: 'qp',
  season: '',
  timezone: '',
  number: '',
  letter: '',
  isRegex: false,
  isTextSearch: true
};

export default (state: SearchState = initialState, { payload, type }) => {
  let newState = { ...state };
  switch (type) {
    case actions.setSearch:
      newState = {
        ...newState,
        ...payload
      };
      return newState;
    default:
      return state;
  }
};
