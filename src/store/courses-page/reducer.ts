import { COURSE_LIST_WRETCH_FAIL, COURSE_LIST_WRETCH_LOADED, COURSE_LIST_WRETCH_LOADING  } from "../actionTypes";
import { ICoursePageState } from "../state";
import { CoursePageActions } from "./action-creators";

const initialState: ICoursePageState = {
    courseList: [],
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
        default:
            return state;
    }
}