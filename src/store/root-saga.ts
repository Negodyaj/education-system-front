import { all } from 'redux-saga/effects';

import { homeworkPageWatchers } from './homework-page/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';
import { CoursePageRoot } from './courses-page/saga';
import { homeworkPageRootSaga } from './homework-page/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
  yield all([fork(homeworkPageRootSaga), fork(CoursePageRoot)]);
  ]);
}
