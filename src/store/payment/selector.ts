import { IRootState } from '..';

export const userForPayment = (state: IRootState) =>
  state.payment.userForPayment;

export const newPaymentInput = (state: IRootState) =>
  state.payment.newPaymentInput;
