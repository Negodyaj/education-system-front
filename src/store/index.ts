import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { userPageReducer } from './user-page/reducers';
import { courseEditionPageReducer } from './course-edition/reducer';
import { roleSelectorReducer } from './role-selector/reducer';
import { appReducer } from './app/reducer';
import { tagsPageReducer } from './tags-page/reducer';
import { paymentReducer } from './payment/reducer';
import { lessonByGroupReducer } from './group-page/lesson/reducer';
import { groupInfoComponentReducer } from './group-info-component/reducer';
import { homeworkPageReducer } from './homework-page/reducer';
import {
  IAppState,
  IAttendance,
  ICourseEditionState,
  ICoursePageState,
  IGroupInfoComponent,
  IHomeworkAppointModalState,
  IHomeworkAttemptState,
  IHomeworkPageState,
  ILesson,
  INotificationContainerState,
  IPaymentFormState,
  IRoleSelector,
  ITagsPageState,
  IUserListPage,
  IUserPage,
} from './state';
import { homeworkAppointModalReducer } from './homework-page/homework-appoint-modal/reducer';
import { homeworkAttemptReducer } from './homework-attempt/reducer';
import { attendanceReducer } from './group-page/attendance/reducer';

export interface IRootState {
  tagsPage: ITagsPageState;
  coursePage: ICoursePageState;
  courseEditionPage: ICourseEditionState;
  userPage: IUserPage;
  userListPage: IUserListPage;
  roleSelector: IRoleSelector;
  app: IAppState;
  notificationContainer: INotificationContainerState;
  payment: IPaymentFormState;
  groupInfoComponent: IGroupInfoComponent;
  homeworkPage: IHomeworkPageState;
  homeworkAppointModal: IHomeworkAppointModalState;
  homeworkAttempt: IHomeworkAttemptState;
  attendanceList: IAttendance;
  lessonByGroup: ILesson;
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    coursePage: coursePageReducer,
    courseEditionPage: courseEditionPageReducer,
    userListPage: userListPageReducer,
    userPage: userPageReducer,
    roleSelector: roleSelectorReducer,
    app: appReducer,
    notificationContainer: notificationContainerReducer,
    tagsPage: tagsPageReducer,
    payment: paymentReducer,
    groupInfoComponent: groupInfoComponentReducer,
    lessonByGroup: lessonByGroupReducer,
    attendanceList: attendanceReducer,
    homeworkPage: homeworkPageReducer,
    homeworkAppointModal: homeworkAppointModalReducer,
    homeworkAttempt: homeworkAttemptReducer,
  }),
  undefined,
  applyMiddleware(...middlewares)
);

export default store;
