import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { Homework } from '../../../interfaces/Homework';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import { sendPostRequest } from '../../../services/http.service';
import { isHomework } from '../../../services/type-guards/homework';
import { homeworkUrl } from '../../../shared/consts';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import { makeNotification } from '../../../shared/helpers/notificationHelpers';
import {
  CLONE_HOMEWORK,
  GET_COURSES_FOR_CLONE_HW_MODAL,
} from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';
import { pushNotification } from '../../notifications/action-creators';
import { currentUserRoleIdSelector } from '../../role-selector/selectors';
import { getHomeworks } from '../action-creators';
import { loadCoursesForAddModalSagaWorker } from '../add-homework-modal/saga';

import { cloneHomeworkWatcherAction } from './action-creators';
import { homeworkCloneDefaultValueSelector } from './selector';

export function* cloneHWModalRootSaga() {
  yield all([loadHWForCloneModalWatcher()]);
}
export function* loadHWForCloneModalWatcher() {
  yield takeLatest(
    GET_COURSES_FOR_CLONE_HW_MODAL,
    loadCoursesForAddModalSagaWorker
  );
}
export function* cloneHomeworkWatcher() {
  yield takeLatest(CLONE_HOMEWORK, cloneHomeworkWorker);
}
export function* cloneHomeworkWorker({
  payload,
}: ReturnType<typeof cloneHomeworkWatcherAction>) {
  yield put(setIsLoading());
  try {
    const tmpclone: HomeworkInput = yield select(
      homeworkCloneDefaultValueSelector
    );
    const clone: HomeworkInput = { ...tmpclone, courseId: payload.courseId };
    const newHomework: HomeworkInput = yield call(async () =>
      sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, clone).then(
        (homework) => homework
      )
    );
    const error = tryGetErrorFromResponse(newHomework);

    if (!error) {
      yield put(
        pushNotification(
          makeNotification(
            'success',
            `Домашняя работа ${newHomework.description} успешно скопирована`
          )
        )
      );
      const roleId: number = yield select(currentUserRoleIdSelector);
      yield put(getHomeworks(roleId));
    } else yield put(constructNotificationError(error));
  } catch {
    console.log('error addHWForModalSaga');
  }
  yield put(setIsLoaded());
}
