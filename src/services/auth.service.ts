import { baseUrl } from "../shared/consts";
import { getFromStorage, store } from "./local-storage.service";

export const getToken = () => {
    return getFromStorage('token');
}

export const setToken = (token: string) => {
    store('token', token);
}

export const authenticate = (login: string, password: string) => {
    fetch(`${baseUrl}/authentication`, {
        method: 'POST',
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password})
    })
        .then(response => response.json())
        .then(data => {
            setToken(data.token);
            window.location.reload();
        })    
}