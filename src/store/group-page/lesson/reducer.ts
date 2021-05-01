import { LESSON_LIST_WRETCH_FAIL, LESSON_LIST_WRETCH_LOADED, LESSON_LIST_WRETCH_LOADING } from "../../actionTypes";
import { ILesson } from "../../state";
import { LessonListActions } from "./action-creators";

const initialState: ILesson = {
    lessonList: [],
    isDataLoading: false
};
export function lessonByGroupReducer(state: ILesson = initialState, action: LessonListActions): ILesson {
    switch (action.type) {
        case LESSON_LIST_WRETCH_LOADING:
            return { ...state, isDataLoading: true}
        case LESSON_LIST_WRETCH_LOADED:
            return { ...state, lessonList: action.payload, isDataLoading: false };
        case LESSON_LIST_WRETCH_FAIL:
            return { ...state, lessonList: [], isDataLoading: false };
        default:
            return state;
    }
}