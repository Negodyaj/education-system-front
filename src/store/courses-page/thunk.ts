import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "..";
import { sendGetRequest } from "../../services/http.service";
import { setCoursesListIsLoading} from "./action-creators";

const url = 'url';
const notifications = useSelector((state: IRootState) => state.notifications);

export const getCourses = () => {
    return sendGetRequest
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