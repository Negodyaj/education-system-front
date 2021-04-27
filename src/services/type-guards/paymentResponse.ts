import { PaymentResponse } from "../../components/interfaces/PaymentResponse";


export const isPaymentResponse = (data: any): data is PaymentResponse => {
    return !Array.isArray(data) && !!data.contractNumber //&& !!dataToCheck.user.firstName;
}