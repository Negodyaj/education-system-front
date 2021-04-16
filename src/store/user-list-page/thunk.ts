import { Dispatch } from "redux";
import { WretcherError } from "wretch";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUser } from "../../services/type-guards/user";
import { isUserArr } from "../../services/type-guards/userArray";
import { usersUrl } from "../../shared/consts";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserListFail, setUserListIsLoading, setUserListWasLoaded } from "./action-creators";

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
