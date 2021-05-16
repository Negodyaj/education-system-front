import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import {
  IAddHomeworkModal,
  IAppState,
  IAttendance,
  ICourseEditionState,
  ICoursePageState,
  IGroupInfoComponent,
  IHomeworkPageState,
  ILesson,
  INotificationContainerState,
  IPaymentFormState,
  IRoleSelector,
  ITagsPageState,
  IUserListPage,
  IUserPage,
} from './state';
import { userPageReducer } from './user-page/reducers';
import { courseEditionPageReducer } from './course-edition/reducer';
import { roleSelectorReducer } from './role-selector/reducer';
import { appReducer } from './app/reducer';
import { tagsPageReducer } from './tags-page/reducer';
import { groupInfoComponentReducer } from './group-info-component/reducer';
import { attendanceReducer } from './group-page/attendance/reducer';
import { addHomeworkModalReducer } from './homework-page/add-homework-modal/reducer';
import { homeworkPageReducer } from './homework-page/reducer';
import { lessonByGroupReducer } from './group-page/lesson/reducer';
import { paymentReducer } from './payment/reducer';

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
  lessonByGroup: ILesson;
  groupInfoComponent: IGroupInfoComponent;
  attendanceList: IAttendance;
  addHomeWorkModal: IAddHomeworkModal;
  homeworkPage: IHomeworkPageState;
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
    addHomeWorkModal: addHomeworkModalReducer,
    homeworkPage: homeworkPageReducer,
  }),
  undefined,
  applyMiddleware(...middlewares)
);

export default store;
