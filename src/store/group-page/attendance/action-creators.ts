import { Attendance } from '../../../interfaces/Attendance';
import {
  ATTENDANCE_WRETCH_FAIL,
  ATTENDANCE_WRETCH_LOADED,
  ATTENDANCE_WRETCH_LOADING,
} from '../../actionTypes';

export type AttendanceListActions =
  | ReturnType<typeof setAttendanceListIsLoading>
  | ReturnType<typeof setAttendanceListWasLoaded>
  | ReturnType<typeof setAttendanceListFail>;

export const setAttendanceListIsLoading = () =>
  ({
    type: ATTENDANCE_WRETCH_LOADING,
    payload: undefined,
  } as const);
export const setAttendanceListWasLoaded = (attendance: Attendance) =>
  ({
    type: ATTENDANCE_WRETCH_LOADED,
    payload: attendance,
  } as const);

export const setAttendanceListFail = (error: string) =>
  ({
    type: ATTENDANCE_WRETCH_FAIL,
    payload: error,
  } as const);
