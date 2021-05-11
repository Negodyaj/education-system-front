import {
  ATTEMPTS_LOADING_SUCCESS,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
} from '../actionTypes';
import { IHomeworkAttemptState } from '../state';

import { HomeworkAttemptActions } from './action-creators';

const initialState: IHomeworkAttemptState = {
  attemptList: [],
  currentGroup: undefined,
  currentAttempt: undefined,
};
export function homeworkAttemptReducer(
  state: IHomeworkAttemptState = initialState,
  action: HomeworkAttemptActions
): IHomeworkAttemptState {
  switch (action.type) {
    case ATTEMPTS_LOADING_SUCCESS:
      return { ...state, attemptList: action.payload };
    case SET_CURRENT_GROUP:
      return { ...state, currentGroup: action.payload };
    case SET_CURRENT_ATTEMPT:
      return { ...state, currentAttempt: action.payload };
    default:
      return state;
  }
}
