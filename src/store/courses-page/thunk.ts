import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "..";
import { sendGetRequest } from "../../services/http.service";
import { isCourseArr } from "../../services/type-guards/courseArr";
import { coursesUrl } from "../../shared/consts";
import { setCoursesListFail, setCoursesListIsLoading, setCoursesListWasLoaded} from "./action-creators";

const url = 'url';

export const getCourses = () => {
    return (dispatch: Dispatch) => {
        dispatch(setCoursesListIsLoading());
        sendGetRequest(coursesUrl, isCourseArr)
            .then(courses => dispatch(setCoursesListWasLoaded(courses)))
            .catch(error => dispatch(setCoursesListFail(error)))
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