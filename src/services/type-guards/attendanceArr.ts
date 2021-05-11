import { Attendance } from '../../interfaces/Attendance';

export const isAttendanceArr = (data: any): data is Attendance[] => {
  if (data)
    return (
      Array.isArray(data) &&
      !!data[0].user[0].firstName &&
      !!data[0].user[0].lastName &&
      !!data[0].isAbsent
    );

  return false;
};
