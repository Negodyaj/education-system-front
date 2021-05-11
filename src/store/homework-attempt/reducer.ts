import { ATTEMPTS_LOADING_SUCCESS } from '../actionTypes';
import { IHomeworkAttemptState } from '../state';

import { HomeworkAttemptActions } from './action-creators';

const initialState: IHomeworkAttemptState = {
  attemptList: [],
};
export function homeworkAttemptReducer(
  state: IHomeworkAttemptState = initialState,
  action: HomeworkAttemptActions
): IHomeworkAttemptState {
  switch (action.type) {
    case ATTEMPTS_LOADING_SUCCESS:
      return { ...state, attemptList: action.payload };
    default:
      return state;
  }
}
