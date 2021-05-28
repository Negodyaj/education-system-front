import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { CurrentLesson } from '../../../components/group-page/lesson-list-component/lesson-list-table/LessonsTableByGroup';
import { IUserAttendance } from '../../../components/group-page/lesson-list-component/modal-attendance/ModalAttendance';
import { Attendance } from '../../../interfaces/Attendance';
import { DataNewLesson } from '../../../interfaces/DataNewLesson';
import { DataUpdateLesson } from '../../../interfaces/DataUpdateLesson';
import { Lesson } from '../../../interfaces/Lesson';
import { LessonInput } from '../../../interfaces/LessonInput';
import { LessonUpdate } from '../../../interfaces/LessonUpdate';
import {
  sendDeleteRequest,
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from '../../../services/http.service';
import { isAttendance } from '../../../services/type-guards/attendance';
import { isLesson } from '../../../services/type-guards/lesson';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonsUrl } from '../../../shared/consts';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import {
  CREATE_ATTENDANCES,
  CREATE_LESSON,
  DELETE_LESSON,
  LESSON_BY_GROUP_ID,
  UPDATE_LESSON,
} from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';
import { constructSuccessNotification } from '../../core/sucess-notification-constructor';
import { getThemes } from '../../course-edition/action-creators';

import {
  setIsOpenModalAttendance,
  setIsOpenModalDeleteLesson,
  setLessonListFail,
  setLessonListWasLoaded,
  setSelectedLesson,
} from './action-creators';
import {
  attendancesToCreateSelector,
  lessonToCreateSelector,
  lessonToSelectSelector,
  lessonToUpdateSelector,
} from './selector';

function* lessonByGroupListPageRootSaga() {
  yield all([
    getLessonsSagaWatcher(),
    createLessonSagaWatcher(),
    updateLessonSagaWatcher(),
    deleteLessonSagaWatcher(),
    createAttendancesSagaWatcher(),
  ]);
}

function* getLessonsSagaWatcher() {
  yield takeLatest(LESSON_BY_GROUP_ID, getLessonsSagaWorker);
}

function* createLessonSagaWatcher() {
  yield takeLatest(CREATE_LESSON, createLessonSagaWorker);
}

function* updateLessonSagaWatcher() {
  yield takeLatest(UPDATE_LESSON, updateLessonSagaWorker);
}

function* deleteLessonSagaWatcher() {
  yield takeLatest(DELETE_LESSON, deleteLessonSagaWorker);
}

function* createAttendancesSagaWatcher() {
  yield takeLatest(CREATE_ATTENDANCES, createAttendancesSagaWorker);
}

function* getLessonsSagaWorker() {
  yield put(setIsLoading());

  const lessons: Lesson[] = yield call(async () =>
    sendGetRequest<Lesson[]>(`${lessonsUrl}/by-group/14`, isLessonArr).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(lessons);

  if (error) {
    yield put(constructNotificationError(error));
  } else {
    yield put(setLessonListWasLoaded(lessons));
    yield put(getThemes());
  }

  yield put(setIsLoaded());
}

function* createLessonSagaWorker() {
  try {
    const dataForCreateLesson: LessonInput = yield select(
      lessonToCreateSelector
    );
    const newLesson: DataNewLesson = {
      groupId: 14,
      description: dataForCreateLesson.description,
      lessonDate: dataForCreateLesson.lessonDate,
      themesId: dataForCreateLesson.themesId,
    };
    const createLessonRequestResponse: Lesson = yield call(async () =>
      sendPostRequest<Lesson>(`${lessonsUrl}`, isLesson, newLesson).then(
        (response) => response
      )
    );
    const errorResponse = tryGetErrorFromResponse(createLessonRequestResponse);

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(
        constructSuccessNotification(
          `Занятие на ${createLessonRequestResponse.lessonDate} запланировано`
        )
      );
      yield getLessonsSagaWorker();
    }
  } catch (error) {
    yield put(setLessonListFail(error));
  }
}

function* updateLessonSagaWorker() {
  try {
    const id: number = yield select(lessonToSelectSelector);
    const dataForUpdateLesson: LessonUpdate = yield select(
      lessonToUpdateSelector
    );
    const lessonUpdate: DataUpdateLesson = {
      groupId: 14,
      description: dataForUpdateLesson.description,
      lessonDate: dataForUpdateLesson.lessonDate,
      themesId: dataForUpdateLesson.themesId,
      recordLink: dataForUpdateLesson.recordLink,
    };
    const updateLessonRequestResponse: Lesson = yield call(async () =>
      sendPutRequest<Lesson>(
        `${lessonsUrl}/${id}`,
        isLesson,
        lessonUpdate
      ).then((response) => response)
    );
    const errorResponse = tryGetErrorFromResponse(updateLessonRequestResponse);

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(setSelectedLesson({} as CurrentLesson));
      yield put(
        constructSuccessNotification(
          `Занятие, запланированное на ${updateLessonRequestResponse.lessonDate}, успешно изменено`
        )
      );
      yield getLessonsSagaWorker();
    }
  } catch (error) {
    yield put(setLessonListFail(error));
  }
}

function* deleteLessonSagaWorker() {
  try {
    const id: number = yield select(lessonToSelectSelector);
    const deleteRequestResponse: Lesson = yield call(async () =>
      sendDeleteRequest<Lesson>(`${lessonsUrl}/${id}`, isLesson).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(deleteRequestResponse);

    if (error) {
      yield put(constructNotificationError(error));
    } else {
      yield put(setIsOpenModalDeleteLesson());
      yield put(setSelectedLesson({} as CurrentLesson));
      yield getLessonsSagaWorker();
      yield put(
        constructSuccessNotification(
          `Занятие от ${deleteRequestResponse.lessonDate} успешно удалено`
        )
      );
    }
  } catch (error) {
    yield put(setLessonListFail(error));
  }
}

function* createAttendancesSagaWorker() {
  try {
    const idLesson: number = yield select(lessonToSelectSelector);
    const arrNewAttendances: IUserAttendance[] = yield select(
      attendancesToCreateSelector
    );
    for (let i = 0; i < arrNewAttendances.length; i++) {
      const createAttendanceRequestResponse: Attendance = yield call(async () =>
        sendPostRequest<Attendance>(
          `${lessonsUrl}/${idLesson}/attendance`,
          isAttendance,
          arrNewAttendances[i]
        ).then((response) => response)
      );
      const errorResponse = tryGetErrorFromResponse(
        createAttendanceRequestResponse
      );

      if (errorResponse) {
        yield constructNotificationError(errorResponse);
      } else {
        yield put(setIsOpenModalAttendance());
        yield put(setSelectedLesson({} as CurrentLesson));
        yield put(
          constructSuccessNotification(
            `${createAttendanceRequestResponse.user.lastName} ${createAttendanceRequestResponse.user.firstName} присутствует на занятии`
          )
        );
      }
    }
  } catch (error) {
    yield put(setLessonListFail(error));
  }
}

export default lessonByGroupListPageRootSaga;
