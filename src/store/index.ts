import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { coursePageReducer } from './courses-page/reducer';
import { ICoursePageState } from './state';

export interface IRootState {
    coursePage: ICoursePageState
}

const middlewares = [thunk];

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        coursePage: coursePageReducer
    }), 
    undefined,
    applyMiddleware(...middlewares));

export default store;