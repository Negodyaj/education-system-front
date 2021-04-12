import { baseUrl } from "../shared/consts";
import wretch, { WretcherError } from 'wretch';
import { getToken } from "./auth.service";
import NotificationData from "../shared/interfaces/NotificationData";
import { ResponseHandlerItem } from "./response-handler/responseHandler";

export const sendGetRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: ResponseHandlerItem) => {
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
  rh: ResponseHandlerItem) => {
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
export const sendPostRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: ResponseHandlerItem,
  body?: any) => {
  return await baseWretch(path, sendN, rh)
    .url(path)
    .post(body)
    .json(data => {
      console.log('jopa');
      if (data) return localResponseHandler<T>(data, sendN, rh);
    })
    .catch((error: WretcherError) => {
      sendN(rh.notifications(error)['error']);
      return undefined
    });
};
export const sendDeleteRequest = async <T>(
  path: string,
  sendN: (n: NotificationData | undefined) => void,
  rh: ResponseHandlerItem) => {
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
const localResponseHandler = <T>(data: any, sendN: (n: NotificationData | undefined) => void,
  rh: ResponseHandlerItem) => {
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
  responseHandler: ResponseHandlerItem) => {
  return wretch()
    .url(baseUrl + '/')
    .auth(`Bearer ${getToken()}`)
    .catcher(401, error => sendN(responseHandler.notifications(error)['error']))
    .catcher(403, error => sendN(responseHandler.notifications(error)['error']))
    .catcher(404, error => sendN(responseHandler.notifications(error)['error']))
    .catcher(409, error => {
      console.log(responseHandler.notifications(error));
      sendN(responseHandler.notifications(error)['error'])})
}
