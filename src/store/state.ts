import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";

export interface ICoursePageState {
    courseList: Course[]
    isOpenModalCreateCourse: boolean
    isModalDelete: boolean
    isCourseDeleting: boolean
    isDataLoading: boolean
    courseForDeleteId: number
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