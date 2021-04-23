import { getIsLoggedInFormStorage } from "../../services/auth.service";
import { CURRENT_USER_LOGGED_IN, CURRENT_USER_LOGGED_OUT } from "../actionTypes";
import { IAppState } from "../state";
import { AppActions } from "./action-creators"

const initialState: IAppState = {
    isLoggedIn: false
};

export function appReducer(state: IAppState = initialState, action: AppActions) {
    switch (action.type) {
        case CURRENT_USER_LOGGED_OUT:
            return { ...state, isLoggedIn: false };
        case CURRENT_USER_LOGGED_IN:
            return { ...state, isLoggedIn: true };
        default:
            return state
    }
}