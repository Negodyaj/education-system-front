import { Attendance } from '../interfaces/Attendance';
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
import { Lesson } from '../interfaces/Lesson';
import { CourseInput } from '../interfaces/CourseInput';
import { INIT_HOMEWORK } from '../shared/tmp-mock-data/hw/initHomewwork';
import { LessonInput } from '../interfaces/LessonInput';
import { IUserAttendance } from '../components/group-page/lesson-list-component/modal-attendance/ModalAttendance';
import { CurrentLesson } from '../components/group-page/lesson-list-component/lesson-list-table/LessonsTableByGroup';
import { IndexedObj } from '../interfaces/IndexedObj';
import { UserPageOptions } from '../components/user-page/UserPage';
import { Material } from '../interfaces/Materials';
import { AllGroupsInCollege } from '../interfaces/AllGroupsInCollege';
import { AttemptInput } from '../interfaces/AttemptInput';
import { ChildIndex } from '../enums/ChildIndex';
import { ModalWindowSettings } from '../shared/components/modal-window/ModalWindow';
import { PaymentInput } from '../components/interfaces/PaymentInput';
import { HomeworkInput } from '../interfaces/HomeworkInput';
import { LessonUpdate } from '../interfaces/LessonUpdate';
import { ThemeInput } from '../interfaces/ThemeInput';
import { MaterialInput } from '../interfaces/MaterialInput';

import { DEFAULT_ATTEMPT } from './homework-attempt/reducer';

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
  materials: Material[];
  idThemesCourse: number[];
  isDataLoading: boolean;
  isDisplayingButtonOpenProgramCourse: boolean;
  isDisplayingButtonOpenMaterialsCourse: boolean;
  idCourse: number;
  createThemeInputModel: ThemeInput;
  createMaterialInputModel: MaterialInput;
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
  pageOptionsByRole: IndexedObj<UserPageOptions>;
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
  pageOptionsByRole: IndexedObj<HomeworkPageOptions>;
  homeworkListDefault: Homework[];
  openedItemSetsNames: string[];
}
export interface IHomeworkAppointModalState {
  groupListByTeacherId: AllGroupsInCollege[];
  groupEntities: DictionaryEntity[];
  appointFormDefaults: AppointInput;
  homeworkForAppointment: Homework;
}
export interface IHomeworkAttemptState {
  attemptList?: Attempt[];
  currentHomework?: Homework;
  currentGroup?: typeof INIT_HOMEWORK.groupsIds;
  currentAttempt?: Attempt;
  currentAuthorId: number;
  allGroupsInCollege: AllGroupsInCollege[];
  defaultAttempt: AttemptInput;
}
export interface IAddHomeworkModal {
  isDataLoading: boolean;
  defaultFormValue: HomeworkInput;
  isModalHidden: boolean;
  coursesForCloneEntities: DictionaryEntity[];
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
  userForPayment: User | undefined;
  paymentList: PaymentResponse[];
  isDataLoading: boolean;
  newPaymentInput: PaymentInput;
}

export interface ILesson {
  lessonList: Lesson[];
  isDataLoading: boolean;
  isOpenModalAttendance: boolean;
  isOpenModalAddLesson: boolean;
  isOpenModalDeleteLesson: boolean;
  currentLesson: CurrentLesson;
  arrDataToCreateAttendances: IUserAttendance[];
  createLessonInputModel: LessonInput;
  updateLessonInputModel: LessonUpdate;
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

export interface ModalWindowState {
  isVisible: boolean;
  childIndex: ChildIndex;
  modalWindowSettings: { [index: string]: ModalWindowSettings };
}
