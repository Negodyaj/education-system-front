import { Course } from "../../interfaces/Courses"
import { COURSE_LIST_WRETCH_LOADING, COURSE_LIST_WRETCH_LOADED, COURSE_LIST_WRETCH_FAIL, COURSE_LIST_OPEN_MODAL_CREATE_COURSE, COURSE_LIST_CLOSE_MODAL_CREATE_COURSE } from "../actionTypes"

export type CoursePageActions =
    | ReturnType<typeof setCoursesListIsLoading>
    | ReturnType<typeof setCoursesListWasLoaded>
    | ReturnType<typeof setCoursesListFail>
    | ReturnType<typeof setIsOpenModalCreateCourse>
    | ReturnType<typeof setIsCloseModalCreateCourse>

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

export const setIsOpenModalCreateCourse = () => {
    return ({
        type: COURSE_LIST_OPEN_MODAL_CREATE_COURSE,
        payload: true
    } as const);
}

export const setIsCloseModalCreateCourse = () => {
    return ({
        type: COURSE_LIST_CLOSE_MODAL_CREATE_COURSE,
        payload: false
    } as const);
}