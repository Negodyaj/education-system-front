import { Dispatch } from "redux";
import { Course } from "../../../interfaces/Courses";
import { Homework } from "../../../interfaces/Homework";
import { HomeworkInput } from "../../../interfaces/HomeworkInput";
import { sendGetRequest, sendPostRequest } from "../../../services/http.service";
import { isCourseArr } from "../../../services/type-guards/courseArr";
import { isHomework } from "../../../services/type-guards/homework";
import { isHomeworkArr } from "../../../services/type-guards/homeworksArr";
import { homeworkUrl} from "../../../shared/consts";
import { makeNotification } from "../../../shared/helpers/notificationHelpers";
import { pushNotification } from "../../notifications/action-creators";
import { thunkResponseHandler } from "../../thunkResponseHadlers";
import { loadHomeworkForModalSuccess } from "./action-creators";



export const getHomework = () => {
    return (dispatch: Dispatch) => {
        sendGetRequest<Homework[]>(homeworkUrl, isHomeworkArr)
            .then(homeworks => dispatch(loadHomeworkForModalSuccess(homeworks)))
    }
}

export const addHomework = (newHomework: HomeworkInput) => {
    return (dispatch: Dispatch<any>) => {
        sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, newHomework)
            .then(homework => {
                let response = thunkResponseHandler(dispatch, homework);
                if (response) {
                    dispatch(pushNotification(makeNotification('success', `Домашняя работа ${(response as Homework).description} успешно добавленa`)));
                    dispatch(getHomework())
                };
            });
    }
}
export const getCourseForHW = () => {
    return (dispatch: Dispatch) => {
        sendGetRequest<Course[]>(homeworkUrl,isCourseArr)
        .then (courses => dispatch(loadHomeworkForModalSuccess(courses)))
    }
}