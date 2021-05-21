import {
  CURRENT_USER_LOGGED_IN,
  CURRENT_USER_LOGGED_OUT,
  INCREASE_LOADERS_COUNT,
  DECREASE_LOADERS_COUNT,
} from '../actionTypes';
import { IAppState } from '../state';

import { AppActions } from './action-creators';

const initialState: IAppState = {
  isLoggedIn: false,
  loadersCount: 0,
};

export function appReducer(
  state: IAppState = initialState,
  action: AppActions
) {
  switch (action.type) {
    case CURRENT_USER_LOGGED_OUT:
      return { ...state, isLoggedIn: false };
    case CURRENT_USER_LOGGED_IN:
      return { ...state, isLoggedIn: true };
    case INCREASE_LOADERS_COUNT:
      console.log('Loading...');

      return { ...state, loadersCount: state.loadersCount + 1 };
    case DECREASE_LOADERS_COUNT:
      console.log('Finished loading');

      return {
        ...state,
        loadersCount:
          state.loadersCount > 0 ? state.loadersCount - 1 : state.loadersCount,
      };
    default:
      return state;
  }
}
