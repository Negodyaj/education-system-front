import { getFromStorage, store } from "./local-storage.service";

export const getToken = () => {
    return getFromStorage('token');
}

export const setToken = (token: string) => {
    store('token', token);
}
