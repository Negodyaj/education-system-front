import { UserInput } from "../../interfaces/UserInput";
import { USER_EDIT_MODE_WAS_CLOSED, USER_TO_EDIT_WRETCH_FAIL, USER_TO_EDIT_WRETCH_LOADED, USER_TO_EDIT_WRETCH_LOADING, USER_TO_VIEW_WRETCH_FAIL, USER_TO_VIEW_WRETCH_LOADED, USER_TO_VIEW_WRETCH_LOADING, USER_IS_SENDING, USER_REGISTER_MODE_IS_ON } from "../actionTypes";
import { IUserPage } from "../state";
import { UserPageActions } from "./action-creators";

const INIT_USER_TO_REGISTER: UserInput = {
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
    userToView: undefined,
    userToEditId: undefined,
    userToEdit: undefined,
    userToRegister: INIT_USER_TO_REGISTER,
    isUserPageOpened: false,
    isDataLoading: false
};
export function userPageReducer(state: IUserPage = initialState, action: UserPageActions): IUserPage {
    switch (action.type) {
        case USER_TO_VIEW_WRETCH_LOADING:
            return { ...state, isDataLoading: true }
        case USER_TO_VIEW_WRETCH_LOADED:
            return {
                ...state,
                userToView: action.payload,
                userToEdit: undefined,
                userToRegister: undefined,
                isDataLoading: false
            };
        case USER_TO_VIEW_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
        case USER_TO_EDIT_WRETCH_LOADING:
            return { ...state, isDataLoading: true };
        case USER_TO_EDIT_WRETCH_LOADED:
            return {
                ...state,
                userToView: undefined,
                userToEdit: action.payload,
                userToRegister: undefined,
                isUserPageOpened: true,
                isDataLoading: false
            };
        case USER_TO_EDIT_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
        case USER_EDIT_MODE_WAS_CLOSED:
            return { ...state, isUserPageOpened: false };
        case USER_REGISTER_MODE_IS_ON:
            return {
                ...state,
                userToView: undefined,
                userToEdit: undefined,
                userToRegister: INIT_USER_TO_REGISTER,
                isUserPageOpened: true,
                isDataLoading: false
            }
        case USER_IS_SENDING:
            return { ...state, isDataLoading: true };
        default:
            return state;
    }
}