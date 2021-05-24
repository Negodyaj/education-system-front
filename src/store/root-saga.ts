import { all } from 'redux-saga/effects';

import attemptRootSaga from './homework-attempt/saga';
import { homeworkPageWatchers } from './homework-page/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
    attemptRootSaga(),
  ]);
}
