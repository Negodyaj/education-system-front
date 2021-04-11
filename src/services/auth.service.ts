import { baseUrl } from "../shared/consts";
import { getFromStorage, store } from "./local-storage.service";
import wretch from 'wretch';

export const getToken = () => {
    return getFromStorage('token');
}

export const setToken = (token: string) => {
    store('token', token);
}

export const authenticate = (login: string, password: string) => {
    wretch(`${baseUrl}/authentication`)
        .post({ login, password })
        .json(data => {
            setToken(data.token);
            window.location.reload();
        })
}
