import { baseUrl } from "../shared/consts";
import wretch, { WretcherError } from 'wretch';
import { getToken } from "./auth.service";
import { Dispatch } from "redux";
import { setUserListWasLoaded } from "../store/user-list-page/action-creators";
import { pushNotification } from "../store/notifications/action-creators";
import { makeNotification } from "../shared/helpers/notificationHelpers";

export const sendGetRequest = async <T>(path: string, isT: ((data: any) => data is T) | undefined) => {
  return await baseWretch()
    .url(path)
    .get()
    .json(data => localResponseHandler<T>(data, isT))
    .catch(error => error);
};
export const sendPutRequest = async <T>(path: string, isT: ((data: any) => data is T) | undefined,
  body: any
) => {
  return await baseWretch()
    .url(path)
    .put(body)
    .json(data => localResponseHandler<T>(data, isT))
    .catch(error => error);
};
export const sendPutRequestNoResponse = async (path: string, body: any) => {
  return await baseWretch()
    .url(path)
    .put(body)
    .res(response => response)
};
export const sendPostRequest = async <T>(path: string, isT: ((data: any) => data is T) | undefined, body?: any) => {
  return await baseWretch()
    .url(path)
    .post(body || undefined)
    .json(data => localResponseHandler<T>(data, isT))
    .catch(error => error);
};
export const sendPostRequestNoResponse = async (path: string, body?: any) => {
  return await baseWretch()
    .url(path)
    .post(body)
    .res(response => response)
};
export const sendDeleteRequest = async <T>(path: string, isT: ((data: any) => data is T) | undefined) => {
  return await baseWretch()
    .url(path)
    .delete()
    .json(data => localResponseHandler<T>(data, isT))
    .catch(error => error)

};
export const sendDeleteRequestNoResponse = async (path: string) => {
  return await baseWretch()
    .url(path)
    .delete()
    .res(response => { return response })
};
export const WRONG_DATA_STATUS = -1;
const localResponseHandler = <T>(data: any, isT: ((data: any) => data is T) | undefined) => {
  if (isT ? isT(data) : true) {
    return data as T;
  } else {
    return {
      status: WRONG_DATA_STATUS,
      response: {},
      text: 'Неверные данные'
    } as WretcherError
  }
}
const baseWretch = () => {
  return wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(401, error => error)
    .catcher(403, error => error)
    .catcher(404, error => error)
    .catcher(409, error => error)
}
