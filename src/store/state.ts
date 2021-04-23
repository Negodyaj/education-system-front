import { DataNewCourse } from "../components/courses-page/NewCourse";
import { Course } from "../interfaces/Courses";
import NotificationData from "../interfaces/NotificationData";
import { User } from "../interfaces/User";
import { UserInput } from "../interfaces/UserInput";
import { UserUpdate } from "../interfaces/UserUpdate";

export interface ICoursePageState {
    courseList: Course[]
    isOpenModalCreateCourse: boolean
    isModalDelete: boolean
    isCourseDeleting: boolean
    isDataLoading: boolean
    isNameNewCourseFilled: boolean
    isDescriptionNewCourseFilled: boolean
    isDurationNewCourseFilled: boolean
    createCourseInputModel: DataNewCourse
    idCourseForDelete: number
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

export interface IModalDeleteCourse {
    courseForDeleteId: number
}