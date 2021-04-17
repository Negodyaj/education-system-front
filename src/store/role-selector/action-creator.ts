import { User } from "../../interfaces/User";
import { CLOSE_ROLE_SELECTOR, CURRENT_USER_ROLE_ID_SELECTED, CURRENT_USER_WRETCH_LOADED, CURRENT_USER_WRETCH_LOADING, OPEN_ROLE_SELECTOR } from "../actionTypes"

export type RoleSelectorActions =
    | ReturnType<typeof setCurrentUserIsLoading>
    | ReturnType<typeof setCurrentUserWasLoaded>
    | ReturnType<typeof setCurrentUserRoleId>
    | ReturnType<typeof openRoleSelector>
    | ReturnType<typeof closeRoleSelector>

export const setCurrentUserIsLoading = () => {
    return ({
        type: CURRENT_USER_WRETCH_LOADING,
        payload: true
    } as const);
}
export const setCurrentUserWasLoaded = (currentUser: User) => {
    return ({
        type: CURRENT_USER_WRETCH_LOADED,
        payload: currentUser
    } as const);
}
export const setCurrentUserRoleId = (roleId: number) => {
    return ({
        type: CURRENT_USER_ROLE_ID_SELECTED,
        payload: roleId
    } as const);
}
export const openRoleSelector = () => {
    return ({
        type: OPEN_ROLE_SELECTOR,
    } as const);
}
export const closeRoleSelector = () => {
    return ({
        type: CLOSE_ROLE_SELECTOR,
    } as const);
}