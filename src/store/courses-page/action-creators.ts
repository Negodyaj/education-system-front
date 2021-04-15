import { Course } from "../../interfaces/Courses";
import { COURSE_LIST_WRETCH_LOADING, COURSE_LIST_WRETCH_LOADED, COURSE_LIST_WRETCH_FAIL } from "../actionTypes"

export type CoursePageActions =
    | ReturnType<typeof setCoursesListIsLoading>
    | ReturnType<typeof setCoursesListWasLoaded>
    | ReturnType<typeof setCoursesListFail>

export const setCoursesListIsLoading = () => {
    return ({
        type: COURSE_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}

export const setCoursesListWasLoaded = (courses: Course[]) => {
    return ({
        type: COURSE_LIST_WRETCH_LOADED,
        payload: courses
    } as const);
}

export const setCoursesListFail= (error: string) => {
    return ({
        type: COURSE_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}