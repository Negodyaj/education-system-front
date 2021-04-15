import { Dispatch } from "redux";
import { Course } from "../../interfaces/Courses";
import { sendDeleteRequest, sendGetRequest } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { coursesUrl } from "../../shared/consts";
import { closeModalDeleteCourse, setCoursesListFail, setCoursesListIsLoading, setCoursesListWasLoaded } from "./action-creators";


const url = 'url';

export const getCourses = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCoursesListIsLoading());
        sendGetRequest<Course[]>(coursesUrl, isCourseArr)
            .then(courses => dispatch(setCoursesListWasLoaded(courses)))
            .catch(error => dispatch(setCoursesListFail(error)))
    }
}

export const deleteCourse = (id: number) => {
    return (dispatch: Dispatch) => {
        sendDeleteRequest<Course>(`${coursesUrl}/${id}`, isCourse)
            .then(course => {
                return course
            })
            .catch(error => console.log(error))
    }
}