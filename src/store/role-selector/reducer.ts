import { UNSELECTED_ROLE } from "../../shared/consts";
import { CLOSE_ROLE_SELECTOR, CURRENT_USER_ROLE_ID_SELECTED, CURRENT_USER_WRETCH_LOADED, CURRENT_USER_WRETCH_LOADING, OPEN_ROLE_SELECTOR, ROLE_SELECTOR_PENDING } from "../actionTypes";
import { IRoleSelector } from "../state";
import { RoleSelectorActions } from "./action-creator";

const initialState: IRoleSelector = {
    mode: "pending",
    currentUser: undefined,
    currentUserRoleId: UNSELECTED_ROLE,
    continueButtonVisibility: "hidden",
    isDataLoading: false
};

export function roleSelectorReducer(state: IRoleSelector = initialState, action: RoleSelectorActions): IRoleSelector {
    switch (action.type) {
        case CURRENT_USER_WRETCH_LOADING:
            return { ...state, isDataLoading: true };
        case CURRENT_USER_WRETCH_LOADED:
            return {
                ...state,
                currentUser: action.payload,
                currentUserRoleId: state.currentUser?.roles ? (state.currentUser?.roles.length === 1 ? state.currentUser?.roles[0] : UNSELECTED_ROLE) : UNSELECTED_ROLE,
                mode: state.currentUser?.roles ? (state.currentUser?.roles.length === 1 ? "turnedOff" : "turnedOn") : "pending"
            };
        case CURRENT_USER_ROLE_ID_SELECTED:
            return {
                ...state,
                continueButtonVisibility: action.payload === UNSELECTED_ROLE ? "hidden" : "visible",
                currentUserRoleId: action.payload
            };
        case OPEN_ROLE_SELECTOR:
            return { ...state, mode: "turnedOn" };
        case CLOSE_ROLE_SELECTOR:
            return { ...state, mode: "turnedOff" };
        case ROLE_SELECTOR_PENDING:
            return { ...state, mode: "pending" };
        default:
            return state;
    }
}