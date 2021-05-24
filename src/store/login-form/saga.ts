import wretch from 'wretch';
import { all, put, takeLeading } from '@redux-saga/core/effects';
import { call } from 'redux-saga/effects';

import { AuthenticationResponse } from '../../interfaces/AuthenticationResponse';
import { AUTHENTICATION } from '../actionTypes';
import { baseUrl } from '../../shared/consts';
import { pushNotification } from '../notifications/action-creators';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { setToken } from '../../services/auth.service';
import { getCurrentUser } from '../role-selector/action-creator';
import { setIsLoaded, setIsLoading } from '../app/action-creators';

import { authenticate } from './action-creators';

function* loginFormRootSaga() {
  yield all([authenticateWatcher()]);
}

function* authenticateWatcher() {
  yield takeLeading(AUTHENTICATION, authenticateWorker);
}

function* authenticateWorker({ payload }: ReturnType<typeof authenticate>) {
  yield put(setIsLoading());
  const { login, password } = payload;
  const data: AuthenticationResponse = yield call(async () =>
    wretch(`${baseUrl}/authentication`)
      .post({ login, password })
      .json((response) => response)
      .catch((error) => {
        console.log(error);
        put(
          pushNotification(
            makeNotification('error', 'Неверный логин или пароль')
          )
        );
      })
  );
  setToken(data.token);
  yield put(getCurrentUser());
  yield put(setIsLoaded());
}

export default loginFormRootSaga;
