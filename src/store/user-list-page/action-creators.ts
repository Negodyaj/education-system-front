import { User } from "../../interfaces/User";
import { USER_LIST_WRETCH_FAIL, USER_LIST_WRETCH_LOADED, USER_LIST_WRETCH_LOADING } from "../actionTypes"

export type UserListPageActions =
    | ReturnType<typeof setUserListIsLoading>
    | ReturnType<typeof setUserListWasLoaded>
    | ReturnType<typeof setUserListFail>

export const setUserListIsLoading = () => {
    return ({
        type: USER_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}

export const setUserListWasLoaded = (users: User[]) => {
    return ({
        type: USER_LIST_WRETCH_LOADED,
        payload: users
    } as const);
}

export const setUserListFail = (error: string) => {
    return ({
        type: USER_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}