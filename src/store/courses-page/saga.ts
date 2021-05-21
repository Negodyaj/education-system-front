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

import { IRootState } from '..';
import { Course } from '../../interfaces/Courses';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isCourseArr } from '../../services/type-guards/courseArr';
import { coursesUrl } from '../../shared/consts';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { DELETE_COURSE_WATCHER, GET_COURSES_WATCHER } from '../actionTypes';
import { pushNotification } from '../notifications/action-creators';
import { ICoursePageState } from '../state';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import {
  setCoursesListIsLoadingAction,
  setCoursesListWasLoadedAction,
} from './action-creators';

const idCourseDelete = (state: IRootState) => {
  state.coursePage.idCourseForDelete;
};

export function* CoursePageRoot() {
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
    yield call(async () =>
      sendDeleteRequest<Course>(
        `${coursesUrl}/${idCourseDelete}`,
        isCourse
      ).then((course) => {
        const response = thunkResponseHandler(put, course);
        response &&
          call(async () =>
            pushNotification(
              makeNotification(
                'success',
                `Курс ${(response as Course).name} успешно удален`
              )
            )
          );
      })
    );
  } catch {
    console.log('ошибка');
  }
}
