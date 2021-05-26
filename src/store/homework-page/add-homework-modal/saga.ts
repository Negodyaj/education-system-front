import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Homework } from '../../../interfaces/Homework';
import { Course } from '../../../interfaces/Courses';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import {
  sendGetRequest,
  sendPostRequest,
} from '../../../services/http.service';
import { isHomework } from '../../../services/type-guards/homework';
import { isHomeworkArr } from '../../../services/type-guards/homeworkArr';
import {
  coursesUrl,
  homeworkUrl,
  tagsUrl,
  themesUrl,
} from '../../../shared/consts';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import { makeNotification } from '../../../shared/helpers/notificationHelpers';
import {
  ADD_HOMEWORK_OR_MODAL,
  GET_COURSES_FOR_HW_MODAL,
  GET_HOMEWORKS_FOR_MODAL,
  GET_TAGS_FOR_HW_MODAL,
} from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';
import { pushNotification } from '../../notifications/action-creators';
import { setTagsListWasLoaded } from '../../tags-page/action-creators';
import { isCourseArr } from '../../../services/type-guards/courseArr';
import { Tag } from '../../../interfaces/Tag';
import { isTagArr } from '../../../services/type-guards/tagArr';
import { Themes } from '../../../interfaces/Themes';
import { isThemesArr } from '../../../services/type-guards/themesArr';

import {
  addHomeworkForModalWatcherAction,
  loadCourseForHWModalSuccess,
  loadCourseForHWModalWatcherAction,
  loadHomeworkForModalSuccess,
  loadTagsForHWModalWatcherAction,
  loadThemesForHWModalWatcherAction,
} from './action-creators';

export function* addHWModalRootSaga() {
  yield all([getHWForModalSagaWatcher(), addHWForModalWatcher()]);
}
export function* getHWForModalSagaWatcher() {
  yield takeLatest(GET_HOMEWORKS_FOR_MODAL, loadHMListForModalSagaWorker);
}

export function* loadHMListForModalSagaWorker() {
  yield put(setIsLoading());
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);
    yield loadCoursesForAddModalSagaWorker();
    yield loadTagsForAddModalSagaWorker();
    yield loadThemesForAddModalSagaWorker();

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkForModalSuccess(homeworks));

    console.log(homeworks);
  } catch {
    console.log('error setloadHMListForModalSaga');
  }
  yield put(setIsLoaded());
}

export function* addHWForModalWatcher() {
  yield takeLatest(ADD_HOMEWORK_OR_MODAL, addHWForModalSagaWorker);
}
export function* addHWForModalSagaWorker({
  payload,
}: ReturnType<typeof addHomeworkForModalWatcherAction>) {
  yield put(setIsLoading());
  try {
    const newHomework: HomeworkInput = yield call(async () =>
      sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, payload).then(
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
      yield loadHMListForModalSagaWorker();
    } else yield put(constructNotificationError(error));
  } catch {
    console.log('error addHWForModalSaga');
  }
  yield put(setIsLoaded());
}

export function* loadCoursesForAddModalSagaWorker() {
  try {
    const courses: Course[] = yield call(async () =>
      sendGetRequest<Course[]>(`${coursesUrl}`, isCourseArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(courses);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadCourseForHWModalSuccess(courses));
  } catch {
    console.log('error addCoursesForAddModalSaga');
  }
}

export function* loadTagsForAddModalSagaWorker() {
  try {
    const tags: Tag[] = yield call(async () =>
      sendGetRequest<Tag[]>(`${tagsUrl}`, isTagArr).then((response) => response)
    );
    const error = tryGetErrorFromResponse(tags);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadTagsForHWModalWatcherAction(tags));
  } catch {
    console.log('error loadTagsForAddModalSagaWorker');
  }
}

export function* loadThemesForAddModalSagaWorker() {
  try {
    const themes: Themes[] = yield call(async () =>
      sendGetRequest<Themes[]>(`${themesUrl}`, isThemesArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(themes);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadThemesForHWModalWatcherAction(themes));
  } catch {
    console.log('error loadThemesForAddModalSagaWorker');
  }
}
