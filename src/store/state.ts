import { Course } from "../interfaces/Courses";
import NotificationData from "../shared/interfaces/NotificationData";

export interface ICoursePageState {
    courseList: Course[]
    isOpenModalCreateCourse: boolean
    isModalDelete: boolean
    isCourseDelete: number
    isDataLoading: boolean
}

export interface INotificationContainerState {
    dismissibleNotifications: NotificationData[],
    nonDismissibleNotifications: NotificationData[],
    sendNotification: (notification: NotificationData) => void,
    deleteNotification: (dismissedNotification: NotificationData) => void
}