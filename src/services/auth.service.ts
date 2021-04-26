import { getFromStorage, removeFromStorage, store } from "./local-storage.service";

export const getToken = () => {
    return getFromStorage('token');
}
export const setToken = (token: string) => {
    store('token', token);
}
export const unsetToken = () => {
    removeFromStorage ('token');
}
