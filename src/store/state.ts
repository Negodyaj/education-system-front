import { Attendance } from '../interfaces/Attendance';
import { Course } from '../interfaces/Courses';
import { Group } from '../interfaces/Group';
import { Lesson } from '../interfaces/Lesson';
import NotificationData from '../interfaces/NotificationData';
import { Tag } from '../interfaces/Tag';
import { Themes } from '../interfaces/Themes';
import { User } from '../interfaces/User';
import { UserInput } from '../interfaces/UserInput';
import { UserUpdate } from '../interfaces/UserUpdate';
import { PaymentResponse } from '../components/interfaces/PaymentResponse';
import { CourseInput } from '../interfaces/CourseInput';
import { HomeworkPageOptions } from "../components/homework-page/HomeworkPageCore";
import { HomeworkInput } from "../interfaces/HomeworkInput";
import { Homework } from "../interfaces/Homework";

export interface IAppState {
    isLoggedIn: boolean;
    loadersCount: number;
}
export interface ICoursePageState {
  courseList: Course[];
  isOpenModalCreateCourse: boolean;
  isModalDelete: boolean;
  isCourseDeleting: boolean;
  isDataLoading: boolean;
  createCourseInputModel: CourseInput;
  idCourseForDelete: number;
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
  userToDelete: User;
  openedItemId: number;
  isDataLoading: boolean;
}

export interface IUserPage {
  userForUserPage: UserInput;
  userForUserPageId: number;
  isReadonly: boolean;
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
  loadersCount: number;
export type HomeworksByCourse = { [itemsSetName: string]: Homework[] }
export type HomeworksByGroup = { [itemsSetName: string]: Homework[] }
export interface IHomeworkPageState {
    pageOptionsByRole: { [role: string]: HomeworkPageOptions };
    homeworkListDefault: Homework[];
    openedItemSetsNames: string[];
}
export interface IAddHomeworkModal {
    isDataLoading: boolean,
    defaultFormValue: HomeworkInput,
    isModalHidden: boolean,
}

export interface INotificationContainerState {
  notifications: {
    dismissible: NotificationData[];
    nonDismissible: NotificationData[];
  };
}

export interface ITagsPageState {
  tagList: Tag[];
  filterTagsList: Tag[];
  isTagsModalHidden: boolean;
  isDataLoading: boolean;
}

export interface IModalDeleteCourse {
  courseForDeleteId: number;
}

export interface IPaymentFormState {
  formVisibility: string;
  userForPayment: User | undefined;
  paymentList: PaymentResponse[];
  isDataLoading: boolean;
}

export interface ILesson {
  lessonList: Lesson[];
  isDataLoading: boolean;
}

export interface IGroupInfoComponent {
  groupToView: Group;
  isDataLoading: boolean;
  studentsGroup: User[];
}

export interface IAttendance {
  attendanceList: Attendance[];
  studentsByGroup: User[];
  isDataLoading: boolean;
}
