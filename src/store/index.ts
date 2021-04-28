import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { IAppState, ICourseEditionState, ICoursePageState, IGroupInfoComponent, INotificationContainerState, IPaymentFormState, IRoleSelector, IUserListPage, IUserPage } from './state';
import { userPageReducer } from './user-page/reducers';
import { courseEditionPageReducer } from './course-edition/reducer';
import { roleSelectorReducer } from './role-selector/reducer';
import { appReducer } from './app/reducer';
import { paymentReducer } from './payment/reducer';
import { groupInfoComponentReducer } from './group-info-component/reducer';


export interface IRootState {
    coursePage: ICoursePageState;
    courseEditionPage: ICourseEditionState;
    userPage: IUserPage;
    userListPage: IUserListPage;
    roleSelector: IRoleSelector;
    app: IAppState;
    notificationContainer: INotificationContainerState;
    payment: IPaymentFormState;
    groupInfoComponent: IGroupInfoComponent
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
        payment: paymentReducer,
        groupInfoComponent: groupInfoComponentReducer
    }),
    undefined,
    applyMiddleware(...middlewares));

export default store;