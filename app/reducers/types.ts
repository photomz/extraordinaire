import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type InitialState = {
  counter: number;
};

export type GetState = () => InitialState;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<InitialState, Action<string>>;
