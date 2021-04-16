import { Dispatch } from "redux";
import { WretcherError } from "wretch";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUserArr } from "../../services/type-guards/userArray";
import { usersUrl } from "../../shared/consts";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setUserListFail, setUserListIsLoading, setUserListWasLoaded } from "./action-creators";

export const getUsers = () => {
    return (dispatch: Dispatch) => {
        dispatch(setUserListIsLoading());
        sendGetRequest<User[]>(usersUrl+'/1', isUserArr)
            .then(users => {
                dispatch(setUserListWasLoaded(thunkResponseHandler(dispatch, users)));
            })
            .catch(error => dispatch(setUserListFail(error)));
    }
}
