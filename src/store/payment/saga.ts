import { Dispatch } from 'redux';
import { put, all, call, takeLatest, select } from 'redux-saga/effects';

import { PaymentInput } from '../../components/interfaces/PaymentInput';
import { User } from '../../interfaces/User';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { isPaymentResponse } from '../../services/type-guards/paymentResponse';
import { isPaymentResponseArr } from '../../services/type-guards/paymentResponseArr';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { CREATE_PAYMENT_WATCHER, GET_CURRENT_USER } from '../actionTypes';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';
import { PaymentResponse } from '../../components/interfaces/PaymentResponse';
import { toggleModalWindow } from '../modal-window/action-creators';
import { ChildIndex } from '../../enums/ChildIndex';

import { newPaymentInput, userForPayment } from './selector';
import {
  getCurrentUser,
  setPaymentListIsLoading,
  setPaymentListWasLoaded,
} from './action-creators';

export function* paymentRootSaga() {
  yield all([createPaymentWatcher(), getPaymentWatcher()]);
}

export function* createPaymentWatcher() {
  yield takeLatest(CREATE_PAYMENT_WATCHER, createPaymentSagaWorker);
}

export function* getPaymentWatcher() {
  yield takeLatest(GET_CURRENT_USER, getPaymentSagaWorker);
}

export function* createPaymentSagaWorker() {
  try {
    const user: User = yield select(userForPayment);
    const newPayment: PaymentInput = yield select(newPaymentInput);
    const responseRequest: PaymentResponse = yield call(async () =>
      sendPostRequest<PaymentResponse>(
        `User/${user.id}/payment`,
        isPaymentResponse,
        newPayment
      ).then((response) => response)
    );
    const errorResponse = tryGetErrorFromResponse(responseRequest);

    if (errorResponse) {
      yield constructNotificationError(errorResponse);
    } else {
      yield put(
        constructSuccessNotification(
          `Оплата пользователю ${responseRequest.user?.firstName} ${responseRequest.user?.lastName} успешно назначена`
        )
      );
    }
  } catch (error) {
    console.log('Ошибка');
  }
}

export function* getPaymentSagaWorker({
  payload,
}: ReturnType<typeof getCurrentUser>) {
  const user: User = payload;
  yield put(setPaymentListIsLoading());
  const responseRequest: PaymentResponse[] = yield call(async () =>
    sendGetRequest<PaymentResponse[]>(
      `User/${user.id}/payment`,
      isPaymentResponseArr
    ).then((response) => response)
  );
  const errorResponse = tryGetErrorFromResponse(responseRequest);

  if (errorResponse) yield constructNotificationError(errorResponse);
  else yield put(setPaymentListWasLoaded(responseRequest));

  yield put(toggleModalWindow(ChildIndex.Payment));
}
