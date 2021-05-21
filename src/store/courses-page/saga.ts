/* eslint-disable no-unused-expressions */
import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  fork,
  select,
} from 'redux-saga/effects';

import { Course } from '../../interfaces/Courses';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isCourseArr } from '../../services/type-guards/courseArr';
import { coursesUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { DELETE_COURSE_WATCHER, GET_COURSES_WATCHER } from '../actionTypes';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';

import {
  setCoursesListIsLoadingAction,
  setCoursesListWasLoadedAction,
  showToggleModalDeleteCourseAction,
} from './action-creators';
import { courseToDeleteSelector } from './selector';

export function* coursePageRootSaga() {
  yield all([getCoursesSagaWatcher(), deleteCourseWarcher()]);
}

function* getCoursesSagaWatcher() {
  yield takeLatest(GET_COURSES_WATCHER, getCoursesSagaWorker);
}

function* deleteCourseWarcher() {
  yield takeLatest(DELETE_COURSE_WATCHER, deleteCourseWorker);
}

function* getCoursesSagaWorker() {
  try {
    yield put(setCoursesListIsLoadingAction());
    const courses: Course[] = yield call(async () =>
      sendGetRequest<Course[]>(coursesUrl, isCourseArr).then(
        (response) => response
      )
    );
    yield put(setCoursesListWasLoadedAction(courses));
  } catch {
    console.log('ошибка');
  }
}

function* deleteCourseWorker() {
  try {
    const id: number = yield select(courseToDeleteSelector);
    const deleteRequestResponse: Course = yield call(async () =>
      sendDeleteRequest<Course>(`${coursesUrl}/${id}`, isCourse).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(deleteRequestResponse);

    if (error) {
      yield put(constructNotificationError(error));
    } else {
      yield put(showToggleModalDeleteCourseAction());
      yield getCoursesSagaWorker();
      yield put(
        constructSuccessNotification(
          `Курс ${deleteRequestResponse.name} успешно удален`
        )
      );
    }
  } catch {
    console.log('ошибка');
  }
}
