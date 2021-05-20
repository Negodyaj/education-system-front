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
  yield takeLatest(GET_TAGS, loadTagsListSaga);
}

export function* loadTagsListSaga() {
  try {
    yield put(setIsLoading());
    const tags: Tag[] = yield call(async () =>
      sendGetRequest<Tag[]>(`${tagsUrl}`, isTagArr).then((response) => response)
    );
    yield put(setIsLoaded());
    const error = tryGetErrorFromResponse(tags);

    if (error) yield put(constructNotificationError(error));
    else yield put(setTagsListWasLoaded(tags));
  } catch {
    console.log('error setTagsListWasLoaded');
  }
}

export function* deleteTagPageSagaWatcher() {
  yield takeLatest(DELETE_TAG, deleteTagSaga);
}

export function* deleteTagSaga({
  payload,
}: ReturnType<typeof deleteTagWatcherAction>) {
  try {
    yield put(setIsLoading());
    const error: WretcherError = yield call(
      sendDeleteRequestNoResponse,
      `${tagsUrl}/${payload.id}`
    );
    yield put(setIsLoaded());

    if (error.status >= 400) yield put(constructNotificationError(error));
    else {
      yield put(
        pushNotification(
          makeNotification('success', `Тег ${payload.name} успешно удален`)
        )
      );

      yield loadTagsListSaga();
    }
  } catch {
    console.log('error deleteTagSaga');
  }
}

export function* addTagWatcher() {
  yield takeLatest(ADD_TAG, addTagSaga);
}

export function* addTagSaga({
  payload,
}: ReturnType<typeof addTagWatcherAction>) {
  try {
    yield put(setIsLoading());
    const newTag: Tag = yield call(async () =>
      sendPostRequest<Tag>(`${tagsUrl}`, isTag, newTag).then((tag) => tag)
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
