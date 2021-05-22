import { put, all, call, takeLatest, select } from 'redux-saga/effects';

import { CourseInput } from '../../interfaces/CourseInput';
import { Course } from '../../interfaces/Courses';
import {
  sendDeleteRequest,
  sendGetRequest,
  sendPostRequest,
} from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isCourseArr } from '../../services/type-guards/courseArr';
import { coursesUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import {
  CREATE_COURSE_WATCHER,
  DELETE_COURSE_WATCHER,
  GET_COURSES_WATCHER,
} from '../actionTypes';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';

import {
  setCoursesListFail,
  setCoursesListIsLoadingAction,
  setCoursesListWasLoadedAction,
  showToggleModalCreateCourseAction,
  showToggleModalDeleteCourseAction,
} from './action-creators';
import { courseToCreateSelector, courseToDeleteSelector } from './selector';

export function* coursePageRootSaga() {
  yield all([
    getCoursesSagaWatcher(),
    deleteCourseWatcher(),
    createCourseWatcher(),
  ]);
}

function* getCoursesSagaWatcher() {
  yield takeLatest(GET_COURSES_WATCHER, getCoursesSagaWorker);
}

function* deleteCourseWatcher() {
  yield takeLatest(DELETE_COURSE_WATCHER, deleteCourseWorker);
}

function* createCourseWatcher() {
  yield takeLatest(CREATE_COURSE_WATCHER, createCourseWorker);
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
  } catch (error) {
    yield put(setCoursesListFail(error));
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
  } catch (error) {
    yield put(setCoursesListFail(error));
  }
}

function* createCourseWorker() {
  try {
    yield put(setCoursesListIsLoadingAction());
    const newCourse: CourseInput = yield select(courseToCreateSelector);
    const createRequestResponse: Course = yield call(async () =>
      sendPostRequest<Course>(`${coursesUrl}`, isCourse, newCourse).then(
        (response) => response
      )
    );
    const errorResponse = tryGetErrorFromResponse(createRequestResponse);

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(showToggleModalCreateCourseAction());
      yield getCoursesSagaWorker();
      yield put(
        constructSuccessNotification(
          `Курс ${createRequestResponse.name} успешно созданы`
        )
      );
    }
  } catch (error) {
    yield put(setCoursesListFail(error));
  }
}
