/* eslint-disable import/prefer-default-export */
import { Action } from 'redux';
import { push } from 'connected-react-router';
import routes from '../constants/routes.json';
import { Dispatch } from '../reducers/types';
import actions from '../constants/actions.json';

export const incrementSearchCounter = (): Action<string> => ({
  types: actions.fireSearch
});

export const fireSearch = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch(incrementSearchCounter());
  const { router } = getState();

  if (router.location.pathname !== routes.RESULT) {
    dispatch(push(routes.RESULT));
  }
};
