import { baseUrl } from "../shared/consts";
import wretch from 'wretch';
import { getToken } from "./auth.service";

export const sendGetRequest = async (path: string) => {
    return await baseWretch
        .url(path)
        .get()
        .json(data => responseHandler(data));

};
export const sendPutRequest = async (path: string, body?: any) => {
    return await baseWretch
        .url(path)
        .put(body)
        .json(data => responseHandler(data));

};
const responseHandler = (response: any): any[] | any => {
    let result = Object.values(response);
    if (result.length > 1) {
        return result;
    } else {
        return result[0];
    }
}
const baseWretch = wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(404, error => console.log(error))
    .catcher(403, error => console.log(error))
    .catcher(409, error => console.log(error))