import { all, fork } from 'redux-saga/effects';

import { homeworkPageRootSaga, homeworkPageSaga } from './homework-page/saga';

export function* rootSaga() {
  yield all([fork(homeworkPageRootSaga)]);
}
