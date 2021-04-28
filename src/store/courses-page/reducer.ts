import { ICoursePageState } from "../state";
import { CoursePageActions } from "./action-creators";
import {
    COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DESCRIPTION,
    COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DURATION,
    COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_NAME,
    COURSE_CREATE_INPUT_DATA_NEW_COURSE,
    COURSE_CREATE_NO_DESCRIPTION_VALIDATED,
    COURSE_CREATE_NO_DURATION_VALIDATED,
    COURSE_CREATE_NO_NAME_VALIDATED,
    COURSE_LIST_CLOSE_MODAL_CREATE_COURSE,
    COURSE_LIST_CLOSE_MODAL_DELETE_COURSE,
    COURSE_LIST_DELETE_COURSE,
    COURSE_LIST_OPEN_MODAL_CREATE_COURSE,
    COURSE_LIST_OPEN_MODAL_DELETE_COURSE,
    COURSE_LIST_WRETCH_CREATE_COURSE,
    COURSE_LIST_WRETCH_FAIL,
    COURSE_LIST_WRETCH_LOADED,
    COURSE_LIST_WRETCH_LOADING
} from "../actionTypes";
import { DataNewCourse } from "../../components/courses-page/NewCourse";

const intialCourseForDeleteId = 0;

const initialState: ICoursePageState = {
    courseList: [],
    isOpenModalCreateCourse: false,
    isModalDelete: false,
    isCourseDeleting: false,
    isDataLoading: false,
    isNameNewCourseFilled: false,
    isDescriptionNewCourseFilled: false,
    isDurationNewCourseFilled: false,
    courseForDeleteId: intialCourseForDeleteId,
    dataNewCourse: {} as DataNewCourse
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
            return { ...state, isOpenModalCreateCourse: true };
        case COURSE_LIST_CLOSE_MODAL_CREATE_COURSE:
            return {
                ...state,
                isOpenModalCreateCourse: false,
                isNameNewCourseFilled: false,
                isDescriptionNewCourseFilled: false,
                isDurationNewCourseFilled: false
            };
        case COURSE_LIST_OPEN_MODAL_DELETE_COURSE:
            return { ...state, isModalDelete: true, courseForDeleteId: action.payload };
        case COURSE_LIST_CLOSE_MODAL_DELETE_COURSE:
            return { ...state, isModalDelete: false };
        case COURSE_LIST_WRETCH_CREATE_COURSE:
            return { ...state, isDataLoading: false };
        case COURSE_CREATE_NO_NAME_VALIDATED:
            return { ...state, isNameNewCourseFilled: true };
        case COURSE_CREATE_NO_DESCRIPTION_VALIDATED:
            return { ...state, isDescriptionNewCourseFilled: true };
        case COURSE_CREATE_NO_DURATION_VALIDATED:
            return { ...state, isDurationNewCourseFilled: true };
        case COURSE_CREATE_INPUT_DATA_NEW_COURSE:
            return { ...state, dataNewCourse: action.payload };
        case COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_NAME:
            return { ...state, isNameNewCourseFilled: false}
        case COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DESCRIPTION:
            return { ...state, isDescriptionNewCourseFilled: false}
        case COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DURATION:
            return { ...state, isDurationNewCourseFilled: false}
        default:
            return state;
    }
}