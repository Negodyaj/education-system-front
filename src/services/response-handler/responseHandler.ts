import { baseUrl } from "../../shared/consts";
import { UserEnd } from "../../shared/endpointConsts";
import NotificationData from "../../shared/interfaces/NotificationData";
import { isUser, typeGuarders } from "../type-guards/user";

enum nType {
    Error = 'error',
    Success = 'success'
}
export interface responseHandlerItem {
    notifications: () => { [key in nType]: NotificationData | undefined },
    typeGuarder: typeGuarders;
}
export interface responseHandler {
    [url: string]: responseHandlerItem
}
export const responseHandlers: responseHandler = {
    [UserEnd]: {
        notifications: () => {
            return ({
                [nType.Error]: {
                    type: 'error',
                    text: 'страница не найдена',
                    isDismissible: true,
                    timestamp: Date.now()
                },
                [nType.Success]: undefined
            })
        },
        typeGuarder: isUser
    }
}
