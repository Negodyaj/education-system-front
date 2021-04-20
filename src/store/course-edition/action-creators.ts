import { Course } from "../../interfaces/Courses"
import { Themes } from "../../interfaces/Themes"
import { COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_MATERIALS_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_PROGRAM_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE, COURSE_EDITION_NAME_ALL_THEMES_IN_COURSE, COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED, COURSE_EDITION_WRETCH_LOADED, COURSE_EDITION_WRETCH_LOADING } from "../actionTypes"

export type CourseEditionActions = 
    | ReturnType<typeof setCourseEditionIsLoadingAction>
    | ReturnType<typeof setCourseEditionWasLoadedAction>
    | ReturnType<typeof getCourseByIdLoaded>
    | ReturnType<typeof setNameAllThemesInCourse>
    | ReturnType<typeof setChangeDisplayingButtonOpenProgramCourse>
    | ReturnType<typeof setChangeDisplayingButtonCloseProgramCourse>
    | ReturnType<typeof setChangeDisplayingButtonOpenMaterialsCourse>
    | ReturnType<typeof setChangeDisplayingButtonCloseMaterialsCourse>

export const setCourseEditionIsLoadingAction = () => {
    return({
        type: COURSE_EDITION_WRETCH_LOADING,
        payload: undefined
    } as const)
}

export const setCourseEditionWasLoadedAction = (themes: Themes[]) => {
    return({
        type: COURSE_EDITION_WRETCH_LOADED,
        payload: themes
    } as const)
}

export const getCourseByIdLoaded = (course: Course) => {
    return({
        type: COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED,
        payload: course
    } as const)
}

export const setNameAllThemesInCourse = (nameArr: string[]) => {
    return({
        type: COURSE_EDITION_NAME_ALL_THEMES_IN_COURSE,
        payload: nameArr
    } as const)
}

export const setChangeDisplayingButtonOpenProgramCourse = () => {
    return({
        type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE,
        payload: false
    } as const)
}

export const setChangeDisplayingButtonOpenMaterialsCourse = () => {
    return({
        type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE,
        payload: true
    } as const)
}

export const setChangeDisplayingButtonCloseProgramCourse = () => {
    return({
        type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_PROGRAM_COURSE,
        payload: false
    } as const)
}

export const setChangeDisplayingButtonCloseMaterialsCourse = () => {
    return({
        type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_MATERIALS_COURSE,
        payload: false
    } as const)
}




