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
    notifications: (response: string) => { [key in nType]: NotificationData | undefined },
    isT: <T>(data: any) => data is T;
}
export interface responseHandler {
    [url: string]: responseHandlerItem
}
export const responseHandlers: responseHandler = {
    [UserEnd]: {
        notifications: (response: string) => {
            return ({
                [nType.Error]: {
                    type: 'error',
                    text: response,
                    isDismissible: true,
                    timestamp: Date.now()
                },
                [nType.Success]: undefined
            })
        },
        isT: <userArr>(data: any): data is userArr => isUserArr(data) //дженерик не хотел принимать просто User[]
    }
}
