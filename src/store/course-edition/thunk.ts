import { Dispatch } from "redux";
import { Course } from "../../interfaces/Courses";
import { Themes } from "../../interfaces/Themes";
import { sendDeleteRequestNoResponse, sendGetRequest, sendPostRequest, sendPostRequestNoResponse } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isThemesArr } from "../../services/type-guards/themesArr";
import { coursesUrl, themesUrl } from "../../shared/consts";
import { getCourseByIdLoaded, setCourseEditionIsLoadingAction, setCourseEditionWasLoadedAction } from "./action-creators";
import { CourseTheme } from "../../components/courses-page/course-edition/CourseEdition";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { pushNotification } from "../notifications/action-creators";
import { makeNotification } from "../../shared/helpers/notificationHelpers";

export const getThemes = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCourseEditionIsLoadingAction());
        sendGetRequest<Themes[]>(themesUrl, isThemesArr)
        .then(themes => {
            dispatch(setCourseEditionWasLoadedAction(themes));
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
} 

export const getCourseById = (id: number) => {
    return (dispatch: Dispatch) => {
        sendGetRequest<Course>(`${coursesUrl}/${id}`, isCourse)
        .then(course => {
            dispatch(getCourseByIdLoaded(course));
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
}

export const addThemeInCourse = (newTheme: CourseTheme) => {
    return (dispatch: Dispatch<any>) => {
        sendPostRequestNoResponse(`${coursesUrl}/${newTheme.idCourse}/theme/${newTheme.idTheme}`)
        .then(data => {
            dispatch(getCourseById(newTheme.idCourse));
            dispatch(pushNotification(makeNotification('success', `Тема успешно добавлена в курс`)));
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
}

export const deleteThemeCourse = (newTheme: CourseTheme) => {
    return (dispatch: Dispatch<any>) => {
        sendDeleteRequestNoResponse(`${coursesUrl}/${newTheme.idCourse}/theme/${newTheme.idTheme}`)
        .then(data => {
            dispatch(getCourseById(newTheme.idCourse));
            dispatch(pushNotification(makeNotification('success', `Тема успешно удалена из курса`)));
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
}
