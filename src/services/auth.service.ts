import { baseUrl } from "../shared/consts";
import { getFromStorage, store } from "./local-storage.service";
import wretch from 'wretch';

export const getToken = () => {
    // return getFromStorage('token');
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0J_RgNC10L_QvtC00LDQstCw0YLQtdC70YwiLCLQnNC10YLQvtC00LjRgdGCIl0sIm5iZiI6MTYxOTA4NDU5MywiZXhwIjoxNjE5MjU3MzkzLCJpc3MiOiJFZHVjYXRpb25TeXN0ZW0uQXBpIiwiYXVkIjoiRGV2RWR1Y2F0aW9uIn0.e04zr17FGwBHuiVVURpWPNz_ydeh0hqH3htY-SAGL5M"
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
