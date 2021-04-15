import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";

export interface ICoursePageState {
    courseList: Course[]
    isOpenModalCreateCourse: boolean
    isModalDelete: boolean
    isCourseDelete: number
    isDataLoading: boolean
}

export interface INotificationContainerState {
    notifications: {
        dismissible: NotificationData[],
        nonDismissible: NotificationData[],
    }
}