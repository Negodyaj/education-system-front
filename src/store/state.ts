import { Course } from "../interfaces/Courses";
import { Tag } from "../interfaces/Tag";
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

export interface ITagsPageState {
    tagList: Tag[],
    tagsFilter: string,
    isTagsModalHidden: boolean,
}