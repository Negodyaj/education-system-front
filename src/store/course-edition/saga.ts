import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import { Course } from '../../interfaces/Courses';
import { MaterialInput } from '../../interfaces/MaterialInput';
import { Material } from '../../interfaces/Materials';
import { ThemeInput } from '../../interfaces/ThemeInput';
import { Themes } from '../../interfaces/Themes';
import {
  sendDeleteRequest,
  sendGetRequest,
  sendPostRequest,
} from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isMaterial } from '../../services/type-guards/material';
import { isMaterialArr } from '../../services/type-guards/materialArr';
import { isTheme } from '../../services/type-guards/theme';
import { isThemesArr } from '../../services/type-guards/themesArr';
import { coursesUrl, materialsUrl, themesUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import {
  COURSE_EDITION_ALL_MATERIALS,
  COURSE_EDITION_ALL_THEMES,
  COURSE_EDITION_COURSE_BY_ID,
  CREATE_MATERIAL,
  CREATE_THEME,
  DELETE_MATERIAL,
  DELETE_THEME,
} from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { loadTagsListWatcherAction } from '../tags-page/action-creators';

import {
  getAllMaterials,
  getAllThemes,
  getCourseById,
  getCourseByIdLoaded,
  setCourseEditionFailAction,
  setIsOpenModalDeleteMaterial,
  setIsOpenModalDeleteTheme,
  setSelectedMaterial,
  setSelectedTheme,
} from './action-creators';
import {
  materialToCreateSelector,
  materialToSelectSelector,
  themeToCreateSelector,
  themeToSelectSelector,
} from './selector';

function* courseByIdPageRootSaga() {
  yield all([
    getCourseByIdSagaWatcher(),
    getThemesSagaWatcher(),
    createThemeSagaWatcher(),
    deleteThemeSagaWatcher(),
    getMaterialsSagaWatcher(),
    createMaterialSagaWatcher(),
    deleteMaterialSagaWatcher(),
  ]);
}
function* getCourseByIdSagaWatcher() {
  yield takeLatest(COURSE_EDITION_COURSE_BY_ID, getCourseByIdSagaWorker);
}

function* getThemesSagaWatcher() {
  yield takeLatest(COURSE_EDITION_ALL_THEMES, getThemesSagaWorker);
}

function* createThemeSagaWatcher() {
  yield takeLatest(CREATE_THEME, createThemeSagaWorker);
}

function* deleteThemeSagaWatcher() {
  yield takeLatest(DELETE_THEME, deleteThemeSagaWorker);
}

function* getMaterialsSagaWatcher() {
  yield takeLatest(COURSE_EDITION_ALL_MATERIALS, getMaterialsSagaWorker);
}

function* createMaterialSagaWatcher() {
  yield takeLatest(CREATE_MATERIAL, createMaterialSagaWorker);
}

function* deleteMaterialSagaWatcher() {
  yield takeLatest(DELETE_MATERIAL, deleteMaterialSagaWorker);
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

  if (error) {
    yield put(constructNotificationError(error));
  } else {
    yield put(loadTagsListWatcherAction());
    yield put(getAllThemes(themes));
  }

  yield put(setIsLoaded());
}

function* createThemeSagaWorker() {
  try {
    const newTheme: ThemeInput = yield select(themeToCreateSelector);
    const createThemeRequestResponse: Themes = yield call(async () =>
      sendPostRequest<Themes>(themesUrl, isTheme, newTheme).then(
        (response) => response
      )
    );
    const errorResponse = tryGetErrorFromResponse(createThemeRequestResponse);

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(
        constructSuccessNotification(
          `Тема ${createThemeRequestResponse.name} успешно добавлена`
        )
      );
      yield getThemesSagaWorker();
    }
  } catch (error) {
    yield put(setCourseEditionFailAction(error));
  }
}

function* deleteThemeSagaWorker() {
  try {
    const id: number = yield select(themeToSelectSelector);
    const deleteRequestResponse: Themes = yield call(async () =>
      sendDeleteRequest<Themes>(`${themesUrl}/${id}`, isTheme).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(deleteRequestResponse);

    if (error) {
      yield put(constructNotificationError(error));
    } else {
      yield put(setIsOpenModalDeleteTheme());
      yield put(setSelectedTheme({} as Themes));
      yield getThemesSagaWorker();
      yield put(
        constructSuccessNotification(
          `Тема ${deleteRequestResponse.name} успешно удалена`
        )
      );
    }
  } catch (error) {
    yield put(setCourseEditionFailAction(error));
  }
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

function* createMaterialSagaWorker() {
  try {
    const newMaterial: MaterialInput = yield select(materialToCreateSelector);
    const createMaterialRequestResponse: Material = yield call(async () =>
      sendPostRequest<Material>(materialsUrl, isMaterial, newMaterial).then(
        (response) => response
      )
    );
    const errorResponse = tryGetErrorFromResponse(
      createMaterialRequestResponse
    );

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(constructSuccessNotification(`Материал успешно добавлен`));
      yield getMaterialsSagaWorker();
    }
  } catch (error) {
    yield put(setCourseEditionFailAction(error));
  }
}

function* deleteMaterialSagaWorker() {
  try {
    const id: number = yield select(materialToSelectSelector);
    console.log(id);
    const deleteRequestResponse: Material = yield call(async () =>
      sendDeleteRequest<Material>(`${materialsUrl}/${id}`, isMaterial).then(
        (response) => response
      )
    );
    console.log(deleteRequestResponse);
    const error = tryGetErrorFromResponse(deleteRequestResponse);

    if (error) {
      yield put(constructNotificationError(error));
    } else {
      yield put(setIsOpenModalDeleteMaterial());
      yield put(setSelectedMaterial({} as Material));
      yield getMaterialsSagaWorker();
      yield put(constructSuccessNotification(`Материал успешно удален`));
    }
  } catch (error) {
    yield put(setCourseEditionFailAction(error));
  }
}

export default courseByIdPageRootSaga;
