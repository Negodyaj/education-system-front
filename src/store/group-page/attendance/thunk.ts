import { Dispatch } from "redux";
import { Attendance } from "../../../interfaces/Attendance";
import { Lesson } from "../../../interfaces/Lesson";
import { sendGetRequest } from "../../../services/http.service";
import { isAttendance } from "../../../services/type-guards/attendance";
import { attendanceUrl } from "../../../shared/consts";
import { thunkResponseHandler } from "../../thunkResponseHadlers";
import { setAttendanceListFail, setAttendanceListWasLoaded } from "./action-creators";

export const getAttendanceByLessons = (lessons: Lesson[]) => {
  return (dispatch: Dispatch) => {
    lessons.forEach((item) => {
      sendGetRequest<Attendance>(`${attendanceUrl}/${item.id}/attendance`, isAttendance)
          .then(attendance => {
              dispatch(setAttendanceListWasLoaded(thunkResponseHandler(dispatch, attendance)));
          })
          .catch(error => dispatch(setAttendanceListFail(error)));
    })
  }
}