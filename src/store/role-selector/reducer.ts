import { CURRENT_USER_WRETCH_LOADED, CURRENT_USER_WRETCH_LOADING } from "../actionTypes";
import { IRoleSelector } from "../state";
import { RoleSelectorActions } from "./action-creator";

const initialState: IRoleSelector = {
    currentUser: undefined,
    isDataLoading: false
};

export function roleSelectorReducer(state: IRoleSelector = initialState, action: RoleSelectorActions) {
    switch (action.type) {
        case CURRENT_USER_WRETCH_LOADING:
            return { ...state, isDataLoading: true };
        case CURRENT_USER_WRETCH_LOADED:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}