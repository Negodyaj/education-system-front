import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";
import { User } from "../interfaces/User";

export interface ICoursePageState {
    courseList: Course[],
    isDataLoading: boolean,
}

export interface IUserListPage {
    userList: User[],
    isDataLoading: boolean
}

export interface INotificationContainerState {
    notifications: {
        dismissible: NotificationData[],
        nonDismissible: NotificationData[],
    }
}