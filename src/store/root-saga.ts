import { all } from 'redux-saga/effects';

import courseByIdPageRootSaga from './course-edition/saga';
import attemptRootSaga from './homework-attempt/saga';
import lessonByGroupListPageRootSaga from './group-page/lesson/saga';
import { homeworkPageWatchers } from './homework-page/saga';
import loginFormRootSaga from './login-form/saga';
import RoleSelectorRootSaga from './role-selector/saga';
import userListPageRootSaga from './user-list-page/saga';
import { userPageRootSaga } from './user-page/saga';
import { tagsPageRootSaga } from './tags-page/saga';
import { coursePageRootSaga } from './courses-page/saga';
import groupRootSaga from './group-page/group-info-component/saga';
import { paymentRootSaga } from './payment/saga';
import { addHWModalRootSaga } from './homework-page/add-homework-modal/saga';

export function* rootSaga() {
  yield all([
    homeworkPageWatchers(),
    userPageRootSaga(),
    userListPageRootSaga(),
    courseByIdPageRootSaga(),
    attemptRootSaga(),
    RoleSelectorRootSaga(),
    loginFormRootSaga(),
    tagsPageRootSaga(),
    coursePageRootSaga(),
    lessonByGroupListPageRootSaga(),
    paymentRootSaga(),
    addHWModalRootSaga(),
    groupRootSaga(),
  ]);
}
