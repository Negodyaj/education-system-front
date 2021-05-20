import { Dispatch } from 'redux';

import { User } from '../../interfaces/User';
import { UserRegisterResponse } from '../../interfaces/UserRegisterResponse';
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from '../../services/http.service';
import { isUser } from '../../services/type-guards/user';
import { isUserRegisterResponse } from '../../services/type-guards/userRegisterResponse';
import {
  UNSET_USER_ID_FOR_USER_PAGE,
  userListUrl,
  userRegisterUrl,
  usersUrl,
} from '../../shared/consts';
import { convertUserToUserInput } from '../../shared/converters/userToUserInput';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { pushNotification } from '../notifications/action-creators';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import {
  setUserIsSending,
  setUserSendingFail,
  setUserToEditFail,
  setUserToEditIsLoading,
  setUserToEditWasLoaded,
  setUserUpdateResponse,
} from './action-creators';

export const getUserToEditById = (userId?: string) => (dispatch: Dispatch) => {
  if (userId) {
    dispatch(setUserToEditIsLoading());
    sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
      .then((user) => {
        dispatch(setUserToEditWasLoaded(thunkResponseHandler(dispatch, user)));
      })
      .catch((error) => dispatch(setUserToEditFail(error)));
  } else {
    dispatch(setUserToEditWasLoaded());
  }
};
export const sendUser = (user: User, userId: number, history: any) => (
  dispatch: Dispatch<any>
) => {
  if (userId && userId !== UNSET_USER_ID_FOR_USER_PAGE)
    dispatch(updateUser(user, userId, history));
  else {
    dispatch(setUserIsSending());
    sendPostRequest<UserRegisterResponse>(
      userRegisterUrl,
      isUserRegisterResponse,
      convertUserToUserInput(user)
    ).then((userUpdateResponse) => {
      const response = thunkResponseHandler(dispatch, userUpdateResponse);

      if (response) {
        const userResponse = { ...response } as User;
        dispatch(
          pushNotification(
            makeNotification(
              'success',
              `Пользователь ${userResponse.firstName} ${userResponse.lastName} успешно зарегистрирован`
            )
          )
        );
        dispatch(setUserUpdateResponse());
        history.push(`/${userListUrl}`);
      } else {
        dispatch(setUserSendingFail());
      }
    });
  }
};
const updateUser = (user: User, userId: number, history: any) => (
  dispatch: Dispatch
) => {
  dispatch(setUserIsSending());
  sendPutRequest<User>(`${usersUrl}/${userId}`, isUser, user).then(
    (userUpdateResponse) => {
      const response = thunkResponseHandler(dispatch, userUpdateResponse);

      if (response) {
        dispatch(
          pushNotification(
            makeNotification(
              'success',
              `Пользователь ${(response as User).firstName} ${
                (response as User).lastName
              } успешно изменён`
            )
          )
        );
        dispatch(setUserUpdateResponse());
        history.push(`/${userListUrl}`);
      } else {
        dispatch(setUserSendingFail());
      }
    }
  );
};
