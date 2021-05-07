import { PaymentResponse } from '../../components/interfaces/PaymentResponse';

export const isPaymentResponseArr = (data: any): data is PaymentResponse[] =>
  Array.isArray(data) && !!data[0].contractNumber; // && !!dataToCheck.user.firstName;
