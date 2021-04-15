import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { ICoursePageState, IUserListPage } from './state';
import { userListPageReducer } from './user-list-page/reducer';

export interface IRootState {
    coursePage: ICoursePageState
    userListPage: IUserListPage
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer,
        userListPage: userListPageReducer
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;