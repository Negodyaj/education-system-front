import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { ICoursePageState, INotificationContainerState } from './state';

export interface IRootState {
    coursePage: ICoursePageState,
    notificationContainer: INotificationContainerState,
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        notificationContainer: notificationContainerReducer,
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;