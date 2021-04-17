import { UserInput } from "../../interfaces/UserInput";
import { USER_TO_EDIT_WRETCH_FAIL, USER_TO_EDIT_WRETCH_LOADED, USER_TO_EDIT_WRETCH_LOADING, USER_TO_VIEW_WRETCH_FAIL, USER_TO_VIEW_WRETCH_LOADED, USER_TO_VIEW_WRETCH_LOADING } from "../actionTypes";
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
    isEditModeOn: false,
    isDataLoading: false
};
export function userPageReducer(state: IUserPage = initialState, action: UserPageActions): IUserPage {
    switch (action.type) {
        case USER_TO_VIEW_WRETCH_LOADING:
            return { ...state, isDataLoading: true }
        case USER_TO_VIEW_WRETCH_LOADED:
            return { ...state, userToView: action.payload, isDataLoading: false };
        case USER_TO_VIEW_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
        case USER_TO_EDIT_WRETCH_LOADING:
            return { ...state, isDataLoading: true };
        case USER_TO_EDIT_WRETCH_LOADED:
            return { ...state, userToEdit: action.payload, isEditModeOn: true, isDataLoading: false };
        case USER_TO_EDIT_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
        default:
            return state;
    }
}