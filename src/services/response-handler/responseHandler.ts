import { WretcherError, WretcherResponse } from "wretch";
import { User } from "../../components/interfaces/User";
import { Course } from "../../shared/courses/Courses";
import { CourseEnd, UserEnd, UserUserIdEnd } from "../../shared/endpointConsts";
import { makeErrorText, makeNotification } from "../../shared/helpers/noficationHelpers";
import NotificationData from "../../shared/interfaces/NotificationData";
import { isCourseArr } from "../type-guards/courseArr";
import { isUser } from "../type-guards/user";
import { isUserArr } from "../type-guards/userArray";

export enum nType {
    Error = 'error',
    Success = 'success'
}
export interface responseHandlerItem {
    notifications: (response?: any) => { [key in nType]: NotificationData | undefined },
    isT: (data: any) => data is any;
}
export interface responseHandler {
    [url: string]: responseHandlerItem
}
const standardErrorNotification = (error?: any) => {
    return {
        type: 'error',
        text: (error as WretcherError)?.status?.toString() || '' + ' ' + (error as WretcherError)?.message,//приведение безопасно, так как кэтчер ошибки в http.service не может передать сюда ничего кроме WretcherError
        isDismissible: true,
        timestamp: Date.now()
    }
}
export const responseHandlers: responseHandler = {
    [UserEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: standardErrorNotification(response),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is User[] => isUserArr(data)
    },
    [UserUserIdEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: standardErrorNotification(response),
                [nType.Success]: {
                    type: 'success',
                    text: (
                        response
                            ?
                            'пользователь ' + (response as User).firstName + ' ' + (response as User).lastName + ' успешно '
                            +
                            (response.isDeleted
                                ?
                                'удалён' : 'изменён') : ''),
                    isDismissible: true,
                    timestamp: Date.now(),
                    autoDismissTimeout: 6000
                }
            })
        },
        isT: (data: any): data is User => isUser(data)
    },
    [CourseEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]:makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]:undefined
            }
            )
        },
        isT: (data: any): data is Course[] => isCourseArr(data)
    }
}