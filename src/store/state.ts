import { Course } from "../interfaces/Courses";
import NotificationData from "../shared/interfaces/NotificationData";

export interface ICoursePageState {
    courseList: Course[],
    isDataLoading: boolean,
}

export interface INotificationContainerState {
    dismissibleNotifications: NotificationData[],
    nonDismissibleNotifications: NotificationData[],
    sendNotification: (notification: NotificationData) => void,
    deleteNotification: (dismissedNotification: NotificationData) => void
}