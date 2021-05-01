import { getCurrentUserFromStorage } from "../../services/auth.service";
import { CURRENT_USER_ROLE_ID_SELECTED, CURRENT_USER_WAS_LOADED, CURRENT_USER_IS_LOADING, TOGGLE_ROLE_SELECTOR, CURRENT_USER_UNSET } from "../actionTypes";
import { IRoleSelector } from "../state";
import { RoleSelectorActions } from "./action-creator";

const initialState: IRoleSelector = {
    isTurnedOn: false,
    //currentUser: undefined,
    //currentUserRoleId: 0,
    currentUser: getCurrentUserFromStorage(),
    currentUserRoleId: getCurrentUserFromStorage() ? getCurrentUserFromStorage().roles[0] : 0,
    isDataLoading: false
};

export function roleSelectorReducer(state: IRoleSelector = initialState, action: RoleSelectorActions): IRoleSelector {
    switch (action.type) {
        case CURRENT_USER_IS_LOADING:
            return { ...state, isDataLoading: true };
        case CURRENT_USER_WAS_LOADED:
            return {
                ...state,
                currentUser: getCurrentUserFromStorage(),
                currentUserRoleId: getCurrentUserFromStorage().roles[0],
                isTurnedOn: getCurrentUserFromStorage().roles.length === 1 ? false : true,
                isDataLoading: false
            };
        case CURRENT_USER_ROLE_ID_SELECTED:
            return {
                ...state,
                currentUserRoleId: action.payload
            };
        case TOGGLE_ROLE_SELECTOR:
            return { ...state, isTurnedOn: state.currentUser ? !state.isTurnedOn : false };
        case CURRENT_USER_UNSET:
            return { ...initialState }
        default:
            return state;
    }
}