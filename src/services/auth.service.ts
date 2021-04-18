import { baseUrl } from "../shared/consts";
import { getFromStorage, store } from "./local-storage.service";
import wretch from 'wretch';
import { Dispatch } from "redux";
import { openRoleSelector } from "../store/role-selector/action-creator";

export const getToken = () => {
    return getFromStorage('token');
}

export const setToken = (token: string) => {
    store('token', token);
}

export const authenticate = (login: string, password: string, dispatch: Dispatch) => {
    wretch(`${baseUrl}/authentication`)
        .post({ login, password })
        .json(data => {
            setToken(data.token);
            dispatch(openRoleSelector())
            window.location.reload();
        })
}
