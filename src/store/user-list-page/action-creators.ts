import { User } from "../../components/interfaces/User";
import { ADD_MOCK_USER_TO_LIST, DELETE_MOCK_USER_FROM_LIST, REFRESH_MOCK_USER_LIST, USER_LIST_FETCH_FAIL, USER_LIST_FETCH_SUCCESS, USER_LIST_PAGE_LOADING } from "../actionTypes";

export type UserListPageActions =
    | ReturnType<typeof addItemToList>
    | ReturnType<typeof deleteItemFromList>
    | ReturnType<typeof refreshList>
    | ReturnType<typeof setComponentIsLoading>
    | ReturnType<typeof usersFetchSuccess>
    | ReturnType<typeof usersFetchFail>

export function addItemToList(item: User) {
    return {
        type: ADD_MOCK_USER_TO_LIST,
        payload: item
    } as const;
}

export function deleteItemFromList(id: number) {
    return {
        type: DELETE_MOCK_USER_FROM_LIST,
        payload: id
    } as const;
}

export function refreshList() {
    return {
        type: REFRESH_MOCK_USER_LIST,
        payload: undefined
    } as const;
}

export const setComponentIsLoading = () => {
    return {
        type: USER_LIST_PAGE_LOADING,
        payload: undefined,
    } as const;
}

export const usersFetchSuccess = (data: User[]) => {
    return {
        type: USER_LIST_FETCH_SUCCESS,
        payload: data,
    } as const;
}

export const usersFetchFail = (error: string) => {
    return {
        type: USER_LIST_FETCH_FAIL,
        payload: error,
    } as const;
}