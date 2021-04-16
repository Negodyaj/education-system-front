import { User } from "../../interfaces/User";
import { CURRENT_USER_WRETCH_LOADED, CURRENT_USER_WRETCH_LOADING } from "../actionTypes"

export type RoleSelectorActions =
    | ReturnType<typeof setCurrentUserIsLoading>
    | ReturnType<typeof setCurrentUserWasLoaded>

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