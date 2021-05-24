import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

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
  IAddHomeworkModal,
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
  ModalWindowState,
} from './state';
import { homeworkAppointModalReducer } from './homework-page/homework-appoint-modal/reducer';
import { homeworkAttemptReducer } from './homework-attempt/reducer';
import { attendanceReducer } from './group-page/attendance/reducer';
import { addHomeworkModalReducer } from './homework-page/add-homework-modal/reducer';
import { rootSaga } from './root-saga';
import { modalWindowReducer } from './modal-window/reducer';

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
  modalWindow: ModalWindowState;
  addHomeWorkModal: IAddHomeworkModal;
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

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
    homeworkAppointModal: homeworkAppointModalReducer,
    homeworkAttempt: homeworkAttemptReducer,
    modalWindow: modalWindowReducer,
  }),
  undefined,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
