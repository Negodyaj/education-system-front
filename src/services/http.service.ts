import { baseUrl } from "../shared/consts";
import wretch from 'wretch';
import { getToken } from "./auth.service";

export const sendGetRequest = async (path: string) => {
    return await baseWretch
        .url(path)
        .get()
        .json(data => Object.values(data))
};
const baseWretch = wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(404, error => console.log(error))
    .catcher(403, error => console.log(error))
    .catcher(409, error => console.log(error))