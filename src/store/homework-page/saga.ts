import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  fork,
  select,
} from 'redux-saga/effects';

import { Homework } from '../../interfaces/Homework';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { isHomework } from '../../services/type-guards/homework';
import { isHomeworkArr } from '../../services/type-guards/homeworkArr';
import { baseUrl, homeworkUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { APPOINT_HOMEWORK, GET_HOMEWORKS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { currentUserRoleIdSelector } from '../role-selector/selectors';

import {
  appointHomework,
  getHomeworks,
  HomeworkPageActions,
  loadHomeworkSuccess,
} from './action-creators';

export function* homeworkPageWatchers() {
  yield all([loadHomeworkListWatcher(), appointHomeworkPageSagaWatcher()]);
}

export function* loadHomeworkListWatcher() {
  yield takeLatest(GET_HOMEWORKS, loadHomeworkListSaga);
}

export function* loadHomeworkListSaga({
  payload,
}: ReturnType<typeof getHomeworks>) {
  yield put(setIsLoading());
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
    console.log('error loadHomeworkListSaga');
  }
  yield put(setIsLoaded());
}

export function* appointHomeworkPageSagaWatcher() {
  yield takeLatest(APPOINT_HOMEWORK, appointHomeworkPageSagaWorker);
}

export function* appointHomeworkPageSagaWorker({
  payload,
}: ReturnType<typeof appointHomework>) {
  try {
    const homeworkAppointmentResponse: Homework = yield call(async () =>
      sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, payload).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworkAppointmentResponse);

    if (error) yield put(constructNotificationError(error));
    else {
      yield put(
        constructSuccessNotification(
          `Домашнее задание ${homeworkAppointmentResponse.description} назначено`
        )
      );
      const roleId: number = yield select(currentUserRoleIdSelector);
      yield loadHomeworkListSaga({
        type: GET_HOMEWORKS,
        payload: roleId,
      });
    }
  } catch {
    console.log('error appointHomeworkPageSaga');
  }
}
