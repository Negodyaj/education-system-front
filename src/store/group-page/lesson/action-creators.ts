import { Lesson } from "../../../interfaces/Lesson";
import { LESSON_LIST_WRETCH_FAIL, LESSON_LIST_WRETCH_LOADED, LESSON_LIST_WRETCH_LOADING, LESSON_TOGGLE_MODAL_ATTENDANCE } from "../../actionTypes";

export type LessonListActions =
    | ReturnType<typeof setLessonListIsLoading>
    | ReturnType<typeof setLessonListWasLoaded>
    | ReturnType<typeof setLessonListFail>
    | ReturnType<typeof setIsOpenModalAttendance>

export const setLessonListIsLoading = () => {
    return ({
        type: LESSON_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}
export const setLessonListWasLoaded = (lessons: Lesson[]) => {
    return ({
        type: LESSON_LIST_WRETCH_LOADED,
        payload: lessons
    } as const);
}

export const setLessonListFail = (error: string) => {
    return ({
        type: LESSON_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}

export const setIsOpenModalAttendance = () => {
    return ({
        type: LESSON_TOGGLE_MODAL_ATTENDANCE,
        payload: undefined
    } as const)
}