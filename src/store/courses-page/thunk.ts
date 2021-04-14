import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "..";
import { Course } from "../../interfaces/Courses";
import { User } from "../../interfaces/User";
import { sendGetRequest } from "../../services/http.service";
import { isCourse } from "../../services/type-guards/course";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { isUserArr } from "../../services/type-guards/userArray";
import { coursesUrl } from "../../shared/consts";
import { setCoursesListFail, setCoursesListIsLoading, setCoursesListWasLoaded} from "./action-creators";

const url = 'url';

export const getCourses = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setCoursesListIsLoading());
        try {
            const courses = await sendGetRequest<Course[]>(coursesUrl, isCourseArr);
            return dispatch(setCoursesListWasLoaded(courses));
        } catch (error) {
            return dispatch(setCoursesListFail(error));
        }
    }
}

// export const getUsers = () => {
//     return (dispatch: Dispatch) => {
//         dispatch(setCoursesListIsLoading());
//         fetch(url)
//             .then(res => res.json())
//             .then(users => {
//                 dispatch(courseListSuccess(users));
//                 //dispatch(showSuccessNotification(users));
//             })
//             .catch(error => {
//                 dispatch(usersFetchFail(error));
//             })
//     }
// }