import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Homework } from '../../../interfaces/Homework';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import {
  sendGetRequest,
  sendPostRequest,
} from '../../../services/http.service';
import { isHomework } from '../../../services/type-guards/homework';
import { isHomeworkArr } from '../../../services/type-guards/homeworkArr';
import { homeworkUrl } from '../../../shared/consts';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import { makeNotification } from '../../../shared/helpers/notificationHelpers';
import {
  ADD_HOMEWORK_OR_MODAL,
  GET_HOMEWORKS_FOR_MODAL,
} from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';
import { pushNotification } from '../../notifications/action-creators';
import { setTagsListWasLoaded } from '../../tags-page/action-creators';

import {
  addHomeworkForModalWatcherAction,
  loadHomeworkForModalSuccess,
} from './action-creators';

export function* addHWModalRootSaga() {
  yield all([getHWForModalSagaWatcher()]);
}
export function* getHWForModalSagaWatcher() {
  yield put(setIsLoading());
  yield takeLatest(GET_HOMEWORKS_FOR_MODAL, loadHMListForModalSaga);
  yield put(setIsLoaded());
}

export function* loadHMListForModalSaga() {
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(homeworkUrl, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkForModalSuccess(homeworks));
  } catch {
    console.log('error setloadHMListForModalSaga');
  }
}

export function* addHWForModalWatcher() {
  yield put(setIsLoading());
  yield takeLatest(ADD_HOMEWORK_OR_MODAL, addHWForModalSaga);
  yield put(setIsLoaded());
}
export function* addHWForModalSaga({
  payload,
}: ReturnType<typeof addHomeworkForModalWatcherAction>) {
  try {
    const newHomework: HomeworkInput = yield call(async () =>
      sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, newHomework).then(
        (homework) => homework
      )
    );
    const error = tryGetErrorFromResponse(newHomework);

    if (!error) {
      yield put(
        pushNotification(
          makeNotification(
            'success',
            `Домашняя работа ${newHomework.description} успешно добавлена`
          )
        )
      );
      yield loadHMListForModalSaga();
    } else yield put(constructNotificationError(error));
  } catch {
    console.log('error addHWForModalSaga');
  }
}
