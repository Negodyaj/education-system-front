import { baseUrl } from "../shared/consts";
import { getFromStorage, store } from "./local-storage.service";
import wretch from 'wretch';

export const getToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0KHRgtGD0LTQtdC90YIiLCLQn9GA0LXQv9C-0LTQsNCy0LDRgtC10LvRjCIsItCc0LXQvdC10LTQttC10YAiXSwibmJmIjoxNjE3OTU4OTA5LCJleHAiOjE2MTgxMzE3MDksImlzcyI6IkVkdWNhdGlvblN5c3RlbS5BcGkiLCJhdWQiOiJEZXZFZHVjYXRpb24ifQ.fQVGDbFURagVFn_KUIjAvHN6e1D-KuGZsWy-yrU5xcs';
    
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
