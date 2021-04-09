import { baseUrl } from "../shared/consts";
import wretch from 'wretch';
import { getToken } from "./auth.service";

export const sendGetRequest = async <T>(path: string, typeGuard: (data: any) => data is T) => {
  return await baseWretch
    .url(path)
    .get()
    .json(data => {
        if (typeGuard(data))
            return data as T;
        else
            // send error notification
            return undefined;
    });

};
export const sendPutRequest = async <T>(path: string, body: any) => {
  return await baseWretch
    .url(path)
    .put(body)
    .json(data => data as T);
};

export const sendPostRequest = async <T>(path: string, body: any) => {
  return await baseWretch
    .url(path)
    .post(body)
    .json(data => data as T);
};

export const sendDeleteRequest = async <T>(path: string, body?: any) => {
  return await baseWretch
    .url(path)
    .delete(body)
    .json(data => data as T);
};

const baseWretch = wretch()
  .url(baseUrl + '/')
  .auth(`Bearer ${getToken()}`)
  .catcher(404, error => console.log(error))
  .catcher(403, error => console.log(error))
  .catcher(409, error => console.log(error))

