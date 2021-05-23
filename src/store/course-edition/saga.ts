import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { Course } from '../../interfaces/Courses';
import { sendGetRequest } from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { coursesUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { COURSE_BY_ID } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';

import { getCourseById, getCourseByIdLoaded } from './action-creators';

function* courseByIdPageRootSaga() {
  yield all([getCourseByIdSagaWatcher()]);
}
function* getCourseByIdSagaWatcher() {
  yield takeEvery(COURSE_BY_ID, getCourseByIdSagaWorker);
}
function* getCourseByIdSagaWorker({
  payload,
}: ReturnType<typeof getCourseById>) {
  yield put(setIsLoading());

  const course: Course = yield call(async () =>
    sendGetRequest<Course>(`${coursesUrl}/${payload}`, isCourse).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(course);

  if (error) yield put(constructNotificationError(error));
  else yield put(getCourseByIdLoaded(course));

  yield put(setIsLoaded());
}

export default courseByIdPageRootSaga;
