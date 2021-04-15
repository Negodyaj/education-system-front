import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";

export interface ICoursePageState {
    courseList: Course[],
    isDataLoading: boolean,
}

export interface INotificationContainerState {
    notifications: {
        dismissible: NotificationData[],
        nonDismissible: NotificationData[],
    }
}