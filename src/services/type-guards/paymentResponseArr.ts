import { PaymentResponse } from "../../components/interfaces/PaymentResponse";


export const isPaymentResponseArr = (data: any): data is PaymentResponse => {
    const dataToCheck = data as PaymentResponse;
    return Array.isArray(dataToCheck) && !!dataToCheck[0].contractNumber //&& !!dataToCheck.user.firstName;
}