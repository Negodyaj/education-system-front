import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { ICourseEditionState, ICoursePageState, INotificationContainerState, IUserListPage, IUserPage } from './state';
import { userPageReducer } from './user-page/reducers';
import { courseEditionPageReducer } from './course-edition/reducer';

export interface IRootState {
    coursePage: ICoursePageState;
    courseEditionPage: ICourseEditionState;
    userPage: IUserPage;
    userListPage: IUserListPage;
    notificationContainer: INotificationContainerState;
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        courseEditionPage: courseEditionPageReducer,
        userListPage: userListPageReducer,
        userPage: userPageReducer,
        notificationContainer: notificationContainerReducer,
    }),
    undefined,
    applyMiddleware(...middlewares));

export default store;