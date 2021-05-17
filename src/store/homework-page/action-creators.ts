import { Homework } from '../../interfaces/Homework';
import {
  GET_HOMEWORKS,
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';

export type HomeworkPageActions =
  | ReturnType<typeof deleteHomeworkRequest>
  | ReturnType<typeof loadHomeworkSuccess>
  | ReturnType<typeof openItemsSet>
  | ReturnType<typeof getHomeworks>;

export const loadHomeworkSuccess = (
  homeworkList: Homework[],
  currentUserRoleId: number
) =>
  ({
    type: HOMEWORK_LOAD_SUCCESS,
    payload: {
      payload: homeworkList,
      currentUserRoleId,
    },
  } as const);
export const getHomeworks = (currentUserRoleId: number) =>
  ({
    type: GET_HOMEWORKS,
    payload: currentUserRoleId,
  } as const);
export const deleteHomeworkRequest = (homeworkId: number) =>
  ({
    type: HOMEWORK_DELETE_PENDING,
    payload: homeworkId,
  } as const);
export const openItemsSet = (itemsSetName: string) =>
  ({
    type: ITEMS_SET_OPEN,
    payload: itemsSetName,
  } as const);
