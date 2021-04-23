import { Dispatch } from "redux";
import { Group } from "../../interfaces/Group";
import { sendGetRequest } from "../../services/http.service";
import { isGroup } from "../../services/type-guards/group";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { setGroupToViewFailed, setGroupToViewIsLoading, setGroupToViewWasLoaded } from "./action-creaters";

export const getGroupToViewById = (groupId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setGroupToViewIsLoading());
        sendGetRequest<Group>(`group/${groupId}`, isGroup)
            .then(group => {
                dispatch(setGroupToViewWasLoaded(thunkResponseHandler(dispatch, group)));
            })
            .catch(error => dispatch(setGroupToViewFailed(error)));
    }
}