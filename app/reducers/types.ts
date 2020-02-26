import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type InitialState = {
  counter: number;
  search: SearchState;
};

export type GetState = () => InitialState;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<InitialState, Action<string>>;

export interface SearchState {
  keyword: string;
  year: string;
  paperType: string;
  season: string;
  timezone: string;
  number: string;
  letter: string;
  isRegex: boolean;
  isTextSearch: boolean;
}
