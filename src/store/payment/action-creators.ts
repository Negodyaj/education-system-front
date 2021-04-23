import { User } from "../../interfaces/User";
import { PAYMENT_FORM_CLOSE, PAYMENT_FORM_VISIBLE, PAYMENT_SEND_SUCCESS } from "../actionTypes";

export type PaymentFormActions =
    | ReturnType<typeof setPaymentSendSuccess>
    | ReturnType<typeof setPaymentFormOpen>
    | ReturnType<typeof setPaymentFormCLose>
 
export const setPaymentSendSuccess = () => {
    return ({
        type: PAYMENT_SEND_SUCCESS,
        payload: undefined
    } as const);
}

export const setPaymentFormOpen = (user: User) => {
    return ({
        type: PAYMENT_FORM_VISIBLE,
        payload: user
    } as const);
}

export const setPaymentFormCLose =()=>{
    return({
        type: PAYMENT_FORM_CLOSE,
        payload: undefined
    } as const)
}
