import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  fork,
  select,
} from 'redux-saga/effects';

import { Homework } from '../../interfaces/Homework';
import { HomeworkPost } from '../../interfaces/HomeworkPost';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { isHomework } from '../../services/type-guards/homework';
import { isHomeworkArr } from '../../services/type-guards/homeworkArr';
import { baseUrl, homeworkUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { APPOINT_HOMEWORK, GET_HOMEWORKS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { currentUserRoleIdSelector } from '../role-selector/selectors';

import {
  appointHomework,
  getHomeworks,
  HomeworkPageActions,
  loadHomeworkSuccess,
} from './action-creators';
import { getHomeworkForAppointmentSelector } from './homework-appoint-modal/selector';

export function* homeworkPageWatchers() {
  yield all([loadHomeworkListWatcher(), appointHomeworkPageSagaWatcher()]);
}

export function* loadHomeworkListWatcher() {
  yield takeLatest(GET_HOMEWORKS, loadHomeworkListSaga);
}

export function* loadHomeworkListSaga({
  payload,
}: ReturnType<typeof getHomeworks>) {
  yield put(setIsLoading());
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkSuccess(homeworks, payload));
  } catch {
    console.log('error loadHomeworkListSaga');
  }
  yield put(setIsLoaded());
}

export function* appointHomeworkPageSagaWatcher() {
  yield takeLatest(APPOINT_HOMEWORK, appointHomeworkPageSagaWorker);
}

export function* appointHomeworkPageSagaWorker({
  payload,
}: ReturnType<typeof appointHomework>) {
  try {
    const homeworkForAppointment: Homework = yield select(
      getHomeworkForAppointmentSelector
    );
    const appointedHomework: HomeworkPost = {
      description: homeworkForAppointment.description,
      startDate: homeworkForAppointment.startDate,
      deadlineDate: payload.deadline,
      courseId: homeworkForAppointment.course.id,
      groupId: Number.parseInt(payload.group, 10),
      tagIds: homeworkForAppointment.tags.map((tag) => tag.id),
      themeIds: homeworkForAppointment.themes?.map((theme) => theme.id) || [],
      isOptional: homeworkForAppointment.isOptional,
    };
    const homeworkAppointmentResponse: Homework = yield call(async () =>
      sendPostRequest<Homework>(
        `${homeworkUrl}`,
        isHomework,
        appointedHomework
      ).then((response) => response)
    );
    const error = tryGetErrorFromResponse(homeworkAppointmentResponse);

    if (error) yield put(constructNotificationError(error));
    else {
      yield put(
        constructSuccessNotification(
          `Домашнее задание ${homeworkAppointmentResponse.description} назначено`
        )
      );
      const roleId: number = yield select(currentUserRoleIdSelector);
      yield loadHomeworkListSaga({
        type: GET_HOMEWORKS,
        payload: roleId,
      });
    }
  } catch {
    console.log('error appointHomeworkPageSaga');
  }
}
