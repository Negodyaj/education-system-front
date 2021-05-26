import { User } from '../../interfaces/User';
import { PaymentResponse } from '../../components/interfaces/PaymentResponse';
import {
  CREATE_PAYMENT_WATCHER,
  GET_CURRENT_USER_PAYMENT,
  PAYMENT_FORM_CLOSE,
  PAYMENT_LIST_WRETCH_FAIL,
  PAYMENT_LIST_WRETCH_LOADED,
  PAYMENT_LIST_WRETCH_LOADING,
  PAYMENT_SEND_SUCCESS,
} from '../actionTypes';
import { PaymentInput } from '../../components/interfaces/PaymentInput';

export type PaymentFormActions =
  | ReturnType<typeof setPaymentSendSuccess>
  | ReturnType<typeof setPaymentFormCLose>
  | ReturnType<typeof setPaymentListIsLoading>
  | ReturnType<typeof setPaymentListWasLoaded>
  | ReturnType<typeof setPaymentListFail>
  | ReturnType<typeof getCurrentUser>
  | ReturnType<typeof createPaymentWatcher>;

export const setPaymentSendSuccess = () =>
  ({
    type: PAYMENT_SEND_SUCCESS,
    payload: undefined,
  } as const);

export const setPaymentFormCLose = () =>
  ({
    type: PAYMENT_FORM_CLOSE,
    payload: undefined,
  } as const);

export const setPaymentListIsLoading = () =>
  ({
    type: PAYMENT_LIST_WRETCH_LOADING,
    payload: undefined,
  } as const);

export const setPaymentListWasLoaded = (payment: PaymentResponse[]) =>
  ({
    type: PAYMENT_LIST_WRETCH_LOADED,
    payload: payment,
  } as const);

export const setPaymentListFail = (error: string) =>
  ({
    type: PAYMENT_LIST_WRETCH_FAIL,
    payload: error,
  } as const);

export const createPaymentWatcher = (newPayment: PaymentInput) =>
  ({
    type: CREATE_PAYMENT_WATCHER,
    payload: newPayment,
  } as const);

export const getCurrentUser = (user: User) =>
  ({
    type: GET_CURRENT_USER_PAYMENT,
    payload: user,
  } as const);
