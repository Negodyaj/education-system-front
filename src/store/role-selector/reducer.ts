import { UNSELECTED_ROLE } from "../../shared/consts";
import { CURRENT_USER_ROLE_ID_SELECTED, CURRENT_USER_WAS_LOADED, CURRENT_USER_IS_LOADING, TOGGLE_ROLE_SELECTOR, ROLE_SELECTOR_PENDING } from "../actionTypes";
import { IRoleSelector } from "../state";
import { RoleSelectorActions } from "./action-creator";

const initialState: IRoleSelector = {
    isTurnedOn: false,
    currentUser: undefined,
    currentUserRoleId: UNSELECTED_ROLE,
    isDataLoading: false
};

export function roleSelectorReducer(state: IRoleSelector = initialState, action: RoleSelectorActions): IRoleSelector {
    switch (action.type) {
        case CURRENT_USER_IS_LOADING:
            return { ...state, isDataLoading: true };
        case CURRENT_USER_WAS_LOADED:
            return {
                ...state,
                currentUser: action.payload,
                currentUserRoleId: action.payload.roles[0],
                isTurnedOn: action.payload.roles.length === 1 ? false : true,
                isDataLoading: false
            };
        case CURRENT_USER_ROLE_ID_SELECTED:
            return {
                ...state,
                currentUserRoleId: action.payload,
                isTurnedOn: false
            };
        case TOGGLE_ROLE_SELECTOR:
            return { ...state, isTurnedOn: !state.currentUser ? (state.isTurnedOn ? false: true) : false};
        default:
            return state;
    }
}