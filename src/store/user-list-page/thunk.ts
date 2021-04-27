import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { UserDelete } from "../../interfaces/UserDelete";
import { sendDeleteRequest, sendGetRequest } from "../../services/http.service";
import { isUserArr } from "../../services/type-guards/userArray";
import { isUserDelete } from "../../services/type-guards/userDelete";
import { userListUrl, usersUrl } from "../../shared/consts";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserDeleting, setUserDeletingFail, setUserDeletingSuccess, setUserListFail, setUserListIsLoading, setUserListWasLoaded } from "./action-creators";

export const getUsers = () => {
    return (dispatch: Dispatch) => {
        dispatch(setUserListIsLoading());
        sendGetRequest<User[]>(usersUrl, isUserArr)
            .then(users => {
                dispatch(setUserListWasLoaded(thunkResponseHandler(dispatch, users)));
            })
            .catch(error => dispatch(setUserListFail(error)));
    }
}
export const deleteUserRequest = (userToDeleteId: string, history: any) => {
    console.log(userToDeleteId)
    return (dispatch: Dispatch) => {
        dispatch(setUserDeleting());
        sendDeleteRequest<UserDelete>(`${usersUrl}/${userToDeleteId}`, isUserDelete)
            .then(response => {
                let deletedUser = thunkResponseHandler(dispatch, response);
                if (deletedUser) {
                    deletedUser = { ...deletedUser } as UserDelete;
                    dispatch(setUserDeletingSuccess(deletedUser));
                    dispatch(pushNotification(makeNotification('success', `Пользователь ${response.firstName} ${response.lastName} успешно удалён`)))
                    history.push(`/${userListUrl}`);
                } else {
                    dispatch(setUserDeletingFail())
                }
            })
    }
}
