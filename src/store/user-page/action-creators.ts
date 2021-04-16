import { NumericLiteral } from "typescript";
import { User } from "../../interfaces/User";
import { UserUpdate } from "../../interfaces/UserUpdate";
import { USER_EDIT_MODE_WAS_CLOSED, USER_IS_SENDING, USER_REGISTER_MODE_IS_ON, USER_SENDING_SUCCESS, USER_TO_EDIT_WRETCH_FAIL, USER_TO_EDIT_WRETCH_LOADED, USER_TO_EDIT_WRETCH_LOADING, USER_TO_VIEW_WRETCH_FAIL, USER_TO_VIEW_WRETCH_LOADED, USER_TO_VIEW_WRETCH_LOADING } from "../actionTypes";

export type UserPageActions =
    | ReturnType<typeof setUserToViewIsLoading>
    | ReturnType<typeof setUserToViewWasLoaded>
    | ReturnType<typeof setUserToViewFailed>
    | ReturnType<typeof setUserToEditIsLoading>
    | ReturnType<typeof setUserToEditWasLoaded>
    | ReturnType<typeof setUserToEditFail>
    | ReturnType<typeof quitEditMode>
    | ReturnType<typeof setUserIsSending>
    | ReturnType<typeof setUserRegisterMode>

export const setUserToViewIsLoading = () => {
    return ({
        type: USER_TO_VIEW_WRETCH_LOADING,
        payload: undefined
    } as const);
}
export const setUserToViewWasLoaded = (user: User) => {
    return ({
        type: USER_TO_VIEW_WRETCH_LOADED,
        payload: user
    } as const);
}
export const setUserToViewFailed = (error: string) => {
    return ({
        type: USER_TO_VIEW_WRETCH_FAIL,
        payload: error
    } as const);
}
export const setUserToEditIsLoading = () => {
    return ({
        type: USER_TO_EDIT_WRETCH_LOADING,
        payload: undefined
    } as const);
}
export const setUserToEditWasLoaded = (user: UserUpdate) => {
    return ({
        type: USER_TO_EDIT_WRETCH_LOADED,
        payload: user
    } as const);
}
export const setUserToEditFail = (error: string) => {
    return ({
        type: USER_TO_EDIT_WRETCH_FAIL,
        payload: error
    } as const);
}
export const quitEditMode = () => {
    return ({
        type: USER_EDIT_MODE_WAS_CLOSED,
        payload: undefined
    } as const);
}
export const setUserIsSending =() => {
    return ({
        type: USER_IS_SENDING,
        payload: undefined
    } as const);
}
export const setUserUpdateResponse = (userResponse:User) => {
    return ({
        type: USER_SENDING_SUCCESS,
        payload: userResponse
    } as const);
}
export const setUserRegisterMode = () => {
    return ({
        type: USER_REGISTER_MODE_IS_ON,
        payload: undefined
    } as const);
}