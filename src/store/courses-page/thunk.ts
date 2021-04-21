import { Dispatch } from "redux";
import { DataNewCourse } from "../../components/courses-page/NewCourse";
import { Course } from "../../interfaces/Courses";
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { coursesUrl } from "../../shared/consts";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import { closeModalCreateCourseAction, closeModalDeleteCourseAction, createCourseAction, setCoursesListFailAction, setCoursesListIsLoadingAction, setCoursesListWasLoadedAction } from "./action-creators";


const url = 'url';

export const getCourses = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCoursesListIsLoadingAction());
        sendGetRequest<Course[]>(coursesUrl, isCourseArr)
            .then(courses => dispatch(setCoursesListWasLoadedAction(courses)))
            .catch(error => dispatch(setCoursesListFailAction(error)))
    }
}

export const deleteCourse =  (id: number) => {
    return (dispatch: Dispatch) => {
        sendDeleteRequest<Course>(`${coursesUrl}/${id}`, isCourse)
        .then(course => {
            let response = thunkResponseHandler(dispatch, course);
            response && dispatch(pushNotification(makeNotification('success', `Курс ${(response as Course).name} успешно удален`)));
            dispatch(closeModalDeleteCourseAction());
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
}

export const createCourse = (newCourse: DataNewCourse) => {
    return (dispatch: Dispatch) => {
        sendPostRequest<Course>(`${coursesUrl}`, isCourse, newCourse)
            .then(course => {
                let response = thunkResponseHandler(dispatch, course);
                response && dispatch(pushNotification(makeNotification('success', `Курс ${(response as Course).name} успешно создан`)));
                dispatch(closeModalCreateCourseAction());
            })
            .catch(error => thunkResponseHandler(dispatch, error));
    }
}