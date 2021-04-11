import { User } from "../../components/interfaces/User";
import { UserDelete } from "../../components/interfaces/UserDelete";
import { UserRegisterResponse } from "../../components/interfaces/UserRegisterResponse";
import { Course } from "../../shared/courses/Courses";
import { CourseCourseIdEnd, CourseEnd, CourseIdThemeIdEnd, CourseThemesEnd, UserEnd, UserRegisterEnd, UserUserDeleteIdEnd, UserUserUpdateIdEnd } from "../../shared/endpointConsts";
import { makeErrorText, makeNotification } from "../../shared/helpers/noficationHelpers";
import NotificationData from "../../shared/interfaces/NotificationData";
import { Themes } from "../../shared/themes/Themes";
import { isCourse } from "../type-guards/course";
import { isCourseArr } from "../type-guards/courseArr";
import { isThemesArr } from "../type-guards/themesArr";
import { isUser } from "../type-guards/user";
import { isUserArr } from "../type-guards/userArray";
import { isUserDelete } from "../type-guards/userDelete";
import { isUserRegisterResponse } from "../type-guards/userRegisterResponse";

export enum nType {
    Error = 'error',
    Success = 'success'
}
export interface responseHandlerItem {
    readonly notifications: (response?: any) => { [key in nType]: NotificationData | undefined },
    readonly isT: ((data: any) => data is any) | undefined;
}
export interface responseHandler {
    readonly [url: string]: responseHandlerItem
}
export const responseHandlers: responseHandler = {
    [UserEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is User[] => isUserArr(data)
    },
    [UserUserUpdateIdEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, (
                    response ? 'пользователь ' + (response as User).firstName + ' ' + (response as User).lastName + ' успешно изменён' : ''
                )
                )
            })
        },
        isT: (data: any): data is User => isUser(data)
    },
    [UserRegisterEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Пользователь ' + (response as UserRegisterResponse).firstName + ' ' + (response as UserRegisterResponse).lastName + ' зарегистрирован'))
            })
        },
        isT: (data: any): data is UserRegisterResponse => isUserRegisterResponse(data)
    },
    [UserUserDeleteIdEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Пользователь ' + (response as UserRegisterResponse).firstName + ' ' + (response as UserRegisterResponse).lastName + ' удалён'))
            })
        },
        isT: (data: any): data is UserDelete => isUserDelete(data),
    },
    [CourseEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: undefined
            }
            )
        },
        isT: (data: any): data is Course[] => isCourseArr(data)
    },
    [CourseCourseIdEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is Course => isCourse(data)
    },
    [CourseThemesEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is Themes[] => isThemesArr(data)
    },
    [CourseIdThemeIdEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Курс успешно изменен'))
            })
        },
        isT: undefined
    }
}