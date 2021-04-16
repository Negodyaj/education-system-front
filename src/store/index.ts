import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { userListPageReducer } from './user-list-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { ICoursePageState, INotificationContainerState, IPaymentFormState, IUserListPage, IUserPage } from './state';
import { userPageReducer } from './user-page/reducers';
import { paymentReducer } from './payment/reducer';

export interface IRootState {
    coursePage: ICoursePageState;
    userPage: IUserPage;
    userListPage: IUserListPage;
    notificationContainer: INotificationContainerState;
    payment: IPaymentFormState;
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        userListPage: userListPageReducer,
        userPage: userPageReducer,
        notificationContainer: notificationContainerReducer,
        payment: paymentReducer
    }),
    undefined,
    applyMiddleware(...middlewares));

export default store;