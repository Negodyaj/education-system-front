import { all, takeLatest } from 'redux-saga/effects';

import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import {
  CLONE_HOMEWORK,
  GET_COURSES_FOR_CLONE_HW_MODAL,
} from '../../actionTypes';
import { setIsLoading } from '../../app/action-creators';
import { loadCoursesForAddModalSagaWorker } from '../add-homework-modal/saga';

import { cloneHomeworkWatcherAction } from './action-creators';

export function* cloneHWModalRootSaga() {
  yield all([loadHWForCloneModalWatcher()]);
}
export function* loadHWForCloneModalWatcher() {
  yield takeLatest(
    GET_COURSES_FOR_CLONE_HW_MODAL,
    loadCoursesForAddModalSagaWorker
  );
}
// export function* cloneHomeworkWatcher() {
//     yield takeLatest (CLONE_HOMEWORK, cloneHomeworkWorker);
//   }
// export function* cloneHomeworkWorker ({payload,
// }: ReturnType<typeof cloneHomeworkWatcherAction> {
// yield put (setIsLoading());
// try {
//   const newHomework: HomeworkInput = yield call(async () =>
//     sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, payload).then(
//       (homework) => homework
//     )
//   );
//   const error = tryGetErrorFromResponse(newHomework);

//     if (!error) {
//       yield put(
//         pushNotification(
//           makeNotification(
//             'success',
//             `Домашняя работа ${newHomework.description} успешно скопирована`
//           )
//         )
//       );
//       const roleId: number = yield select(currentUserRoleIdSelector);
//       yield put(getHomeworks(roleId));
//     } else yield put(constructNotificationError(error));
//   } catch {
//     console.log('error addHWForModalSaga');
//   }
//   yield put(setIsLoaded());
// };
