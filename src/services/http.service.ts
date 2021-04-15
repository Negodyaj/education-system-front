import { baseUrl } from "../shared/consts";
import wretch, { WretcherError } from 'wretch';
import { getToken } from "./auth.service";
import NotificationData from "../interfaces/NotificationData";
import { responseHandlerItem } from "./response-handler/responseHandler";

export const sendGetRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .get()
    .json(data => {
      {
        return localResponseHandler<T>(data, sendN, rh);
      }
    })

    //обработка ошибок не описанных в .catcher внутри baseWretch

    .catch(error => {
      sendN(rh.notifications(error)['error']);
      return undefined
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
    .json(data => {
      return localResponseHandler<T>(data, sendN, rh);
    })
    .catch((error: WretcherError) => {
      sendN(rh.notifications(error)['error']);
      return undefined
    });
};
export const sendPutRequestNoResponse = async (
  path: string,
  body: any,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .put(body)
    .res()
};
export const sendPostRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem,
  body?: any) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .post(body || undefined)
    .json(data => {
      console.log(data);
      if (data) return localResponseHandler<T>(data, sendN, rh);
    })
    .catch((error: WretcherError) => {
      sendN(rh.notifications(error)['error']);
      return undefined
    });
};
export const sendPostRequestNoResponse = async (
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem,
  body?: any) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .post(body)
    .res()
};
export const sendDeleteRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .delete()
    .json(data => {
      return localResponseHandler<T>(data, sendN, rh);
    })
    .catch((error: WretcherError) => {
      sendN(rh.notifications(error)['error']);
      return undefined
    });
};
export const sendDeleteRequestNoResponse = async (
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .delete()
    .res()
};
const localResponseHandler = <T>(data: any, sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  if (rh.isT ? rh.isT(data) : true) {
    sendN(rh.notifications(data)['success'])
    return data as T;
  } else {
    sendN(rh.notifications({ message: 'Ошибка. Неверные данные.' } as WretcherError)['error']);
    return undefined;
  }
}
const baseWretch = (
  responsePath: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: responseHandlerItem) => {
  return wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(401, error => sendN(rh.notifications(error)['error']))
    .catcher(403, error => sendN(rh.notifications(error)['error']))
    .catcher(404, error => sendN(rh.notifications(error)['error']))
    .catcher(409, error => sendN(rh.notifications(error)['error']))
}
