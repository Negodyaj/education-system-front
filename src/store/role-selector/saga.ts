import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import { User } from '../../interfaces/User';
import { setCurrentUserInStorage } from '../../services/auth.service';
import { sendGetRequest } from '../../services/http.service';
import { isUser } from '../../services/type-guards/user';
import { currentUserUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { GET_CURRENT_USER } from '../actionTypes';
import {
  setIsLoaded,
  setIsLoading,
  setIsLoggedIn,
} from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';

import { setCurrentUserWasLoaded } from './action-creator';

function* RoleSelectorRootSaga() {
  yield all([getCurrentUserWatcher()]);
}

function* getCurrentUserWatcher() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUserWorker);
}

function* getCurrentUserWorker() {
  yield put(setIsLoading());
  const currentUser: User = yield call(async () =>
    sendGetRequest<User>(currentUserUrl, isUser).then((response) => response)
  );
  const error = tryGetErrorFromResponse(currentUser);

  if (error) yield put(constructNotificationError(error));
  else {
    setCurrentUserInStorage(currentUser);
    yield put(setCurrentUserWasLoaded());
    yield put(setIsLoggedIn());
  }

  yield put(setIsLoaded());
}

export default RoleSelectorRootSaga;
