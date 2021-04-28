import { USER_DELETING, USER_DELETING_SUCCESS, USER_LIST_LOADING_AWAIT, USER_LIST_LOADING_FAIL, USER_LIST_LOADING_SUCCESS, USER_OPEN_LIST_ITEM, USER_TO_DELETE } from "../actionTypes";
import { IUserListPage } from "../state";
import { INIT_USER } from "../user-page/reducers";
import { UserListPageActions } from "./action-creators";

const initialState: IUserListPage = {
    userList: [],
    userToDelete: INIT_USER,
    openedItemId: 0,
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
        case USER_TO_DELETE:
            return { ...state, userToDelete: action.payload }
        case USER_OPEN_LIST_ITEM:
            return { ...state, openedItemId: action.payload }
        default:
            return state;
    }
}