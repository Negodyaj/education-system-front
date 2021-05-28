import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
import { WretcherError, WretcherResponse } from 'wretch';

import { Tag } from '../../interfaces/Tag';
import {
  sendDeleteRequestNoResponse,
  sendGetRequest,
  sendPostRequest,
} from '../../services/http.service';
import { isTag } from '../../services/type-guards/tag';
import { isTagArr } from '../../services/type-guards/tagArr';
import { tagsUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { ADD_TAG, DELETE_TAG, GET_TAGS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { pushNotification } from '../notifications/action-creators';

import {
  addTagWatcherAction,
  deleteTagWatcherAction,
  setTagsListWasLoaded,
} from './action-creators';

export function* tagsPageRootSaga() {
  yield all([
    tagsPageSagaWatcher(),
    deleteTagPageSagaWatcher(),
    addTagWatcher(),
  ]);
}

export function* tagsPageSagaWatcher() {
  yield put(setIsLoading());
  yield takeLatest(GET_TAGS, loadTagsListSaga);
  yield put(setIsLoaded());
}

export function* loadTagsListSaga() {
  try {
    const tags: Tag[] = yield call(async () =>
      sendGetRequest<Tag[]>(`${tagsUrl}`, isTagArr).then((response) => response)
    );
    const error = tryGetErrorFromResponse(tags);

    if (error) yield put(constructNotificationError(error));
    else yield put(setTagsListWasLoaded(tags));
  } catch {
    console.log('error setTagsListWasLoaded');
  }
}

export function* deleteTagPageSagaWatcher() {
  yield takeEvery(DELETE_TAG, deleteTagSaga);
}

export function* deleteTagSaga({
  payload,
}: ReturnType<typeof deleteTagWatcherAction>) {
  const error: WretcherError = yield call(
    sendDeleteRequestNoResponse,
    `${tagsUrl}/${payload.id}`
  );

  if (error.status >= 400) yield put(constructNotificationError(error));
  else {
    yield put(
      pushNotification(
        makeNotification('success', `Тег ${payload.name} успешно удален`)
      )
    );

    yield loadTagsListSaga();
  }
}

export function* addTagWatcher() {
  yield put(setIsLoading());
  yield takeLatest(ADD_TAG, addTagSaga);
  yield put(setIsLoaded());
}

export function* addTagSaga({
  payload,
}: ReturnType<typeof addTagWatcherAction>) {
  try {
    const newTag: Tag = yield call(async () =>
      sendPostRequest<Tag>(`${tagsUrl}`, isTag, payload).then((tag) => tag)
    );
    const error = tryGetErrorFromResponse(newTag);

    if (!error) {
      yield put(
        pushNotification(
          makeNotification('success', `Тег ${newTag.name} успешно добавлен`)
        )
      );
      yield loadTagsListSaga();
    } else yield put(constructNotificationError(error));
  } catch {
    console.log('error addTagSaga');
  }
}
