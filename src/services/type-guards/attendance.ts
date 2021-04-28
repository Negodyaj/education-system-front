import { Attendance } from "../../interfaces/Attendance";

export const isAttendance = (data: any): data is Attendance => {
  if (data)
      return data && !!data.user[0].firstName && !!data.isAbsent;
  else
      return false;
}