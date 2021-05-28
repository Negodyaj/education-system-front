import { call, put, select, takeEvery } from 'redux-saga/effects';

import { User } from '../../interfaces/User';
import { UserInput } from '../../interfaces/UserInput';
import { UserRegisterResponse } from '../../interfaces/UserRegisterResponse';
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from '../../services/http.service';
import { isUser } from '../../services/type-guards/user';
import { isUserRegisterResponse } from '../../services/type-guards/userRegisterResponse';
import {
  personalPageUrl,
  UNSET_USER_ID_FOR_USER_PAGE,
  userListUrl,
  userRegisterUrl,
  usersUrl,
} from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import {
  SEND_USER,
  SEND_USER_TO_EDIT,
  USER_TO_EDIT_LOADING_WATCHER,
} from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';

import {
  getUserToEdit,
  sendUser,
  sendUserToEdit,
  setUserToEditWasLoaded,
} from './action-creators';

export function* userPageRootSaga() {
  yield takeEvery(USER_TO_EDIT_LOADING_WATCHER, loadUserToEditSaga);
  yield takeEvery(SEND_USER, sendUserSagaWorker);
  yield takeEvery(SEND_USER_TO_EDIT, sendUserToPersonalPageSagaWorker);
}

export function* loadUserToEditSaga({
  payload,
}: ReturnType<typeof getUserToEdit>) {
  if (payload) {
    try {
      yield put(setIsLoading());

      const userToEdit: User = yield call(async () =>
        sendGetRequest<User>(`${usersUrl}/${payload}`, isUser).then(
          (response) => response
        )
      );
      const error = tryGetErrorFromResponse(userToEdit);

      if (error) yield put(constructNotificationError(error));
      else yield put(setUserToEditWasLoaded(userToEdit));

      yield put(setIsLoaded());
    } catch {
      console.log('get user to edit error');
    }
  } else {
    yield put(setUserToEditWasLoaded());
  }
}
export function* sendUserSagaWorker({ payload }: ReturnType<typeof sendUser>) {
  const { user, userId, history } = payload;

  if (userId && userId !== UNSET_USER_ID_FOR_USER_PAGE)
    yield updateUserSagaWorker(user, userId, history);
  else {
    yield put(setIsLoading());
    const userRegisterResponse: UserRegisterResponse = yield call(async () =>
      sendPostRequest<UserRegisterResponse>(
        userRegisterUrl,
        isUserRegisterResponse,
        user
      ).then((response) => response)
    );

    const error = tryGetErrorFromResponse(userRegisterResponse);

    if (error) yield put(constructNotificationError(error));
    else {
      yield put(
        constructSuccessNotification(
          `Пользователь ${userRegisterResponse.firstName} ${userRegisterResponse.lastName} успешно зарегистрирован`
        )
      );
      history.push(`/${userListUrl}`);
    }

    yield put(setIsLoaded());
  }
}

export function* sendUserToPersonalPageSagaWorker({
  payload,
}: ReturnType<typeof sendUserToEdit>) {
  const { user, userId, history } = payload;

  if (userId && userId !== UNSET_USER_ID_FOR_USER_PAGE)
    yield updateUserToPersonalPageSagaWorker(user, userId, history);
  else {
    yield put(setIsLoading());
    const userRegisterResponse: UserRegisterResponse = yield call(async () =>
      sendPostRequest<UserRegisterResponse>(
        userRegisterUrl,
        isUserRegisterResponse,
        user
      ).then((response) => response)
    );

    const error = tryGetErrorFromResponse(userRegisterResponse);

    if (error) yield put(constructNotificationError(error));
    else {
      yield put(
        constructSuccessNotification(
          `Пользователь ${userRegisterResponse.firstName} ${userRegisterResponse.lastName} успешно зарегистрирован`
        )
      );
      history.push(`/${personalPageUrl}`);
    }

    yield put(setIsLoaded());
  }
}

export function* updateUserSagaWorker(
  user: UserInput,
  userId: number,
  history: any
) {
  yield put(setIsLoading());
  const userUpdateResponse: User = yield call(async () =>
    sendPutRequest<User>(`${usersUrl}/${userId}`, isUser, user).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(userUpdateResponse);

  if (error) yield put(constructNotificationError(error));
  else {
    yield put(
      constructSuccessNotification(
        `Пользователь ${userUpdateResponse.firstName} ${userUpdateResponse.lastName} успешно изменён`
      )
    );
    history.push(`/${userListUrl}`);
  }

  yield put(setIsLoaded());
}

export function* updateUserToPersonalPageSagaWorker(
  user: UserInput,
  userId: number,
  history: any
) {
  yield put(setIsLoading());
  const userUpdateResponse: User = yield call(async () =>
    sendPutRequest<User>(`${usersUrl}/${userId}`, isUser, user).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(userUpdateResponse);

  if (error) yield put(constructNotificationError(error));
  else {
    yield put(
      constructSuccessNotification(
        `Пользователь ${userUpdateResponse.firstName} ${userUpdateResponse.lastName} успешно изменён`
      )
    );
    history.push(`/${personalPageUrl}`);
  }

  yield put(setIsLoaded());
}
