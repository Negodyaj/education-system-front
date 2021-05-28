import { User } from '../../interfaces/User';
import { UserInput } from '../../interfaces/UserInput';
import {
  SEND_USER,
  USER_IS_SENDING,
  USER_SENDING_FAIL,
  USER_TO_EDIT_FAIL,
  USER_TO_EDIT_ID_FOR_USER_PAGE,
  USER_TO_EDIT_LOADED,
  USER_TO_EDIT_LOADING,
  USER_TO_EDIT_LOADING_WATCHER,
  SEND_USER_TO_EDIT,
} from '../actionTypes';

export type UserPageActions =
  | ReturnType<typeof setUserForUserPageId>
  | ReturnType<typeof getUserToEdit>
  | ReturnType<typeof setUserToEditIsLoading>
  | ReturnType<typeof setUserToEditWasLoaded>
  | ReturnType<typeof setUserToEditFail>
  | ReturnType<typeof setUserIsSending>
  | ReturnType<typeof setUserSendingFail>
  | ReturnType<typeof sendUser>
  | ReturnType<typeof sendUserToEdit>;

export const setUserForUserPageId = (userId: number) =>
  ({
    type: USER_TO_EDIT_ID_FOR_USER_PAGE,
    payload: userId,
  } as const);
export const getUserToEdit = (userToEditId?: string) =>
  ({
    type: USER_TO_EDIT_LOADING_WATCHER,
    payload: userToEditId,
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
export const setUserSendingFail = () =>
  ({
    type: USER_SENDING_FAIL,
    payload: undefined,
  } as const);
export const sendUser = (user: UserInput, userId: number, history: any) =>
  ({
    type: SEND_USER,
    payload: { user, userId, history },
  } as const);

export const sendUserToEdit = (user: UserInput, userId: number, history: any) =>
  ({
    type: SEND_USER_TO_EDIT,
    payload: { user, userId, history },
  } as const);
