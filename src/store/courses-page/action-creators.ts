import { Course } from "../../interfaces/Courses";
import { COURSE_LIST_WRETCH_LOADING, COURSE_LIST_WRETCH_LOADED, COURSE_LIST_WRETCH_FAIL, COURSE_LIST_OPEN_MODAL_CREATE_COURSE, COURSE_LIST_CLOSE_MODAL_CREATE_COURSE, COURSE_LIST_CLOSE_MODAL_DELETE_COURSE, COURSE_LIST_OPEN_MODAL_DELETE_COURSE, COURSE_LIST_DELETE_COURSE, COURSE_LIST_WRETCH_CREATE_COURSE, COURSE_CREATE_NO_NAME_VALIDATED, COURSE_CREATE_NO_DESCRIPTION_VALIDATED, COURSE_CREATE_NO_DURATION_VALIDATED, COURSE_CREATE_INPUT_DATA_NEW_COURSE, COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_NAME, COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DESCRIPTION, COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DURATION } from "../actionTypes"
import { DataNewCourse } from "../../components/courses-page/NewCourse";

export type CoursePageActions =
    | ReturnType<typeof setCoursesListIsLoadingAction>
    | ReturnType<typeof setCoursesListWasLoadedAction>
    | ReturnType<typeof setCoursesListFailAction>
    | ReturnType<typeof showOpenModalCreateCourseAction>
    | ReturnType<typeof closeModalCreateCourseAction>
    | ReturnType<typeof showOpenModalDeleteCourseAction>
    | ReturnType<typeof closeModalDeleteCourseAction>
    | ReturnType<typeof createCourseAction>
    | ReturnType<typeof validatedCourseName>
    | ReturnType<typeof validatedCourseDescription>
    | ReturnType<typeof validatedCourseDuration>
    | ReturnType<typeof createNewCourseInputModal>
    | ReturnType<typeof unvalidataCourseName>
    | ReturnType<typeof unvalidataCourseDescription>
    | ReturnType<typeof unvalidataCourseDuration>

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

export const showOpenModalCreateCourseAction = () => {
    return ({
        type: COURSE_LIST_OPEN_MODAL_CREATE_COURSE,
        payload: true
    } as const);
}

export const closeModalCreateCourseAction = () => {
    return ({
        type: COURSE_LIST_CLOSE_MODAL_CREATE_COURSE,
        payload: false
    } as const);
}

export const showOpenModalDeleteCourseAction = (courseDeleteId: number) => {
    return ({
        type: COURSE_LIST_OPEN_MODAL_DELETE_COURSE,
        payload: courseDeleteId
    } as const);
}

export const closeModalDeleteCourseAction = () => {
    return ({
        type: COURSE_LIST_CLOSE_MODAL_DELETE_COURSE,
        payload: false
    } as const);
}

export const createCourseAction = (newCourse: DataNewCourse) => {
    return ({
        type: COURSE_LIST_WRETCH_CREATE_COURSE,
        payload: newCourse
    } as const)
}

export const validatedCourseName = () => {
    return ({
        type: COURSE_CREATE_NO_NAME_VALIDATED,
        payload: false
    } as const)
}

export const validatedCourseDescription = () => {
    return ({
        type: COURSE_CREATE_NO_DESCRIPTION_VALIDATED,
        payload: false
    } as const)
}

export const validatedCourseDuration = () => {
    return ({
        type: COURSE_CREATE_NO_DURATION_VALIDATED,
        payload: false
    } as const)
}

export const createNewCourseInputModal = (inputDataNewCourse: DataNewCourse) => {
    return ({
        type: COURSE_CREATE_INPUT_DATA_NEW_COURSE,
        payload: inputDataNewCourse
    } as const)
}

export const unvalidataCourseName = () => {
    return ({
        type: COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_NAME,
        payload: true
    } as const)
}

export const unvalidataCourseDescription = () => {
    return ({
        type: COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DESCRIPTION,
        payload: true
    } as const)
}

export const unvalidataCourseDuration = () => {
    return ({
        type: COURSE_CREATE_CREATE_MODAL_UNVALIDATE_INPUT_DURATION,
        payload: true
    } as const)
}

