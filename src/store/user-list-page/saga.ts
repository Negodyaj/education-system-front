import { all, call, put, takeLatest } from 'redux-saga/effects';

import { User } from '../../interfaces/User';
import { UserDelete } from '../../interfaces/UserDelete';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { isUserArr } from '../../services/type-guards/userArray';
import { isUserDelete } from '../../services/type-guards/userDelete';
import { usersUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { DELETE_USER, GET_USERS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { pushNotification } from '../notifications/action-creators';

import { deleteUserRequest, setUserListWasLoaded } from './action-creators';

function* userListPageRootSaga() {
  yield all([getUsersSagaWatcher(), deleteUserSagaWatcher()]);
}
function* getUsersSagaWatcher() {
  yield takeLatest(GET_USERS, getUsersSagaWorkerWrapper);
}
function* getUsersSagaWorkerWrapper() {
  yield put(setIsLoading());
  yield getUsersSagaWorker();
  yield put(setIsLoaded());
}
function* getUsersSagaWorker() {
  const users: User[] = yield call(async () =>
    sendGetRequest<User[]>(usersUrl, isUserArr).then((response) => response)
  );

  const error = tryGetErrorFromResponse(users);

  if (error) yield put(constructNotificationError(error));
  else yield put(setUserListWasLoaded(users));
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
  yield getUsersSagaWorker();
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
  else
    yield put(
      pushNotification(
        makeNotification(
          'success',
          `Пользователь ${deleteUserResponse.firstName} ${deleteUserResponse.lastName} успешно удалён`
        )
      )
    );
}

export default userListPageRootSaga;
