import { all } from 'redux-saga/effects';

import courseByIdPageRootSaga from './course-edition/saga';
import { homeworkPageWatchers } from './homework-page/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
    courseByIdPageRootSaga(),
  ]);
}
