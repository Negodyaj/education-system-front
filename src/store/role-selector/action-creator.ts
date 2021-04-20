import { User } from "../../interfaces/User";
import { CURRENT_USER_ROLE_ID_SELECTED, CURRENT_USER_WAS_LOADED, CURRENT_USER_IS_LOADING, TOGGLE_ROLE_SELECTOR, ROLE_SELECTOR_PENDING, CURRENT_USER_UNSET } from "../actionTypes"

export type RoleSelectorActions =
    | ReturnType<typeof setCurrentUserIsLoading>
    | ReturnType<typeof setCurrentUserWasLoaded>
    | ReturnType<typeof setCurrentUserRoleId>
    | ReturnType<typeof toggleRoleSelector>
    | ReturnType<typeof unsetCurrentUser>

export const setCurrentUserIsLoading = () => {
    return ({
        type: CURRENT_USER_IS_LOADING,
        payload: true
    } as const);
}
export const setCurrentUserWasLoaded = (currentUser: User) => {
    return ({
        type: CURRENT_USER_WAS_LOADED,
        payload: currentUser
    } as const);
}
export const setCurrentUserRoleId = (roleId: number) => {
    return ({
        type: CURRENT_USER_ROLE_ID_SELECTED,
        payload: roleId
    } as const);
}
export const unsetCurrentUser = () => {
    return ({
        type: CURRENT_USER_UNSET,
        payload: undefined
    } as const);
}
export const toggleRoleSelector = () => {
    return ({
        type: TOGGLE_ROLE_SELECTOR,
    } as const);
}