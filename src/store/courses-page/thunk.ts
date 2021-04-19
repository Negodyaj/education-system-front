import { Dispatch } from "redux";
import { DataNewCourse } from "../../components/courses-page/NewCourse";
import { Course } from "../../interfaces/Courses";
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { coursesUrl } from "../../shared/consts";
import { closeModalCreateCourseAction, createCourseAction, setCoursesListFailAction, setCoursesListIsLoadingAction, setCoursesListWasLoadedAction } from "./action-creators";


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
            .then(course => { return course })
            .catch(error => console.log(error))
    }
}

export const createCourse = (newCourse: DataNewCourse) => {
    return (dispatch: Dispatch) => {
        sendPostRequest<Course>(`${coursesUrl}`, isCourse, newCourse)
            .then(course => { return dispatch(createCourseAction(course)) })
            .catch(error => console.log(error))
    }
}