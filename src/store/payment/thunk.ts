// export const getUserToViewById = (userId: number) => {
//     return (dispatch: Dispatch) => {
//         dispatch(setUserToViewIsLoading());
//         sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
//             .then(user => {
//                 dispatch(setUserToViewWasLoaded(thunkResponseHandler(dispatch, user)));
//             })
//             .catch(error => dispatch(setUserListFail(error)));
//     }
// }

import { Dispatch } from "redux"
import { PaymentInput } from "../../components/interfaces/PaymentInput";
import { PaymentResponse } from "../../components/interfaces/PaymentResponse";
import { User } from "../../interfaces/User";
import { sendPostRequest } from "../../services/http.service";
import { isPaymentResponse } from "../../services/type-guards/paymentResponse";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setPaymentSendSuccess } from "./action-creators";

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