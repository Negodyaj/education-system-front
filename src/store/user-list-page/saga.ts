import { all, call, put, takeLatest } from 'redux-saga/effects';

import { User } from '../../interfaces/User';
import { UserDelete } from '../../interfaces/UserDelete';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { isUserArr } from '../../services/type-guards/userArray';
import { isUserDelete } from '../../services/type-guards/userDelete';
import { usersUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { DELETE_USER, GET_USERS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';

import { deleteUserRequest, setUserListWasLoaded } from './action-creators';

function* userListPageRootSaga() {
  yield all([getUsersSagaWatcher(), deleteUserSagaWatcher()]);
}
function* getUsersSagaWatcher() {
  yield takeLatest(GET_USERS, getUsersSagaWorker);
}
function* getUsersSagaWorker() {
  yield put(setIsLoading());

  const users: User[] = yield call(async () =>
    sendGetRequest<User[]>(usersUrl, isUserArr).then((response) => response)
  );

  const error = tryGetErrorFromResponse(users);

  if (error) yield put(constructNotificationError(error));
  else yield put(setUserListWasLoaded(users));

  yield put(setIsLoaded());
}

function* deleteUserSagaWatcher() {
  yield takeLatest(DELETE_USER, deleteUserSagaWorkerWrapper);
}
function* deleteUserSagaWorkerWrapper({
  payload,
}: ReturnType<typeof deleteUserRequest>) {
  const userToDeleteId: number = payload;
  yield put(setIsLoading());
  yield deleteUserSagaWorker(userToDeleteId);
  yield put(setIsLoaded());
}
function* deleteUserSagaWorker(userToDeleteId: number) {
  const deleteUserResponse: UserDelete = yield call(async () =>
    sendDeleteRequest<UserDelete>(
      `${usersUrl}/${userToDeleteId}`,
      isUserDelete
    ).then((response) => response)
  );

  const error = tryGetErrorFromResponse(deleteUserResponse);

  if (error) yield put(constructNotificationError(error));
  else {
    yield put(
      constructSuccessNotification(
        `Пользователь ${deleteUserResponse.firstName} ${deleteUserResponse.lastName} успешно удалён`
      )
    );

    yield getUsersSagaWorker();
  }
}

export default userListPageRootSaga;
