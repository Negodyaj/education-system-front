import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest, sendPutRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { usersUrl } from "../../shared/consts";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserIsSending, setUserToEditFail, setUserToEditIsLoading, setUserToEditWasLoaded, setUserUpdateResponse } from "./action-creators";

export const getUserToEditById = (userId?: string) => {
    return (dispatch: Dispatch) => {
        if (userId) {
            dispatch(setUserToEditIsLoading());
            sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
                .then(user => {
                    dispatch(setUserToEditWasLoaded(thunkResponseHandler(dispatch, user)));
                })
                .catch(error => dispatch(setUserToEditFail(error)));
        } else {
            dispatch(setUserToEditWasLoaded())
        }

    }
}
export const sendUser = (user: User, userId: number, history:any) => {
    return (dispatch: Dispatch) => {
        dispatch(setUserIsSending());
        sendPutRequest<User>(`${usersUrl}/${userId}`, isUser, user)
            .then(userUpdateResponse => {
                let response = thunkResponseHandler(dispatch, userUpdateResponse);
                if (response) {
                    dispatch(pushNotification(makeNotification('success', `Пользователь ${(response as User).firstName} ${(response as User).lastName} успешно изменён`)))
                    dispatch(setUserUpdateResponse());
                    history.push('/user-list')
                }
            })
    }


}