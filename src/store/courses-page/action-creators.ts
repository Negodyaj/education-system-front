import { COURSE_LIST_WRETCH_SUCCESS } from "../actionTypes"

export type CoursePageActions =
    | ReturnType<typeof setCoursesListIsLoading>

export const setCoursesListIsLoading = () => {
    return ({
        type: COURSE_LIST_WRETCH_SUCCESS,
        payload: undefined
    })
}