import { Role } from '../../enums/role';
import { User } from '../../interfaces/User';
import { UNSET_USER_ID_FOR_USER_PAGE } from '../../shared/consts';
import { convertUserToUserInput } from '../../shared/converters/userToUserInput';
import { convertUserToUserUpdate } from '../../shared/converters/userToUserUpdate';
import {
  USER_IS_SENDING,
  USER_TO_EDIT_ID_FOR_USER_PAGE,
  USER_TO_EDIT_LOADING,
  USER_TO_EDIT_LOADED,
  USER_TO_EDIT_FAIL,
  USER_SENDING_FAIL,
} from '../actionTypes';
import { IUserPage } from '../state';

import { UserPageActions } from './action-creators';

export const INIT_USER: User = {
  id: 0,
  firstName: '',
  lastName: '',
  birthDate: '',
  login: '',
  password: '',
  phone: '',
  userPic: '',
  email: '',
  contractNumber: 0,
  roles: [],
};

const initialState: IUserPage = {
  userForUserPage: INIT_USER,
  userForUserPageId: UNSET_USER_ID_FOR_USER_PAGE,
  isReadonly: false,
  isDataLoading: true,
  pageOptionsByRole: {
    [Role[Role.Student]]: {
      isReadonly: true,
    },
  },
};
export function userPageReducer(
  state: IUserPage = initialState,
  action: UserPageActions
): IUserPage {
  switch (action.type) {
    case USER_TO_EDIT_ID_FOR_USER_PAGE:
      return {
        ...state,
        userForUserPageId: action.payload,
        isDataLoading: true,
      };
    case USER_TO_EDIT_LOADING:
      return { ...state, isDataLoading: true };
    case USER_TO_EDIT_LOADED:
      return {
        ...state,
        userForUserPage: action.payload
          ? { ...convertUserToUserUpdate(action.payload) }
          : { ...convertUserToUserInput(INIT_USER) },
        userForUserPageId: action.payload?.id as number,
        isDataLoading: false,
      };
    case USER_TO_EDIT_FAIL:
      return { ...state, isDataLoading: false };
    case USER_IS_SENDING:
      return { ...state, isDataLoading: true };
    case USER_SENDING_FAIL:
      return { ...state, isDataLoading: false };
    default:
      return state;
  }
}
