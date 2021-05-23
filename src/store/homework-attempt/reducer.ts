import {
  ALL_ACTIVE_GROUPS,
  ATTEMPTS_LOADING_SUCCESS,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
  SET_CURRENT_HOMEWORK,
} from '../actionTypes';
import { IHomeworkAttemptState } from '../state';

import { HomeworkAttemptActions } from './action-creators';

const initialState: IHomeworkAttemptState = {
  attemptList: undefined,
  currentGroup: undefined,
  currentAttempt: undefined,
  currentHomework: undefined,
  allGroupsInCollege: [],
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
    case SET_CURRENT_HOMEWORK:
      return { ...state, currentHomework: action.payload };
    case ALL_ACTIVE_GROUPS:
      return { ...state, allGroupsInCollege: action.payload };
    default:
      return state;
  }
}
