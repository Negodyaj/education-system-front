import { Payment } from "../../components/interfaces/Payment";
import { PaymentInput } from "../../components/interfaces/PaymentInput";

const initPaymentInput: PaymentInput = {
    amount: "",
    date: "",
    period: "",
    contractNumber: ""
}

export const convertPaymentToPaymentInput = (UpdatedPayment: Payment) => {
    Object.keys(initPaymentInput).map(k => {
        initPaymentInput[k as keyof PaymentInput] = (UpdatedPayment as any)[k]
    })
    return initPaymentInput;
}