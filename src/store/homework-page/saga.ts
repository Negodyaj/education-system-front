import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  fork,
} from 'redux-saga/effects';

import { Homework } from '../../interfaces/Homework';
import { sendGetRequest } from '../../services/http.service';
import { isHomeworkArr } from '../../services/type-guards/homeworkArr';
import { homeworkUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { GET_HOMEWORKS } from '../actionTypes';
import { constructNotificationError } from '../core/error-notification-constructor';

import {
  getHomeworks,
  HomeworkPageActions,
  loadHomeworkSuccess,
} from './action-creators';

export function* homeworkPageWatchers() {
  yield all([fork(homeworkPageSaga), fork(anotherHomeworkPageSaga)]);
}

export function* homeworkPageSaga() {
  yield takeLatest(GET_HOMEWORKS, loadHomeworkListSaga);
}

export function* loadHomeworkListSaga({
  payload,
}: ReturnType<typeof getHomeworks>) {
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkSuccess(homeworks, payload));
  } catch {
    console.log('error loadHomeworkListSagas');
  }
}

export function* anotherHomeworkPageSaga() {
  yield takeLatest('ANOTHER_KEY', loadHomeworkListSaga);
}

export function* anotherLoadHomeworkListSaga({ payload }: any) {
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkSuccess(homeworks, payload));
  } catch {
    console.log('error loadHomeworkListSagas');
  }
}
