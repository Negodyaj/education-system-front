import { ICoursePageState } from "../state";
import { CoursePageActions } from "./action-creators";
import {
    COURSE_LIST_CLOSE_MODAL_CREATE_COURSE,
    COURSE_LIST_OPEN_MODAL_CREATE_COURSE,
    COURSE_LIST_WRETCH_FAIL,
    COURSE_LIST_WRETCH_LOADED,
    COURSE_LIST_WRETCH_LOADING
} from "../actionTypes";

const initialState: ICoursePageState = {
    courseList: [],
    isOpenModalCreateCourse: false,
    isModalDelete: false,
    isCourseDelete: 0,
    isDataLoading: false
};
export function coursePageReducer(state: ICoursePageState = initialState, action: CoursePageActions): ICoursePageState {
    switch (action.type) {
        case COURSE_LIST_WRETCH_LOADING:
            return { ...state, isDataLoading: true}
        case COURSE_LIST_WRETCH_LOADED:
            return { ...state, courseList: action.payload, isDataLoading: false };
        case COURSE_LIST_WRETCH_FAIL:
            return { ...state, courseList: [], isDataLoading: false };
        case COURSE_LIST_OPEN_MODAL_CREATE_COURSE:
            return { ...state, isOpenModalCreateCourse: action.payload };
        case COURSE_LIST_CLOSE_MODAL_CREATE_COURSE:
            return { ...state, isOpenModalCreateCourse: action.payload };
        default:
            return state;
    }
}