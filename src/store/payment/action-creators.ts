import { User } from "../../interfaces/User";
import { PAYMENT_FORM_CLOSE, PAYMENT_FORM_VISIBLE, PAYMENT_LIST_WRETCH_FAIL, PAYMENT_LIST_WRETCH_LOADED, PAYMENT_LIST_WRETCH_LOADING, PAYMENT_SEND_SUCCESS } from "../actionTypes";

export type PaymentFormActions =
    | ReturnType<typeof setPaymentSendSuccess>
    | ReturnType<typeof setPaymentFormOpen>
    | ReturnType<typeof setPaymentFormCLose>
    | ReturnType<typeof setPaymentListIsLoading>
    | ReturnType<typeof setPaymentListWasLoaded>
    | ReturnType<typeof setPaymentListFail>
 
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

export const setPaymentListIsLoading = () => {
    return ({
        type: PAYMENT_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}

export const setPaymentListWasLoaded = (payment: PaymentResponse[]) => {
    return ({
        type: PAYMENT_LIST_WRETCH_LOADED,
        payload: payment
    } as const);
}

export const setPaymentListFail = (error: string) => {
    return ({
        type: PAYMENT_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}