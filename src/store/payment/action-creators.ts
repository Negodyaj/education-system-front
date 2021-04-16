import { PAYMENT_FORM_VISIBLE, PAYMENT_SEND_SUCCESS } from "../actionTypes";

export type PaymentFormActions =
    | ReturnType<typeof setPaymentSendSuccess>
    | ReturnType<typeof setPaymentFormOpen>

export const setPaymentSendSuccess = () => {
    return ({
        type: PAYMENT_SEND_SUCCESS,
        payload: undefined
    } as const);
}

export const setPaymentFormOpen = () => {
    return ({
        type: PAYMENT_FORM_VISIBLE,
        payload: undefined
    } as const);
}
