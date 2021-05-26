import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { Course } from '../../interfaces/Courses';
import { Material } from '../../interfaces/Materials';
import { Themes } from '../../interfaces/Themes';
import { sendGetRequest } from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isMaterialArr } from '../../services/type-guards/materialArr';
import { isThemesArr } from '../../services/type-guards/themesArr';
import { coursesUrl, materialsUrl, themesUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import {
  COURSE_EDITION_ALL_MATERIALS,
  COURSE_EDITION_ALL_THEMES,
  COURSE_EDITION_COURSE_BY_ID,
} from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';

import {
  getAllMaterials,
  getAllThemes,
  getCourseById,
  getCourseByIdLoaded,
} from './action-creators';

function* courseByIdPageRootSaga() {
  yield all([
    getCourseByIdSagaWatcher(),
    getThemesSagaWatcher(),
    getMaterialsSagaWatcher(),
  ]);
}
function* getCourseByIdSagaWatcher() {
  yield takeLatest(COURSE_EDITION_COURSE_BY_ID, getCourseByIdSagaWorker);
}
function* getThemesSagaWatcher() {
  yield takeLatest(COURSE_EDITION_ALL_THEMES, getThemesSagaWorker);
}
function* getMaterialsSagaWatcher() {
  yield takeLatest(COURSE_EDITION_ALL_MATERIALS, getMaterialsSagaWorker);
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

function* getThemesSagaWorker() {
  yield put(setIsLoading());

  const themes: Themes[] = yield call(async () =>
    sendGetRequest<Themes[]>(themesUrl, isThemesArr).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(themes);

  if (error) yield put(constructNotificationError(error));
  else yield put(getAllThemes(themes));

  yield put(setIsLoaded());
}

function* getMaterialsSagaWorker() {
  yield put(setIsLoading());

  const materials: Material[] = yield call(async () =>
    sendGetRequest<Material[]>(materialsUrl, isMaterialArr).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(materials);

  if (error) yield put(constructNotificationError(error));
  else yield put(getAllMaterials(materials));

  yield put(setIsLoaded());
}

export default courseByIdPageRootSaga;
