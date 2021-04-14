import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { courseListPageReducer } from './course-list-page/reducer';
import { ICourseListPageState, IUserListPageState } from './state';
import { userListPageReducer } from './user-list-page/reducer';

export interface IRootState {
    userListPage: IUserListPageState,
    courseListPage: ICourseListPageState
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        userListPage: userListPageReducer,
        courseListPage: courseListPageReducer
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;