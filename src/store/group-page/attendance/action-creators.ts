import { Lesson } from "../../../interfaces/Lesson";
import { ATTENDANCE_WRETCH_FAIL, ATTENDANCE_WRETCH_LOADED, ATTENDANCE_WRETCH_LOADING } from "../../actionTypes";


export type AttendanceListActions =
    | ReturnType<typeof setAttendanceListIsLoading>
    | ReturnType<typeof setAttendanceListWasLoaded>
    | ReturnType<typeof setAttendanceListFail>

export const setAttendanceListIsLoading = () => {
    return ({
        type: ATTENDANCE_WRETCH_LOADING,
        payload: undefined
    } as const);
}
export const setAttendanceListWasLoaded = (lessons: Lesson[]) => {
    return ({
        type: ATTENDANCE_WRETCH_LOADED,
        payload: lessons
    } as const);
}

export const setAttendanceListFail = (error: string) => {
    return ({
        type: ATTENDANCE_WRETCH_FAIL,
        payload: error
    } as const);
}