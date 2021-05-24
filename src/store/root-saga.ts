import { all } from 'redux-saga/effects';

import { homeworkPageWatchers } from './homework-page/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';
import { tagsPageRootSaga } from './tags-page/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
    tagsPageRootSaga(),
  ]);
}
