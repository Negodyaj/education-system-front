import { LessonInput } from "../../../interfaces/LessonInput";
import { LESSON_LIST_WRETCH_FAIL, LESSON_LIST_WRETCH_LOADED, LESSON_LIST_WRETCH_LOADING, LESSON_TOGGLE_MODAL_ADD_LESSON, LESSON_TOGGLE_MODAL_ATTENDANCE } from "../../actionTypes";
import { ILesson } from "../../state";
import { LessonListActions } from "./action-creators";

export const INIT_LESSON_TO_REGISTER: LessonInput = {
    idGroup: 14,
    description: '',
    lessonDate: '',
    idThemes: [],
    recordLink: ''
}

const initialState: ILesson = {
    lessonList: [],
    isDataLoading: false,
    isOpenModalAttendance: false,
    isOpenModalAddLesson: false,
    createLessonInputModel: INIT_LESSON_TO_REGISTER
};
export function lessonByGroupReducer(state: ILesson = initialState, action: LessonListActions): ILesson {
    switch (action.type) {
        case LESSON_LIST_WRETCH_LOADING:
            return { ...state, isDataLoading: true}
        case LESSON_LIST_WRETCH_LOADED:
            return { ...state, lessonList: action.payload, isDataLoading: false };
        case LESSON_LIST_WRETCH_FAIL:
            return { ...state, lessonList: [], isDataLoading: false };
        case LESSON_TOGGLE_MODAL_ATTENDANCE:
            return { ...state, isOpenModalAttendance: !state.isOpenModalAttendance };
        case LESSON_TOGGLE_MODAL_ADD_LESSON:
            return { ...state, isOpenModalAddLesson: !state.isOpenModalAddLesson };
        default:
            return state;
    }
}