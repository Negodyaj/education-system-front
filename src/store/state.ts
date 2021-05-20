import { Course } from '../interfaces/Courses';
import { Group } from '../interfaces/Group';
import NotificationData from '../interfaces/NotificationData';
import { Tag } from '../interfaces/Tag';
import { Themes } from '../interfaces/Themes';
import { User } from '../interfaces/User';
import { UserInput } from '../interfaces/UserInput';
import { PaymentResponse } from '../components/interfaces/PaymentResponse';
import { Homework } from '../interfaces/Homework';
import { HomeworkPageOptions } from '../components/homework-page/HomeworkPageCore';
import { DictionaryEntity } from '../interfaces/DictionaryEntity';
import { AppointInput } from '../interfaces/AppointInput';
import { Attempt } from '../interfaces/Attempt';
import { Attendance } from '../interfaces/Attendance';
import { Lesson } from '../interfaces/Lesson';
import { CourseInput } from '../interfaces/CourseInput';
import { INIT_HOMEWORK } from '../shared/tmp-mock-data/hw/initHomewwork';
import { LessonInput } from '../interfaces/LessonInput';
import { IUserAttendance } from '../components/group-page/lesson-list-component/ModalAttendance';

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
}
export interface IHomeworkPageState {
  pageOptionsByRole: { [role: string]: HomeworkPageOptions };
  homeworkListDefault: Homework[];
  openedItemSetsNames: string[];
}
export interface IHomeworkAppointModalState {
  groupListByTeacherId: Group[];
  groupEntities: DictionaryEntity[];
  appointFormDefaults: AppointInput;
}
export interface IHomeworkAttemptState {
  attemptList?: Attempt[];
  currentHomework?: Homework;
  currentGroup?: typeof INIT_HOMEWORK.groupsIds;
  currentAttempt?: Attempt;
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
  isOpenModalAttendance: boolean;
  isOpenModalAddLesson: boolean;
  isOpenModalDeleteLesson: boolean;
  idSelectedLesson: number;
  arrDataToCreateAttendances: IUserAttendance[];
  createLessonInputModel: LessonInput;
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
