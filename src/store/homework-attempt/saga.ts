import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import { Homework } from '../../interfaces/Homework';
import { SendAttemptResponse } from '../../interfaces/SendAttemptResponse';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { homeworkUrl } from '../../shared/consts';
import {
  ALL_ACTIVE_GROUPS_LOADING,
  ATTEMPT_LIST_LOADING,
  LOAD_CURRENT_HOMEWORK,
  SEND_ATTEMPT,
} from '../actionTypes';
import { isSendAttemptResponse } from '../../services/type-guards/sendAttemptResponse';
import { AttemptPost } from '../../interfaces/AttemptPost';
import { currentUserRoleIdSelector } from '../role-selector/selectors';
import { HWAttemptStatuses } from '../../enums/hwAttemptStatuses';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { isHomework } from '../../services/type-guards/homework';
import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';
import { isAllGroupsInCollegeArr } from '../../services/type-guards/allGroupsIncollegeArr';
import { Attempt } from '../../interfaces/Attempt';
import { isAttemptArr } from '../../services/type-guards/attemptsArr';

import { currentHomeworkSelector } from './selector';
import {
  attemptListLoadingSuccess,
  getAttemptListToCheck,
  loadCurrentHomework,
  sendAttempt,
  setAllGroupsInCollege,
  setCurrentAttempt,
  setCurrentGroup,
  setCurrentHomework,
} from './action-creators';

function* attemptRootSaga() {
  yield all([
    sendAttemptWatcher(),
    loadCurrentHomeworkWatcher(),
    getAllActiveGroupsInCollegeWatcher(),
    getAttemptListToCheckWatcher(),
  ]);
}

function* loadCurrentHomeworkWatcher() {
  yield takeLeading(LOAD_CURRENT_HOMEWORK, loadCurrentHomeworkWorker);
}

function* loadCurrentHomeworkWorker({
  payload,
}: ReturnType<typeof loadCurrentHomework>) {
  yield put(setIsLoading());
  const currentHomework: Homework = yield call(async () =>
    sendGetRequest<Homework>(`${homeworkUrl}/${payload}`, isHomework).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(currentHomework);

  if (error) yield put(constructNotificationError(error));
  else {
    yield put(setCurrentHomework(currentHomework));
    yield put(setCurrentGroup(currentHomework.groupsIds));
  }

  yield put(setIsLoaded());
}

function* sendAttemptWatcher() {
  yield takeLeading(SEND_ATTEMPT, sendAttemptWorker);
}

function* sendAttemptWorker({ payload }: ReturnType<typeof sendAttempt>) {
  try {
    yield put(setIsLoading());
    const currentUserRoleId: number = yield select(currentUserRoleIdSelector);
    const newAttempt: AttemptPost = {
      authorId: currentUserRoleId,
      homeworkAttemptStatusId: HWAttemptStatuses.Await,
      comment: payload.comment,
    };
    const currentHomework: Homework = yield select(currentHomeworkSelector);
    console.log(currentHomework);
    const sendAttemptResponse: SendAttemptResponse = yield call(async () =>
      sendPostRequest<SendAttemptResponse>(
        `${homeworkUrl}/${currentHomework.id}/attempt`,
        isSendAttemptResponse,
        newAttempt
      )
    );
    const error = tryGetErrorFromResponse(sendAttemptResponse);

    if (error) yield put(constructNotificationError(error));
    else
      yield put(
        constructSuccessNotification(
          `Решение домашнего задания "${currentHomework.description}" успешно отправлено`
        )
      );

    yield put(setIsLoaded());
  } catch {
    console.log('attempt sending error');
  }
}

function* getAllActiveGroupsInCollegeWatcher() {
  yield takeLatest(
    ALL_ACTIVE_GROUPS_LOADING,
    getAllActiveGroupsInCollegeWorker
  );
}

function* getAllActiveGroupsInCollegeWorker() {
  yield put(setIsLoading());
  const groups: AllGroupsInCollege[] = yield call(async () =>
    sendGetRequest<AllGroupsInCollege[]>(`Group`, isAllGroupsInCollegeArr).then(
      (response) => response
    )
  );
  const error = tryGetErrorFromResponse(groups);

  if (error) yield put(constructNotificationError(error));
  else yield put(setAllGroupsInCollege(groups));

  yield put(setIsLoaded());
}

function* getAttemptListToCheckWatcher() {
  yield takeLatest(ATTEMPT_LIST_LOADING, getAttemptListToCheckWorker);
}

function* getAttemptListToCheckWorker({
  payload,
}: ReturnType<typeof getAttemptListToCheck>) {
  const attempts: Attempt[] = yield call(async () =>
    sendGetRequest<Attempt[]>(
      `${homeworkUrl}/${payload.hwId}/attempts`,
      isAttemptArr
    ).then((response) => response)
  );

  const error = tryGetErrorFromResponse(attempts);

  if (error) yield put(constructNotificationError(error));
  else {
    yield put(attemptListLoadingSuccess(attempts));
    yield loadCurrentHomeworkWorker({
      type: LOAD_CURRENT_HOMEWORK,
      payload: payload.hwId,
    });

    if (attempts.length)
      yield put(
        setCurrentAttempt(
          [...attempts].filter(
            (attempt) => attempt.id.toString() === payload.attemptId
          )[0]
        )
      );

    yield getAllActiveGroupsInCollegeWorker();
  }
}

export default attemptRootSaga;
