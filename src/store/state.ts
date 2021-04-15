import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";
import { Tag } from "../interfaces/Tag";

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

export interface ITagsPageState {
    tagList: Tag[],
    filterTagsList: Tag[],
    tagsFilter: string,
    isTagsModalHidden: boolean,
    isDataLoading: boolean,
}