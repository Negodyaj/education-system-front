import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { usersUrl } from "../../shared/consts";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserListFail } from "../user-list-page/action-creators";
import { setUserToEditFail, setUserToEditIsLoading, setUserToEditWasLoaded, setUserToViewIsLoading, setUserToViewWasLoaded } from "./action-creators";

export const getUserToViewById = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setUserToViewIsLoading());
        sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
            .then(user => {
                dispatch(setUserToViewWasLoaded(thunkResponseHandler(dispatch, user)));
            })
            .catch(error => dispatch(setUserListFail(error)));
    }
}

export const getUserToEditById = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setUserToEditIsLoading());
        sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
            .then(user => {
                dispatch(setUserToEditWasLoaded(thunkResponseHandler(dispatch, user)));
            })
            .catch(error => dispatch(setUserToEditFail(error)));
    }
}

