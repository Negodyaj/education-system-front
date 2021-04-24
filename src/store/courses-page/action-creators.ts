import { Course } from "../../interfaces/Courses";
import {
    COURSE_LIST_WRETCH_LOADING,
    COURSE_LIST_WRETCH_LOADED,
    COURSE_LIST_WRETCH_FAIL,
    COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE,
    COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE,
    COURSE_LIST_WRETCH_CREATE_COURSE,
} from "../actionTypes"
import { DataNewCourse } from "../../components/courses-page/NewCourse";

export type CoursePageActions =
    | ReturnType<typeof setCoursesListIsLoadingAction>
    | ReturnType<typeof setCoursesListWasLoadedAction>
    | ReturnType<typeof setCoursesListFailAction>
    | ReturnType<typeof showToggleModalCreateCourseAction>
    | ReturnType<typeof showToggleModalDeleteCourseAction>
    | ReturnType<typeof createCourseAction>

export const setCoursesListIsLoadingAction = () => {
    return ({
        type: COURSE_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}

export const setCoursesListWasLoadedAction = (courses: Course[]) => {
    return ({
        type: COURSE_LIST_WRETCH_LOADED,
        payload: courses
    } as const);
}

export const setCoursesListFailAction = (error: string) => {
    return ({
        type: COURSE_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}

export const showToggleModalCreateCourseAction = () => {
    return ({
        type: COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE,
        payload: true,
    } as const);
}

export const showToggleModalDeleteCourseAction = (id: number) => {
    return ({
        type: COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE,
        payload: id,
    } as const);
}

export const createCourseAction = (newCourse: DataNewCourse) => {
    return ({
        type: COURSE_LIST_WRETCH_CREATE_COURSE,
        payload: newCourse
    } as const)
}