import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';
import { Attempt } from '../../interfaces/Attempt';
import { Homework } from '../../interfaces/Homework';
import { INIT_HOMEWORK } from '../../shared/tmp-mock-data/hw/initHomewwork';
import {
  ALL_ACTIVE_GROUPS,
  ATTEMPTS_LOADING_SUCCESS,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
  SET_CURRENT_HOMEWORK,
} from '../actionTypes';

export type HomeworkAttemptActions =
  | ReturnType<typeof attemptListLoadingSuccess>
  | ReturnType<typeof setCurrentGroup>
  | ReturnType<typeof setCurrentAttempt>
  | ReturnType<typeof setCurrentHomework>
  | ReturnType<typeof setAllGroupsInCollege>;

export const attemptListLoadingSuccess = (attempts: Attempt[]) =>
  ({
    type: ATTEMPTS_LOADING_SUCCESS,
    payload: attempts,
  } as const);

export const setCurrentGroup = (group: typeof INIT_HOMEWORK.groupsIds) =>
  ({
    type: SET_CURRENT_GROUP,
    payload: group,
  } as const);
export const setCurrentHomework = (currentHomework: Homework) =>
  ({
    type: SET_CURRENT_HOMEWORK,
    payload: currentHomework,
  } as const);
export const setCurrentAttempt = (currentAttempt: Attempt) =>
  ({
    type: SET_CURRENT_ATTEMPT,
    payload: currentAttempt,
  } as const);
export const setAllGroupsInCollege = (groups: AllGroupsInCollege[]) =>
  ({
    type: ALL_ACTIVE_GROUPS,
    payload: groups,
  } as const);
