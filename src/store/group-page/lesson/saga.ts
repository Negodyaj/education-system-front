import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Lesson } from '../../../interfaces/Lesson';
import { sendGetRequest } from '../../../services/http.service';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonsUrl } from '../../../shared/consts';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import { LESSON_BY_GROUP_ID } from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';
import { setUserListWasLoaded } from '../../user-list-page/action-creators';

import { setLessonListWasLoaded } from './action-creators';

function* lessonByGroupListPageRootSaga() {
  yield all([getLessonsSagaWatcher()]);
}
function* getLessonsSagaWatcher() {
  yield takeLatest(LESSON_BY_GROUP_ID, getLessonsSagaWorker);
}
function* getLessonsSagaWorker() {
  yield put(setIsLoading());

  const lessons: Lesson[] = yield call(async () =>
    sendGetRequest<Lesson[]>(`${lessonsUrl}/by-group/14`, isLessonArr).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(lessons);

  if (error) yield put(constructNotificationError(error));
  else yield put(setLessonListWasLoaded(lessons));

  yield put(setIsLoaded());
}

export default lessonByGroupListPageRootSaga;
