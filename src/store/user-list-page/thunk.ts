import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isUserArr } from "../../services/type-guards/userArray";
import { usersUrl } from "../../shared/consts";
import { setUserListFail, setUserListIsLoading, setUserListWasLoaded } from "./action-creators";

export const getUsers = () => {
    return (dispatch: Dispatch) => {
        dispatch(setUserListIsLoading());
        sendGetRequest<User[]>(usersUrl, isUserArr)
            .then(courses => dispatch(setUserListWasLoaded(courses)))
            .catch(error => dispatch(setUserListFail(error)))
    }
}