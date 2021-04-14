import { ADD_MOCK_USER_TO_LIST, DELETE_MOCK_USER_FROM_LIST, REFRESH_MOCK_USER_LIST, USER_LIST_FETCH_FAIL, USER_LIST_FETCH_SUCCESS, USER_LIST_PAGE_LOADING } from "../actionTypes";
import { IUserListPageState } from "../state";
import { UserListPageActions } from "./action-creators";

const initialState: IUserListPageState = {
    userList: [{ lastName: 'Vasya', firstName: 'Petya' }],
    isDataLoading: false
};
export function userListPageReducer(
    state: IUserListPageState = initialState, 
    action: UserListPageActions): IUserListPageState {
        switch (action.type) {
            case ADD_MOCK_USER_TO_LIST:
                return { ...state, userList: [...state.userList, action.payload] };
            case DELETE_MOCK_USER_FROM_LIST:
                return { ...state, userList: state.userList.filter(x => x.id !== action.payload) };
            case REFRESH_MOCK_USER_LIST:
                return { ...state };
            case USER_LIST_PAGE_LOADING:
                return { ...state, isDataLoading: true };
            case USER_LIST_FETCH_SUCCESS:
                return { ...state, isDataLoading: false, userList: action.payload };
            case USER_LIST_FETCH_FAIL:
                return { ...state, isDataLoading: false, userList: [] };
            default:
                return state;
        }
}
