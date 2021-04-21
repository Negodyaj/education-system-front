import { Course } from "../../interfaces/Courses";
import { COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_MATERIALS_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_PROGRAM_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE, COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE, COURSE_EDITION_NAME_ALL_THEMES_IN_COURSE, COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED, COURSE_EDITION_WRETCH_LOADED, COURSE_EDITION_WRETCH_LOADING } from "../actionTypes";
import { ICourseEditionState } from "../state";
import { CourseEditionActions } from "./action-creators";

const initialState: ICourseEditionState = {
    course: {} as Course,
    themes: [],
    nameThemesCourse: [],
    isDataLoading: false,
    isDisplayingButtonOpenProgramCourse: false,
    isDisplayingButtonOpenMaterialsCourse: false,
}

export function courseEditionPageReducer(state: ICourseEditionState = initialState, action: CourseEditionActions): ICourseEditionState {
    switch (action.type) {
        case COURSE_EDITION_WRETCH_LOADING:
            return {...state, isDataLoading: true}
        case COURSE_EDITION_WRETCH_LOADED: 
            return {...state, themes: action.payload, isDataLoading: false}
        case COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED:
            return {...state, course: action.payload}
        case COURSE_EDITION_NAME_ALL_THEMES_IN_COURSE:
            return {...state, nameThemesCourse: action.payload}
        case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE:
            return {...state, isDisplayingButtonOpenProgramCourse: action.payload}
        case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_PROGRAM_COURSE:
            return {...state, isDisplayingButtonOpenProgramCourse: action.payload}
        case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE:
            return {...state, isDisplayingButtonOpenMaterialsCourse: action.payload}
        case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_CLOSE_MATERIALS_COURSE:
            return {...state, isDisplayingButtonOpenMaterialsCourse: action.payload}
        default:
            return state;
    }
}