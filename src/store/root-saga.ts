import { all, fork } from 'redux-saga/effects';

import { homeworkPageRootSaga, homeworkPageSaga } from './homework-page/saga';
import { tagsPageRootSaga } from './tags-page/saga';

export function* rootSaga() {
  yield all([fork(homeworkPageRootSaga), fork(tagsPageRootSaga)]);
}
