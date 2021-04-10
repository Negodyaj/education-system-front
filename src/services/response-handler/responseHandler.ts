import { WretcherError, WretcherResponse } from "wretch";
import { User } from "../../components/interfaces/User";
import { baseUrl } from "../../shared/consts";
import { UserEnd } from "../../shared/endpointConsts";
import NotificationData from "../../shared/interfaces/NotificationData";
import { isUserArr } from "../type-guards/user";

enum nType {
    Error = 'error',
    Success = 'success'
}
export interface responseHandlerItem {
    notifications: (response?: string) => { [key in nType]: NotificationData | undefined },
    isT: (data: any) => data is any;
}
export interface responseHandler {
    [url: string]: responseHandlerItem
}
const standardErrorNotification = (text?: string) => {
    return {
    type: 'error',
    text: text || 'ошибка',
    isDismissible: true,
    timestamp: Date.now()}
}
export const responseHandlers: responseHandler = {
    [UserEnd]: {
        notifications: (response?: string) => {
            return ({
                [nType.Error]: standardErrorNotification(response),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is User[] => isUserArr(data)
    }
}
