import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { User } from '../../interfaces/User';
import { sendGetRequest } from '../../services/http.service';
import { isUser } from '../../services/type-guards/user';
import { usersUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { USER_TO_EDIT_LOADING_WATCHER } from '../actionTypes';
import { constructNotificationError } from '../core/error-notification-constructor';

import {
  getUserToEdit,
  setUserToEditIsLoading,
  setUserToEditWasLoaded,
} from './action-creators';

export function* userPageRootSaga() {
  yield takeEvery(USER_TO_EDIT_LOADING_WATCHER, loadUserToEditSaga);
}

export function* loadUserToEditSaga({
  payload,
}: ReturnType<typeof getUserToEdit>) {
  if (payload) {
    try {
      yield put(setUserToEditIsLoading());
      const userToEdit: User = yield call(async () =>
        sendGetRequest<User>(`${usersUrl}/${payload}`, isUser).then(
          (response) => response
        )
      );
      const error = tryGetErrorFromResponse(userToEdit);

      if (error) yield put(constructNotificationError(error));
      else yield put(setUserToEditWasLoaded(userToEdit));
    } catch {
      console.log('get user to edit error');
    }
  } else {
    yield put(setUserToEditWasLoaded());
  }
}
