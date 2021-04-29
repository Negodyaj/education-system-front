import { ATTENDANCE_WRETCH_FAIL, ATTENDANCE_WRETCH_LOADED, ATTENDANCE_WRETCH_LOADING } from "../../actionTypes";
import { IAttendance } from "../../state";
import { AttendanceListActions } from "./action-creators";

const initialState: IAttendance = {
    attendanceList: [],
    studentsByGroup: [],
    isDataLoading: false
};
export function attendanceReducer(state: IAttendance = initialState, action: AttendanceListActions): IAttendance {
    switch (action.type) {
        case ATTENDANCE_WRETCH_LOADING:
            return { ...state, isDataLoading: true}
        case ATTENDANCE_WRETCH_LOADED:
            return { ...state, attendanceList: action.payload, isDataLoading: false };
        case ATTENDANCE_WRETCH_FAIL:
            return { ...state, attendanceList: [], isDataLoading: false };
        default:
            return state;
    }
}