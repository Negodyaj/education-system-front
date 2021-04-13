import { PaymentResponse } from "../../components/interfaces/PaymentResponse";


export const isPaymentResponse = (data: any): data is PaymentResponse => {
    const dataToCheck = data as PaymentResponse;
    return !Array.isArray(dataToCheck) && !!dataToCheck.contractNumber //&& !!dataToCheck.user.firstName;
}