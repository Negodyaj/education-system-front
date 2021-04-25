import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { UserDelete } from "../../interfaces/UserDelete";
import { sendDeleteRequest, sendGetRequest } from "../../services/http.service";
import { isUserArr } from "../../services/type-guards/userArray";
import { isUserDelete } from "../../services/type-guards/userDelete";
import { usersUrl } from "../../shared/consts";
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
                const deletedUser = thunkResponseHandler(dispatch, response);
                if (deletedUser) {
                    dispatch(setUserDeletingSuccess(deletedUser));
                    history.push(`/user-list`);
                } else {
                    dispatch(setUserDeletingFail())
                }
            })
    }
}
