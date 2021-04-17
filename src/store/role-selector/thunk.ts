import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { currentUserUrl } from "../../shared/consts";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { openRoleSelector, setCurrentUserIsLoading, setCurrentUserWasLoaded } from "./action-creator";

export const getCurrentUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentUserIsLoading());
        sendGetRequest<User>(currentUserUrl, isUser)
            .then(currentUser => {
                dispatch(setCurrentUserWasLoaded(thunkResponseHandler(dispatch, currentUser)));
            })
    }
}