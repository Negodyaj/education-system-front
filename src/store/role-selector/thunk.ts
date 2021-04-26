import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { currentUserUrl } from "../../shared/consts";
import { setIsLoggedIn } from "../app/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { toggleRoleSelector, setCurrentUserIsLoading, setCurrentUserWasLoaded } from "./action-creator";

const getCurrentUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentUserIsLoading());
        sendGetRequest<User>(currentUserUrl, isUser)
        .then(currentUser => {
                dispatch(setCurrentUserWasLoaded(thunkResponseHandler(dispatch, currentUser)));
                dispatch(setIsLoggedIn())
                dispatch(toggleRoleSelector())
            })
    }
}