import { User } from "../../components/interfaces/User";
import { UserDelete } from "../../components/interfaces/UserDelete";
import { UserRegisterResponse } from "../../components/interfaces/UserRegisterResponse";
import { Course } from "../../shared/courses/Courses";
import { CourseAddEnd, CourseCourseIdEnd, CourseDeleteEnd, CourseEnd, CourseIdThemeIdAddEnd, CourseIdThemeIdDeleteEnd, CourseThemesEnd, PaymentAddEnd, PaymentEnd, UserEnd, UserRegisterEnd, UserUserDeleteIdEnd, UserUserUpdateIdEnd } from "../../shared/endpointConsts";
import { makeErrorText, makeNotification } from "../../shared/helpers/noficationHelpers";
import NotificationData from "../../shared/interfaces/NotificationData";
import { Themes } from "../../shared/themes/Themes";
import { isCourse } from "../type-guards/course";
import { isCourseArr } from "../type-guards/courseArr";
import { isCourseDelete } from "../type-guards/courseDelete";
import { isThemesArr } from "../type-guards/themesArr";
import { isThemeDelete } from "../type-guards/themeDelete";
import { isUser } from "../type-guards/user";
import { isUserArr } from "../type-guards/userArray";
import { isUserDelete } from "../type-guards/userDelete";
import { isUserRegisterResponse } from "../type-guards/userRegisterResponse";
import { PaymentResponse } from "../../components/interfaces/PaymentResponse";
import { isPaymentResponseArr } from "../type-guards/paymentResponseArr";
import { isPaymentResponse } from "../type-guards/paymentResponse";

export enum nType {
    Error = 'error',
    Success = 'success'
}
export interface ResponseHandlerItem {
    readonly notifications: (response?: any) => { [key in nType]: NotificationData | undefined },
    readonly isT: ((data: any) => data is any) | undefined;
}
export interface responseHandler {
    readonly [url: string]: ResponseHandlerItem
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
    [CourseAddEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Курс успешно добавлен'))
            })
        },
        isT: (data: any): data is Course => isCourse(data)
    },
    [CourseDeleteEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Курс ' + (response as Course).name + ' успешно удалён'))
            })
        },
        isT: (data: any): data is Course => isCourseDelete(data)
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
    [CourseIdThemeIdAddEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Тема добавлена'))
            })
        },
        isT: undefined
    },
    [CourseIdThemeIdDeleteEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Тема ' + (response as Themes).name + ' удалена'))
            })
        },
        isT: (data: any): data is Themes => isThemeDelete(data)
    },
    [PaymentAddEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: makeNotification(nType.Success, ('Оплата пользователю ' 
                + (response as PaymentResponse)?.user?.firstName 
                + (response as PaymentResponse)?.user?.lastName 
                + ' назначена'))
            })
        },
        isT: (data: any): data is PaymentResponse => isPaymentResponse(data)
    },
    [PaymentEnd]: {
        notifications: (response?: any) => {
            return ({
                [nType.Error]: makeNotification(nType.Error, makeErrorText(response)),
                [nType.Success]: undefined
            })
        },
        isT: (data: any): data is PaymentResponse[] => isPaymentResponseArr(data)
    }

}