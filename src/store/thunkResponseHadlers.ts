import { Dispatch } from "redux";
import { WRONG_DATA_STATUS } from "../services/http.service";
import { makeNotification } from "../shared/helpers/notificationHelpers";
import { pushNotification } from "./notifications/action-creators";

export const thunkResponseHandler = (dispatch: Dispatch, response: any) => {
    if (!!response.status && !response.login) {
        dispatch(pushNotification(makeNotification('error', response.status === WRONG_DATA_STATUS ? 'неверные данные' : response.status )))
    } else {
       return response;
    }
}