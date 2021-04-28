import { DataNewCourse } from "../components/courses-page/NewCourse";
import { Course } from "../interfaces/Courses";
import { Group } from "../interfaces/Group";
import NotificationData from "../interfaces/NotificationData";
import { Themes } from "../interfaces/Themes";
import { User } from "../interfaces/User";
import { UserInput } from "../interfaces/UserInput";
import { UserUpdate } from "../interfaces/UserUpdate";

export interface ICoursePageState {
    courseList: Course[]
    isOpenModalCreateCourse: boolean
    isModalDelete: boolean
    isCourseDeleting: boolean
    isDataLoading: boolean
    courseForDeleteId: number
    isNameNewCourseFilled: boolean
    isDescriptionNewCourseFilled: boolean
    isDurationNewCourseFilled: boolean
    dataNewCourse: DataNewCourse
}

export interface ICourseEditionState {
    course: Course;
    themes: Themes[];
    idThemesCourse: number[];
    isDataLoading: boolean;
    isDisplayingButtonOpenProgramCourse: boolean;
    isDisplayingButtonOpenMaterialsCourse: boolean;
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

export interface IGroupInfoComponent{
    groupToView: Group | undefined;
    isDataLoading: boolean;
}