import { User } from "../../interfaces/User";
import { UserInput } from "../../interfaces/UserInput";
import { UNSET_USER_ID_FOR_USER_PAGE } from "../../shared/consts";
import { convertUserToUserInput } from "../../shared/converters/userToUserInput";
import { convertUserToUserUpdate } from "../../shared/converters/userToUserUpdate";
import { USER_TO_EDIT_WRETCH_FAIL, USER_TO_EDIT_WRETCH_LOADED, USER_TO_EDIT_WRETCH_LOADING, USER_IS_SENDING, USER_FOR_USER_PAGE_ID, USER_TO_EDIT_ID_FOR_USER_PAGE } from "../actionTypes";
import { IUserPage } from "../state";
import { UserPageActions } from "./action-creators";

export const INIT_USER: User = {
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    login: "",
    password: "",
    phone: "",
    userPic: "",
    email: "",
    roles: []
}

const initialState: IUserPage = {
    userForUserPage: INIT_USER,
    userForUserPageId: UNSET_USER_ID_FOR_USER_PAGE,
    isReadonly: false,
    isDataLoading: true
};
export function userPageReducer(state: IUserPage = initialState, action: UserPageActions): IUserPage {
    switch (action.type) {
        case USER_TO_EDIT_ID_FOR_USER_PAGE:
            return { ...state, userForUserPageId: action.payload, isDataLoading: true }
        case USER_TO_EDIT_WRETCH_LOADING:
            return { ...state, isDataLoading: true };
        case USER_TO_EDIT_WRETCH_LOADED:
            return {
                ...state,
                userForUserPage: action.payload
                ?
                { ...convertUserToUserUpdate(action.payload) }
                :
                { ...convertUserToUserInput(INIT_USER)},
                isDataLoading: false
            };
        case USER_TO_EDIT_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
        case USER_IS_SENDING:
            return { ...state, isDataLoading: true };
        default:
            return state;
    }
}