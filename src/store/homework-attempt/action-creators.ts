import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';
import { Attempt } from '../../interfaces/Attempt';
import { AttemptInput } from '../../interfaces/AttemptInput';
import { AttemptPut } from '../../interfaces/AttemptPut';
import { Homework } from '../../interfaces/Homework';
import { INIT_HOMEWORK } from '../../shared/tmp-mock-data/hw/initHomewwork';
import {
  ALL_ACTIVE_GROUPS,
  ALL_ACTIVE_GROUPS_LOADING,
  ATTEMPTS_LOADING_SUCCESS,
  ATTEMPT_LIST_LOADING,
  LOAD_CURRENT_HOMEWORK,
  SEND_ATTEMPT,
  SET_CURRENT_ATTEMPT,
  SET_CURRENT_GROUP,
  SET_CURRENT_HOMEWORK,
  UPDATE_ATTEMPT,
} from '../actionTypes';

export type HomeworkAttemptActions =
  | ReturnType<typeof attemptListLoadingSuccess>
  | ReturnType<typeof setCurrentGroup>
  | ReturnType<typeof setCurrentAttempt>
  | ReturnType<typeof setCurrentHomework>
  | ReturnType<typeof setAllGroupsInCollege>
  | ReturnType<typeof sendAttempt>
  | ReturnType<typeof loadCurrentHomework>
  | ReturnType<typeof getAllActiveGroupsInCollege>
  | ReturnType<typeof getAttemptListToCheck>
  | ReturnType<typeof updateAttempt>;

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
export const sendAttempt = (attempt: AttemptInput) =>
  ({
    type: SEND_ATTEMPT,
    payload: attempt,
  } as const);
export const updateAttempt = (
  hwId: number,
  attempt: AttemptPut,
  attemptId: number
) => {
  console.log();

  return {
    type: UPDATE_ATTEMPT,
    payload: { hwId, attempt, attemptId },
  } as const;
};
export const loadCurrentHomework = (hwId: string) =>
  ({
    type: LOAD_CURRENT_HOMEWORK,
    payload: hwId,
  } as const);
export const getAllActiveGroupsInCollege = () =>
  ({
    type: ALL_ACTIVE_GROUPS_LOADING,
    payload: undefined,
  } as const);
export const getAttemptListToCheck = (hwId: string, attemptId: string = '0') =>
  ({
    type: ATTEMPT_LIST_LOADING,
    payload: {
      hwId,
      attemptId,
    },
  } as const);
