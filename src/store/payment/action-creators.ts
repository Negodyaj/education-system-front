import { User } from '../../interfaces/User';
import { PaymentResponse } from '../../components/interfaces/PaymentResponse';
import {
  PAYMENT_FORM_CLOSE,
  PAYMENT_FORM_VISIBLE,
  PAYMENT_LIST_WRETCH_FAIL,
  PAYMENT_LIST_WRETCH_LOADED,
  PAYMENT_LIST_WRETCH_LOADING,
  PAYMENT_SEND_SUCCESS,
} from '../actionTypes';

export type PaymentFormActions =
  | ReturnType<typeof setPaymentSendSuccess>
  | ReturnType<typeof setPaymentFormOpen>
  | ReturnType<typeof setPaymentFormCLose>
  | ReturnType<typeof setPaymentListIsLoading>
  | ReturnType<typeof setPaymentListWasLoaded>
  | ReturnType<typeof setPaymentListFail>;

export const setPaymentSendSuccess = () =>
  ({
    type: PAYMENT_SEND_SUCCESS,
    payload: undefined,
  } as const);

export const setPaymentFormOpen = (user: User) =>
  ({
    type: PAYMENT_FORM_VISIBLE,
    payload: user,
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
