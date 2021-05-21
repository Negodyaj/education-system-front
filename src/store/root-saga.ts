import { all, fork } from 'redux-saga/effects';

import { CoursePageRoot } from './courses-page/saga';
import { homeworkPageRootSaga } from './homework-page/saga';

export function* rootSaga() {
  yield all([fork(homeworkPageRootSaga), fork(CoursePageRoot)]);
}
