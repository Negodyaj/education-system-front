import { USER_DELETING, USER_LIST_LOADING_AWAIT, USER_LIST_LOADING_FAIL, USER_LIST_LOADING_SUCCESS } from "../actionTypes";
import { IUserListPage } from "../state";
import { UserListPageActions } from "./action-creators";

const initialState: IUserListPage = {
    userList: [],
    isDataLoading: false
};
export function userListPageReducer(state: IUserListPage = initialState, action: UserListPageActions): IUserListPage {
    switch (action.type) {
        case USER_LIST_LOADING_AWAIT:
            return { ...state, isDataLoading: true }
        case USER_LIST_LOADING_SUCCESS:
            return { ...state, userList: action.payload || [], isDataLoading: false };
        case USER_LIST_LOADING_FAIL:
            return { ...state, userList: [], isDataLoading: false };
        case USER_DELETING:
            return { ...state, isDataLoading: true }
        default:
            return state;
    }
}