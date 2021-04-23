import { Course } from "../interfaces/Courses";
import { Group } from "../interfaces/Group";
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
    userToView: User | undefined;
    userToEdit: UserUpdate | undefined;
    userToEditId: number | undefined;
    userToRegister: UserInput | undefined;
    isEditModeOn: boolean;
    isDataLoading: boolean;
}

export interface INotificationContainerState {
    notifications: {
        dismissible: NotificationData[],
        nonDismissible: NotificationData[],
    }
}

export interface IGroupPage{
    groupToView: Group | undefined;
    isDataLoading: boolean;
}