import { User } from "../../interfaces/User";
import { UserDelete } from "../../interfaces/UserDelete";
import { USER_DELETING, USER_DELETING_FAIL, USER_DELETING_SUCCESS, USER_LIST_LOADING_AWAIT, USER_LIST_LOADING_FAIL, USER_LIST_LOADING_SUCCESS, USER_TO_DELETE } from "../actionTypes";


export type UserListPageActions =
    | ReturnType<typeof setUserListIsLoading>
    | ReturnType<typeof setUserListWasLoaded>
    | ReturnType<typeof setUserListFail>
    | ReturnType<typeof setUserToDelete>
    | ReturnType<typeof setUserDeleting>
    | ReturnType<typeof setUserDeletingSuccess>
    | ReturnType<typeof setUserDeletingFail>

export const setUserListIsLoading = () => {
    return ({
        type: USER_LIST_LOADING_AWAIT,
        payload: undefined
    } as const);
}
export const setUserListWasLoaded = (users: User[]) => {
    return ({
        type: USER_LIST_LOADING_SUCCESS,
        payload: users
    } as const);
}
export const setUserListFail = (error: string) => {
    return ({
        type: USER_LIST_LOADING_FAIL,
        payload: error
    } as const);
}
export const setUserToDelete = (user: User) => {
    return ({
        type: USER_TO_DELETE,
        payload: user
    } as const);
}
export const setUserDeleting = () => {
    return ({
        type: USER_DELETING,
        payload: undefined
    } as const);
}
export const setUserDeletingSuccess = (deletedUser: UserDelete) => {
    return ({
        type: USER_DELETING_SUCCESS,
        payload: deletedUser
    } as const);
}
export const setUserDeletingFail = () => {
    return ({
        type: USER_DELETING_FAIL,
        payload: undefined
    } as const);
}