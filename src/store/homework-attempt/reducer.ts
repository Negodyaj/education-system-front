import { Attempt } from '../../interfaces/Attempt';
import { AttemptInput } from '../../interfaces/AttemptInput';
import { AttemptPut } from '../../interfaces/AttemptPut';
import {
  ALL_ACTIVE_GROUPS,
  ATTEMPTS_LOADING_SUCCESS,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
  SET_CURRENT_HOMEWORK,
} from '../actionTypes';
import { IHomeworkAttemptState } from '../state';

import { HomeworkAttemptActions } from './action-creators';

export const DEFAULT_ATTEMPT: AttemptInput = {
  comment: '',
};

export const ATTEMPT_UPDATE: AttemptPut = {
  comment: '',
  authorId: 0,
  homeworkAttemptStatusId: 0,
};

const initialState: IHomeworkAttemptState = {
  attemptList: undefined,
  currentGroup: undefined,
  currentAttempt: undefined,
  currentAuthorId: -1,
  currentHomework: undefined,
  allGroupsInCollege: [],
  defaultAttempt: DEFAULT_ATTEMPT,
  attemptUpdate: ATTEMPT_UPDATE,
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
      console.log(action.payload);

      return {
        ...state,
        currentAttempt: action.payload,
        currentAuthorId: action.payload?.author.id || 0,
      };
    case SET_CURRENT_HOMEWORK:
      return { ...state, currentHomework: action.payload };
    case ALL_ACTIVE_GROUPS:
      return { ...state, allGroupsInCollege: action.payload };
    default:
      return state;
  }
}
