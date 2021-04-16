import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { ICoursePageState, INotificationContainerState, IUserListPage } from './state';

export interface IRootState {
    coursePage: ICoursePageState
    userListPage: IUserListPage
    notificationContainer: INotificationContainerState,
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        userListPage: userListPageReducer,
        notificationContainer: notificationContainerReducer,
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;