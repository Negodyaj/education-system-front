import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { setCurrentUserInStorage, setIsLoggedInInStorage } from "../../services/auth.service";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { currentUserUrl } from "../../shared/consts";
import { setIsLoggedIn } from "../app/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setCurrentUserIsLoading, setCurrentUserWasLoaded } from "./action-creator";

export const getCurrentUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentUserIsLoading());
        sendGetRequest<User>(currentUserUrl, isUser)
            .then(currentUser => {
                setCurrentUserInStorage(thunkResponseHandler(dispatch, currentUser))
                dispatch(setCurrentUserWasLoaded());
                setIsLoggedInInStorage(true)
                dispatch(setIsLoggedIn())
            })
    }
}