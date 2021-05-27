import { all, takeLatest } from 'redux-saga/effects';

import { GET_COURSES_FOR_CLONE_HW_MODAL } from '../../actionTypes';
import { loadCoursesForAddModalSagaWorker } from '../add-homework-modal/saga';

export function* cloneHWModalRootSaga() {
  yield all([cloneHWForModalWatcher()]);
}
export function* cloneHWForModalWatcher() {
  yield takeLatest(
    GET_COURSES_FOR_CLONE_HW_MODAL,
    loadCoursesForAddModalSagaWorker
  );
}
