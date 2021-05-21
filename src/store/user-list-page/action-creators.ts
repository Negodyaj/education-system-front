import { User } from '../../interfaces/User';
import { UserDelete } from '../../interfaces/UserDelete';
import {
  DELETE_USER,
  GET_USERS,
  USER_DELETING,
  USER_DELETING_FAIL,
  USER_DELETING_SUCCESS,
  USER_LIST_LOADING_AWAIT,
  USER_LIST_LOADING_FAIL,
  USER_LIST_LOADING_SUCCESS,
  USER_OPEN_LIST_ITEM,
  USER_TO_DELETE,
} from '../actionTypes';

export type UserListPageActions =
  | ReturnType<typeof setUserListIsLoading>
  | ReturnType<typeof setUserListWasLoaded>
  | ReturnType<typeof setUserListFail>
  | ReturnType<typeof setUserToDelete>
  | ReturnType<typeof setUserDeleting>
  | ReturnType<typeof setUserDeletingSuccess>
  | ReturnType<typeof setUserDeletingFail>
  | ReturnType<typeof openListItem>
  | ReturnType<typeof getUsers>
  | ReturnType<typeof deleteUserRequest>;

export const setUserListIsLoading = () =>
  ({
    type: USER_LIST_LOADING_AWAIT,
    payload: undefined,
  } as const);
export const setUserListWasLoaded = (users: User[]) =>
  ({
    type: USER_LIST_LOADING_SUCCESS,
    payload: users,
  } as const);
export const setUserListFail = (error: string) =>
  ({
    type: USER_LIST_LOADING_FAIL,
    payload: error,
  } as const);
export const setUserToDelete = (user: User) =>
  ({
    type: USER_TO_DELETE,
    payload: user,
  } as const);
export const setUserDeleting = () =>
  ({
    type: USER_DELETING,
    payload: undefined,
  } as const);
export const setUserDeletingSuccess = (deletedUser: UserDelete) =>
  ({
    type: USER_DELETING_SUCCESS,
    payload: deletedUser,
  } as const);
export const setUserDeletingFail = () =>
  ({
    type: USER_DELETING_FAIL,
    payload: undefined,
  } as const);
export const openListItem = (id: number) =>
  ({
    type: USER_OPEN_LIST_ITEM,
    payload: id,
  } as const);
export const getUsers = () =>
  ({
    type: GET_USERS,
    payload: undefined,
  } as const);
export const deleteUserRequest = (userToDeleteId: number) =>
  ({
    type: DELETE_USER,
    payload: userToDeleteId,
  } as const);
