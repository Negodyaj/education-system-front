import { Dispatch } from "redux";
import { setComponentIsLoading, usersFetchFail, usersFetchSuccess } from "./action-creators";

const url = 'url';

export const getUsers = () => {
    return (dispatch: Dispatch) => {
        dispatch(setComponentIsLoading());
        fetch(url)
            .then(res => res.json())
            .then(users => {
                dispatch(usersFetchSuccess(users));
                //dispatch(showSuccessNotification(users));
            })
            .catch(error => {
                dispatch(usersFetchFail(error));
            })
    }
}