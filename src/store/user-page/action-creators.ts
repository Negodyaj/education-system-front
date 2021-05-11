import { User } from '../../interfaces/User';
import {
  USER_IS_SENDING,
  USER_SENDING_FAIL,
  USER_SENDING_SUCCESS,
  USER_TO_EDIT_FAIL,
  USER_TO_EDIT_ID_FOR_USER_PAGE,
  USER_TO_EDIT_LOADED,
  USER_TO_EDIT_LOADING,
} from '../actionTypes';

export type UserPageActions =
  | ReturnType<typeof setUserForUserPageId>
  | ReturnType<typeof setUserToEditIsLoading>
  | ReturnType<typeof setUserToEditWasLoaded>
  | ReturnType<typeof setUserToEditFail>
  | ReturnType<typeof setUserIsSending>
  | ReturnType<typeof setUserUpdateResponse>
  | ReturnType<typeof setUserSendingFail>;

export const setUserForUserPageId = (userId: number) =>
  ({
    type: USER_TO_EDIT_ID_FOR_USER_PAGE,
    payload: userId,
  } as const);
export const setUserToEditIsLoading = () =>
  ({
    type: USER_TO_EDIT_LOADING,
    payload: undefined,
  } as const);
export const setUserToEditWasLoaded = (user?: User) =>
  ({
    type: USER_TO_EDIT_LOADED,
    payload: user || undefined,
  } as const);
export const setUserToEditFail = (error: string) =>
  ({
    type: USER_TO_EDIT_FAIL,
    payload: error,
  } as const);
export const setUserIsSending = () =>
  ({
    type: USER_IS_SENDING,
    payload: undefined,
  } as const);
export const setUserUpdateResponse = () =>
  ({
    type: USER_SENDING_SUCCESS,
    payload: undefined,
  } as const);
export const setUserSendingFail = () =>
  ({
    type: USER_SENDING_FAIL,
    payload: undefined,
  } as const);
