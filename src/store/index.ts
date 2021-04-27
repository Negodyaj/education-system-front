import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { IAppState, ICoursePageState, IGroupInfoComponent, INotificationContainerState,IRoleSelector, IUserListPage, IUserPage } from './state';
import { userPageReducer } from './user-page/reducers';
import { roleSelectorReducer } from './role-selector/reducer';
import { appReducer } from './app/reducer';
import { groupInfoComponentReducer } from './group-info-component/reducer';


export interface IRootState {
    coursePage: ICoursePageState;
    userPage: IUserPage;
    userListPage: IUserListPage;
    roleSelector: IRoleSelector;
    app: IAppState;
    notificationContainer: INotificationContainerState;
    groupInfoComponent: IGroupInfoComponent
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
        groupInfoComponent: groupInfoComponentReducer,
    }),
    undefined,
    applyMiddleware(...middlewares));

export default store;