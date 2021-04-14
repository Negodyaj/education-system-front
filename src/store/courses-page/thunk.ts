import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "..";
import { Course } from "../../interfaces/Courses";
import { sendGetRequest } from "../../services/http.service";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { coursesUrl } from "../../shared/consts";
import { setCoursesListFail, setCoursesListIsLoading, setCoursesListWasLoaded} from "./action-creators";

const url = 'url';

export const getCourses = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCoursesListIsLoading());
        sendGetRequest<Course[]>(coursesUrl, isCourseArr)
            .then(courses => dispatch(setCoursesListWasLoaded(courses)))
            .catch(error => dispatch(setCoursesListFail(error)))
    }
}