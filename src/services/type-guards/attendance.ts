import { Attendance } from '../../interfaces/Attendance';

export const isAttendance = (data: any): data is Attendance => !!data.isAbsent;
