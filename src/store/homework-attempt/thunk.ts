import { Dispatch } from "redux"
import { Attempt } from "../../interfaces/Attempt"
import { sendGetRequest } from "../../services/http.service"
import { isAttemptArr } from "../../services/type-guards/attemptsArr"
import { homeworkUrl } from "../../shared/consts"
import { thunkResponseHandler } from "../thunkResponseHadlers"
import { attemptListLoadingSuccess } from "./action-creators"

export const getAttemptListToCheck = (hwId:string) => {
    return (dispatch:Dispatch) => {
        sendGetRequest<Attempt[]>(`${homeworkUrl}/${hwId}/attempts`, isAttemptArr)
        .then(response => {
            const attempts = thunkResponseHandler(dispatch, response);
            attempts && dispatch(attemptListLoadingSuccess(attempts))
        })
    }
}