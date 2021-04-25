import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";
import { User } from "../interfaces/User";
import { UserInput } from "../interfaces/UserInput";
import { UserUpdate } from "../interfaces/UserUpdate";

export interface ICoursePageState {
    courseList: Course[],
    isDataLoading: boolean,
}

export interface IUserListPage {
    userList: User[];
    isDataLoading: boolean;
}

export interface IUserPage {
    userForUserPage: UserInput,
    userForUserPageId: number;
    isDataLoading: boolean;
}

export interface IRoleSelector {
    isTurnedOn: boolean;
    currentUser: User | undefined;
    currentUserRoleId: number;
    isDataLoading: boolean;
}

export interface IAppState {
    isLoggedIn: boolean;
}

export interface INotificationContainerState {
    notifications: {
        dismissible: NotificationData[],
        nonDismissible: NotificationData[],
    }
}

export interface IModalDeleteCourse {
    courseForDeleteId: number
}

export interface IPaymentFormState {
    formVisibility: string;
    userForPayment: User | undefined
    paymentList: PaymentResponse[],
    isDataLoading: boolean
}