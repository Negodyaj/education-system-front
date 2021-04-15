import { USER_LIST_WRETCH_FAIL, USER_LIST_WRETCH_LOADED, USER_LIST_WRETCH_LOADING } from "../actionTypes";
import { IUserListPage } from "../state";
import { UserListPageActions } from "./action-creators";

const initialState: IUserListPage = {
    userList: [],
    isDataLoading: false
};
export function userListPageReducer(state: IUserListPage = initialState, action: UserListPageActions): IUserListPage {
    switch (action.type) {
        case USER_LIST_WRETCH_LOADING:
            return { ...state, isDataLoading: true}
        case USER_LIST_WRETCH_LOADED:
            return { ...state, userList: action.payload, isDataLoading: false };
        case USER_LIST_WRETCH_FAIL:
            return { ...state, userList: [], isDataLoading: false };
        default:
            return state;
    }
}