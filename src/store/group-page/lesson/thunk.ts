import { Dispatch } from 'redux';

import { Lesson } from '../../../interfaces/Lesson';
import { LessonInput } from '../../../interfaces/LessonInput';
import {
  sendDeleteRequest,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/http.service';
import { isAttendance } from '../../../services/type-guards/attendance';
import { IUserAttendance } from '../../../components/group-page/lesson-list-component/ModalAttendance';
import { Attendance } from '../../../interfaces/Attendance';
import { isLesson } from '../../../services/type-guards/lesson';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonsUrl } from '../../../shared/consts';
import { makeNotification } from '../../../shared/helpers/notificationHelpers';
import { pushNotification } from '../../notifications/action-creators';
import { thunkResponseHandler } from '../../thunkResponseHadlers';

import {
  setIsOpenModalAddLesson,
  setIsOpenModalAttendance,
  setIsOpenModalDeleteLesson,
  setLessonListFail,
  setLessonListWasLoaded,
} from './action-creators';

export const getLessonsByGroup = () => (dispatch: Dispatch) => {
  sendGetRequest<Lesson[]>(`${lessonsUrl}/by-group/14`, isLessonArr)
    .then((lessons) => {
      dispatch(setLessonListWasLoaded(thunkResponseHandler(dispatch, lessons)));
    })
    .catch((error) => dispatch(setLessonListFail(error)));
};

export const createLesson = (newLesson: LessonInput) => (
  dispatch: Dispatch<any>
) => {
  sendPostRequest<Lesson>(`${lessonsUrl}`, isLesson, { ...newLesson })
    .then((lesson) => {
      const response = thunkResponseHandler(dispatch, lesson);
      response &&
        dispatch(
          pushNotification(
            makeNotification(
              'success',
              `Занятие на ${(response as Lesson).lessonDate} запланировано`
            )
          )
        );
      dispatch(setIsOpenModalAddLesson());
      dispatch(getLessonsByGroup());
    })
    .catch((error) => dispatch(setLessonListFail(error)));
};

export const deleteLesson = (id: number) => (dispatch: Dispatch<any>) => {
  sendDeleteRequest<Lesson>(`${lessonsUrl}/${id}`, isLesson)
    .then((lesson) => {
      const response = thunkResponseHandler(dispatch, lesson);
      response &&
        dispatch(
          pushNotification(
            makeNotification(
              'success',
              `Занятие от ${(response as Lesson).lessonDate} успешно удалено`
            )
          )
        );
      dispatch(setIsOpenModalDeleteLesson());
      dispatch(getLessonsByGroup());
    })
    .catch((error) => dispatch(setLessonListFail(error)));
};

export const createAttendance = (
  lessonId: number,
  newAttendanceArr: IUserAttendance[]
) => (dispatch: Dispatch<any>) => {
  newAttendanceArr.map(async (newAttendance) =>
    sendPostRequest<Attendance>(
      `${lessonsUrl}/${lessonId}/attendance`,
      isAttendance,
      {
        ...newAttendance,
      }
    )
      .then((attendance) => {
        const response = thunkResponseHandler(dispatch, attendance);
        response &&
          dispatch(
            pushNotification(
              makeNotification(
                'success',
                `Посещаемость ${(response as Attendance).user.lastName} ${
                  (response as Attendance).user.firstName
                } сохранена`
              )
            )
          );
        dispatch(setIsOpenModalAttendance());
      })
      .catch((error) => dispatch(setLessonListFail(error)))
  );
};
