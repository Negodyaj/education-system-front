import { Dispatch } from "redux"
import { Payment } from "../../components/interfaces/Payment";
import { PaymentInput } from "../../components/interfaces/PaymentInput";
import { PaymentResponse } from "../../components/interfaces/PaymentResponse";
import { User } from "../../interfaces/User";
import { sendGetRequest, sendPostRequest } from "../../services/http.service";
import { isPaymentResponse } from "../../services/type-guards/paymentResponse";
import { isPaymentResponseArr } from "../../services/type-guards/paymentResponseArr";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setPaymentListFail, setPaymentListIsLoading, setPaymentListWasLoaded, setPaymentSendSuccess } from "./action-creators";

export const sendPayment =(userForPayment: User | undefined, newPayment: PaymentInput)=>{
    return (dispatch: Dispatch) => {
        sendPostRequest<PaymentResponse>(`User/${userForPayment?.id}/payment`, isPaymentResponse, newPayment)
            .then(response =>{
                dispatch(setPaymentSendSuccess());
                const r: PaymentResponse = thunkResponseHandler(dispatch, response);
                r && dispatch(pushNotification(makeNotification('success', 
                `Оплата пользователю ${r.user?.firstName} ${r.user?.lastName} успешно назначена`)))
            });
    }
}

export const getPayment = (userId: number |undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(setPaymentListIsLoading());
        sendGetRequest<PaymentResponse[]>(`${userId}/payment`, isPaymentResponseArr)
            .then(payment => dispatch(setPaymentListWasLoaded(payment)))
            .catch(error => dispatch(setPaymentListFail(error)))
    }
}