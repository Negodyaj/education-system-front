import { Dispatch } from 'redux';
import { Lesson } from "../../../interfaces/Lesson";
import { LessonInput } from '../../../interfaces/LessonInput';
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from "../../../services/http.service";
import { isLesson } from '../../../services/type-guards/lesson';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonsUrl } from "../../../shared/consts";
import { makeNotification } from '../../../shared/helpers/notificationHelpers';
import { pushNotification } from '../../notifications/action-creators';
import { thunkResponseHandler } from '../../thunkResponseHadlers';
import { setIsOpenModalAddLesson, setIsOpenModalDeleteLesson, setLessonListFail, setLessonListWasLoaded } from './action-creators';

export const getLessonsByGroup = () => {
    return (dispatch: Dispatch) => {
        sendGetRequest<Lesson[]>(`${lessonsUrl}/by-group/14`, isLessonArr)
            .then(lessons => {
                dispatch(setLessonListWasLoaded(thunkResponseHandler(dispatch, lessons)));
            })
            .catch(error => dispatch(setLessonListFail(error)));
    }
}

export const createLesson = (newLesson: LessonInput) => {
    return (dispatch: Dispatch<any>) => {
        sendPostRequest<Lesson>(`${lessonsUrl}`, isLesson, {...newLesson })
            .then(lesson => {
                let response = thunkResponseHandler(dispatch, lesson);
                response && dispatch(pushNotification(makeNotification('success', `Занятие на ${(response as Lesson).lessonDate} запланировано`)));
                dispatch(setIsOpenModalAddLesson());
                dispatch(getLessonsByGroup());
            })
            .catch(error => dispatch(setLessonListFail(error)));
    }
}

export const deleteLesson = (id: number) => {
    return (dispatch: Dispatch<any>) => {
        sendDeleteRequest<Lesson>(`${lessonsUrl}/${id}`, isLesson)
            .then(lesson => {
                let response = thunkResponseHandler(dispatch, lesson);
                response && dispatch(pushNotification(makeNotification('success', `Занятие от ${(response as Lesson).lessonDate} успешно удалено`)));
                dispatch(setIsOpenModalDeleteLesson());
                dispatch(getLessonsByGroup());
            })
            .catch(error => dispatch(setLessonListFail(error)));
    }
}
