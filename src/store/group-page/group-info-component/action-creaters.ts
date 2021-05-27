import { Group } from '../../../interfaces/Group';
import {
  GET_GROUP,
  GROUP_TO_VIEW_WRETCH_FAIL,
  GROUP_TO_VIEW_WRETCH_LOADED,
  GROUP_TO_VIEW_WRETCH_LOADING,
} from '../../actionTypes';

export type GroupInfoComponentActions =
  | ReturnType<typeof setGroupToViewIsLoading>
  | ReturnType<typeof setGroupToViewWasLoaded>
  | ReturnType<typeof setGroupToViewFailed>
  | ReturnType<typeof getGroup>;

export const setGroupToViewIsLoading = () =>
  ({
    type: GROUP_TO_VIEW_WRETCH_LOADING,
    payload: undefined,
  } as const);
export const setGroupToViewWasLoaded = (group: Group) =>
  ({
    type: GROUP_TO_VIEW_WRETCH_LOADED,
    payload: group,
  } as const);
export const setGroupToViewFailed = (error: string) =>
  ({
    type: GROUP_TO_VIEW_WRETCH_FAIL,
    payload: error,
  } as const);
export const getGroup = (id: number) =>
  ({
    type: GET_GROUP,
    payload: id,
  } as const);
