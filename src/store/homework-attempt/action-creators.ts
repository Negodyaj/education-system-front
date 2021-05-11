import { Attempt } from '../../interfaces/Attempt';
import { ATTEMPTS_LOADING_SUCCESS } from '../actionTypes';

export type HomeworkAttemptActions = ReturnType<
  typeof attemptListLoadingSuccess
>;

export const attemptListLoadingSuccess = (attempts: Attempt[]) =>
  ({
    type: ATTEMPTS_LOADING_SUCCESS,
    payload: attempts,
  } as const);
