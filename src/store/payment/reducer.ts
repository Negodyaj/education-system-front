import { PAYMENT_FORM_CLOSE, PAYMENT_FORM_VISIBLE, PAYMENT_SEND_SUCCESS } from "../actionTypes";
import { IPaymentFormState } from "../state";
import { PaymentFormActions } from "./action-creators";

const initialState: IPaymentFormState = {
    formVisibility: "",
    userForPayment: undefined
};
export function paymentReducer(state: IPaymentFormState = initialState, action: PaymentFormActions): IPaymentFormState {
    switch (action.type) {
        case PAYMENT_SEND_SUCCESS:
            return { ...state, formVisibility: '' };
        case PAYMENT_FORM_VISIBLE:
            return { ...state, formVisibility: 'visible', userForPayment: action.payload};
        case PAYMENT_FORM_CLOSE:
            return {...state, formVisibility: '' };
        default: return state;
    }
}