import { CURRENT_USER_ROLE_ID_SELECTED } from "../actionTypes";
import { IAppState } from "../state";
import { AppActions } from "./action-creators"

const initialState: IAppState = {
    currentUserRoleId: 0
};

export function appReducer (state: IAppState = initialState, action: AppActions) {
    switch (action.type){
    case CURRENT_USER_ROLE_ID_SELECTED:
        return { ...state, currentUserRoleId:action.payload};
    default:
        return state
}
}