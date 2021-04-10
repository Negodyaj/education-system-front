import { baseUrl } from "../shared/consts";
import wretch from 'wretch';
import { getToken } from "./auth.service";
import NotificationData from "../shared/interfaces/NotificationData";
import { responseHandlerItem } from "./response-handler/responseHandler";

export const sendGetRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {

  return await baseWretch(path, sendN, rh)
    .url(path)
    .get()
    .json(data => {
      if (rh.isT(data)) {
        sendN(rh.notifications()['success'])
        return data as T;
      } else {
        sendN(rh.notifications()['error']);
        return undefined;
      }
    });

};
export const sendPutRequest = async <T>(
  path: string,
  body: any,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .put(body)
    .json(data => data as T);
};

export const sendPostRequest = async <T>(
  path: string,
  body: any,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .post(body)
    .json(data => data as T);
};

export const sendDeleteRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .delete()
    .json(data => data as T);
};

const baseWretch = (
  responsePath: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(404, error => sendN(rh.notifications(error.status.toString())['error']))
    .catcher(403, error => console.log(error))
    .catcher(409, error => console.log(error))
}

