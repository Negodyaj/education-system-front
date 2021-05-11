import { Attempt } from '../../interfaces/Attempt';
import { INIT_HOMEWORK } from '../../shared/tmp-mock-data/hw/initHomewwork';
import {
  ATTEMPTS_LOADING_SUCCESS,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
} from '../actionTypes';

export type HomeworkAttemptActions =
  | ReturnType<typeof attemptListLoadingSuccess>
  | ReturnType<typeof setCurrentGroup>
  | ReturnType<typeof setCurrentAttempt>;

export const attemptListLoadingSuccess = (attempts: Attempt[]) =>
  ({
    type: ATTEMPTS_LOADING_SUCCESS,
    payload: attempts,
  } as const);

export const setCurrentGroup = (group: typeof INIT_HOMEWORK.group) =>
  ({
    type: SET_CURRENT_GROUP,
    payload: group,
  } as const);
export const setCurrentAttempt = (currentAttempt: Attempt) =>
  ({
    type: SET_CURRENT_ATTEMPT,
    payload: currentAttempt,
  } as const);
