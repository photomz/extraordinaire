import { SearchState } from './types';
import actions from '../constants/actions.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: SearchState = {
  keyword: 'Stalin',
  year: '2019',
  paperType: 'qp',
  season: '',
  timezone: '',
  number: '',
  letter: '',
  isRegex: false,
  isTextSearch: true
};

export default (state: SearchState = initialState, { payload, type }) => {
  switch (type) {
    case actions.changeOption:
      return {
        ...state,
        ...payload
      };
    case actions.setSearch:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
