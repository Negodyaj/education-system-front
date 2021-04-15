import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { notificationContainerReducer } from './notifications/reducer';
import { ICoursePageState, INotificationContainerState, ITagsPageState } from './state';
import { tagsPageReducer } from './tags-page/reducer';

export interface IRootState {
    coursePage: ICoursePageState,
    notificationContainer: INotificationContainerState,
    tagsPage: ITagsPageState
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        notificationContainer: notificationContainerReducer,
        tagsPage: tagsPageReducer
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;