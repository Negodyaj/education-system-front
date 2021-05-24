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
import { sendPostRequest } from '../../services/http.service';
import { homeworkUrl } from '../../shared/consts';
import { SEND_ATTEMPT } from '../actionTypes';
import { isSendAttemptResponse } from '../../services/type-guards/sendAttemptResponse';
import { AttemptPost } from '../../interfaces/AttemptPost';
import { currentUserRoleIdSelector } from '../role-selector/selectors';
import { HWAttemptStatuses } from '../../enums/hwAttemptStatuses';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { setIsLoaded, setIsLoading } from '../app/action-creators';

import { currentHomeworkSelector } from './selector';
import { sendAttempt } from './action-creators';

function* attemptRootSaga() {
  yield all([sendAttemptWatcher()]);
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

export default attemptRootSaga;
