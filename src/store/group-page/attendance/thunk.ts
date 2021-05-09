import { Dispatch } from 'redux';

import { Attendance } from '../../../interfaces/Attendance';
import { Lesson } from '../../../interfaces/Lesson';
import { sendGetRequest } from '../../../services/http.service';
import { isAttendanceArr } from '../../../services/type-guards/attendanceArr';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonAttendance, lessonsUrl } from '../../../shared/consts';
import { thunkResponseHandler } from '../../thunkResponseHadlers';

import {
  setAttendanceListFail,
  setAttendanceListIsLoading,
  setAttendanceListWasLoaded,
} from './action-creators';

// export const getLessonsByGroupId = (groupId: number) => {
//   return (dispatch: Dispatch) => {
//     dispatch(setAttendanceListIsLoading());
//     sendGetRequest<Lesson[]>(`${lessonsUrl}/${groupId}`, isLessonArr)
//       .then(lesson => {
//         dispatch(setAttendanceListWasLoaded(thunkResponseHandler(dispatch, lesson)));
//       })
//       .catch(error => dispatch(setAttendanceListFail(error)));
//     }
// }

export const getAttendanceByLessonId = (lessonId: number) => (
  dispatch: Dispatch
) => {
  dispatch(setAttendanceListIsLoading());
  sendGetRequest<Attendance[]>(
    `${lessonAttendance}/${lessonId}/attendance`,
    isAttendanceArr
  )
    .then((attendance) => {
      dispatch(
        setAttendanceListWasLoaded(thunkResponseHandler(dispatch, attendance))
      );
    })
    .catch((error) => dispatch(setAttendanceListFail(error)));
};
