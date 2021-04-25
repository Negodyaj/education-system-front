import { PAYMENT_FORM_CLOSE, PAYMENT_FORM_VISIBLE, PAYMENT_LIST_WRETCH_FAIL, PAYMENT_LIST_WRETCH_LOADED, PAYMENT_LIST_WRETCH_LOADING, PAYMENT_SEND_SUCCESS } from "../actionTypes";
import { IPaymentFormState } from "../state";
import { PaymentFormActions } from "./action-creators";

const initialState: IPaymentFormState = {
    formVisibility: "",
    userForPayment: undefined,
    paymentList: [],
    isDataLoading: false
};
export function paymentReducer(state: IPaymentFormState = initialState, action: PaymentFormActions): IPaymentFormState {
    switch (action.type) {
        case PAYMENT_SEND_SUCCESS:
            return { ...state, formVisibility: '' };
        case PAYMENT_FORM_VISIBLE:
            return { ...state, formVisibility: 'visible', userForPayment: action.payload };
        case PAYMENT_FORM_CLOSE:
            return { ...state, formVisibility: '' };
        case PAYMENT_LIST_WRETCH_LOADING:
            return { ...state, isDataLoading: true }
        case PAYMENT_LIST_WRETCH_LOADED:
            return { ...state, paymentList: action.payload, isDataLoading: false };
        case PAYMENT_LIST_WRETCH_FAIL:
            return { ...state, paymentList: [], isDataLoading: false };
        default: return state;
    }
}