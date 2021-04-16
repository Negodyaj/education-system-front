import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { usersUrl } from "../../shared/consts";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserListFail } from "../user-list-page/action-creators";
import { setCurrentUserIsLoading, setCurrentUserWasLoaded } from "./action-creator";

export const getCurrentUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentUserIsLoading());
        sendGetRequest<User>(usersUrl, isUser)
            .then(currentUser => {
                dispatch(setCurrentUserWasLoaded(thunkResponseHandler(dispatch, currentUser)));
            })
    }
}