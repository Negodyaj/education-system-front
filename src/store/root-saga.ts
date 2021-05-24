import { all } from 'redux-saga/effects';

import attemptRootSaga from './homework-attempt/saga';
import { homeworkPageWatchers } from './homework-page/saga';
import loginFormRootSaga from './login-form/saga';
import RoleSelectorRootSaga from './role-selector/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
    attemptRootSaga(),
    RoleSelectorRootSaga(),
    loginFormRootSaga(),
  ]);
}
