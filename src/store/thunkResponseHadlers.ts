import { Dispatch } from "redux";
import { WretcherError } from "wretch";
import { WRONG_DATA_STATUS } from "../services/http.service";
import { makeNotification } from "../shared/helpers/notificationHelpers";
import { pushNotification } from "./notifications/action-creators";

const ERROR_MESSAGE = JSON.stringify({message:"Ошибка"})

export const thunkResponseHandler = (dispatch: Dispatch, response: any) => {
    if (!!response.status && !!response.text) {
        let error = { ...response } as WretcherError;
        dispatch(
            pushNotification(
                makeNotification(
                    'error', error.status === WRONG_DATA_STATUS
                    ?
                    'неверные данные'
                    :
                    `${error.status} ${JSON.parse(error.text || ERROR_MESSAGE).Message}`
                )
            )
        );
        return undefined;
    } else {

        return response;
    }
}