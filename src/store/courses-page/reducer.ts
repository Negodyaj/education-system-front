import { ICoursePageState } from "../state";
import { CoursePageActions } from "./action-creators";
import {
    COURSE_LIST_CLOSE_MODAL_CREATE_COURSE,
    COURSE_LIST_CLOSE_MODAL_DELETE_COURSE,
    COURSE_LIST_DELETE_COURSE,
    COURSE_LIST_OPEN_MODAL_CREATE_COURSE,
    COURSE_LIST_OPEN_MODAL_DELETE_COURSE,
    COURSE_LIST_WRETCH_FAIL,
    COURSE_LIST_WRETCH_LOADED,
    COURSE_LIST_WRETCH_LOADING
} from "../actionTypes";

const intialCourseForDeleteId = 0;

const initialState: ICoursePageState = {
    courseList: [],
    isOpenModalCreateCourse: false,
    isModalDelete: false,
    isCourseDeleting: false,
    isDataLoading: false,
    courseForDeleteId: intialCourseForDeleteId,
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
        case COURSE_LIST_OPEN_MODAL_DELETE_COURSE:
            return { ...state, isModalDelete: true, courseForDeleteId: action.payload };
        case COURSE_LIST_CLOSE_MODAL_DELETE_COURSE:
            return { ...state, isModalDelete: false };
        default:
            return state;
    }
}