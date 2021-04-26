import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { tagsPageReducer } from './tags-page/reducer';
import { IAppState, ICoursePageState, INotificationContainerState, IRoleSelector, IUserListPage, IUserPage } from './state';
import { userPageReducer } from './user-page/reducers';
import { roleSelectorReducer } from './role-selector/reducer';
import { appReducer } from './app/reducer';

export interface IRootState {
    tagsPage: ITagsPageState
    coursePage: ICoursePageState;
    userPage: IUserPage;
    userListPage: IUserListPage;
    roleSelector: IRoleSelector;
    app: IAppState;
    notificationContainer: INotificationContainerState;
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        userListPage: userListPageReducer,
        userPage: userPageReducer,
        roleSelector: roleSelectorReducer,
        app: appReducer,
        notificationContainer: notificationContainerReducer,
        tagsPage: tagsPageReducer
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;