import { PaymentResponse } from "../../components/interfaces/PaymentResponse";


export const isPaymentResponse = (data: any): data is PaymentResponse => {
    const dataToCheck = data as PaymentResponse;
    return !!dataToCheck.contractNumber && !!dataToCheck.user.id;
}