import { Dispatch } from "redux";
import { Course } from "../../interfaces/Courses";
import { Themes } from "../../interfaces/Themes";
import { sendDeleteRequestNoResponse, sendGetRequest, sendPostRequest, sendPostRequestNoResponse } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isThemesArr } from "../../services/type-guards/themesArr";
import { coursesUrl, themesUrl } from "../../shared/consts";
import { getCourseByIdLoaded, setCourseEditionIsLoadingAction, setCourseEditionWasLoadedAction } from "./action-creators";
import { NewThemeCourse } from "../../components/courses-page/course-edition/CourseEdition";

export const getThemes = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCourseEditionIsLoadingAction());
        sendGetRequest<Themes[]>(themesUrl, isThemesArr)
            .then(themes => dispatch(setCourseEditionWasLoadedAction(themes)))
            //.catch(error => dispatch(setCoursesListFailAction(error)))
    }
} 

export const getCourseById = (id: number) => {
    return (dispatch: Dispatch) => {
        sendGetRequest<Course>(`${coursesUrl}/${id}`, isCourse)
            .then(course => {return dispatch(getCourseByIdLoaded(course))})
    }
}

export const addThemeInCourse = (newTheme: NewThemeCourse) => {
    return (dispatch: Dispatch) => {
        sendPostRequestNoResponse(`${coursesUrl}/${newTheme.idCourse}/theme/${newTheme.idTheme}`)
        .then(data => {getCourseById(newTheme.idCourse)})
    }
}

export const deleteThemeCourse = (newTheme: NewThemeCourse) => {
    return (dispatch: Dispatch) => {
        sendDeleteRequestNoResponse(`${coursesUrl}/${newTheme.idCourse}/theme/${newTheme.idTheme}`)
        .then(data => {getCourseById(newTheme.idCourse)})
    }
}