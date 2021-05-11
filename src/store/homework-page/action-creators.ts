import { Homework } from '../../interfaces/Homework';
import {
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';

export type HomeworkPageActions =
  | ReturnType<typeof deleteHomeworkRequest>
  | ReturnType<typeof loadHomeworkSuccess>
  | ReturnType<typeof openItemsSet>;

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
