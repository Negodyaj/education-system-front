import { format } from 'date-fns';

import { PaymentInput } from '../../components/interfaces/PaymentInput';
import {
  CREATE_PAYMENT_WATCHER,
  GET_CURRENT_USER,
  PAYMENT_LIST_WRETCH_FAIL,
  PAYMENT_LIST_WRETCH_LOADED,
  PAYMENT_LIST_WRETCH_LOADING,
} from '../actionTypes';
import { IPaymentFormState } from '../state';

import { PaymentFormActions } from './action-creators';
import { newPaymentInput } from './selector';

const todate = new Date();
const formattedDate = format(todate, 'dd.mm.yyyy');

export const INIT_PAYMENT: PaymentInput = {
  amount: 2500,
  date: todate.toLocaleDateString('ru-RU'),
  period: '',
  contractNumber: 0,
};
const initialState: IPaymentFormState = {
  userForPayment: undefined,
  paymentList: [],
  isDataLoading: false,
  newPaymentInput: INIT_PAYMENT,
};

export function paymentReducer(
  state: IPaymentFormState = initialState,
  action: PaymentFormActions
): IPaymentFormState {
  switch (action.type) {
    case PAYMENT_LIST_WRETCH_LOADED:
      return {
        ...state,
        newPaymentInput: {
          amount: 2500,
          date: todate.toLocaleDateString('ru-RU'),
          period: '',
          contractNumber: action.payload[0].contractNumber,
        },
      };
    case PAYMENT_LIST_WRETCH_LOADING:
      return { ...state, isDataLoading: true };
    case PAYMENT_LIST_WRETCH_FAIL:
      return { ...state, paymentList: [], isDataLoading: false };
    case CREATE_PAYMENT_WATCHER:
      return {
        ...state,
        newPaymentInput: {
          ...action.payload,
        },
        isDataLoading: false,
      };
    default:
      return state;
  }
}
