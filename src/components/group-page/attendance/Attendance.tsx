import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTypeNode } from "typescript";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import { getAttendanceByLessonId } from "../../../store/group-page/attendance/thunk";
import { getLessonsByGroup } from "../../../store/group-page/lesson/thunk";
import {
  AttendanceHead,
  AttendanceList,
  AttendaneVisible,
  BlockMenu,
  ColumnHead,
  ColumnInfo,
  RowAttandance,
  TableAttendance,
  TableHead
} from "./AttendanceStyled";

const Attandance = () => {
  const dispatch = useDispatch();
  const studentGroup = useSelector(
    (state: IRootState) => state.groupInfoComponent.studentsGroup
  );
  const lessonDataForColumnName = useSelector(
    (state: IRootState) => state.lessonByGroup.lessonList
  );
  const attendance = useSelector(
    (state: IRootState) => state.attendanceList.attendanceList
  );

  useEffect(() => {
    dispatch(getGroupToViewById(14));
    dispatch(getLessonsByGroup());
    // dispatch(getAttendanceByLessons(attendance.lessonList))
    lessonDataForColumnName.map((item) => {
      dispatch(getAttendanceByLessonId(item.id));

    return(
        <AttendanceList>
          <AttendanceHead>
            <BlockMenu> Тут лежит какое-то меню для сортировок фильтров и тп</BlockMenu>
          </AttendanceHead>
          <AttendaneVisible>
          <TableAttendance>
              <RowAttandance>
                <ColumnHead>id</ColumnHead>
                <ColumnHead>ФИО</ColumnHead>
                <ColumnHead>%</ColumnHead>
                {
                  lessonDataForColumnName.map(item => (
                    <ColumnHead>
                      {item.lessonDate}
                      {/* {dispatch(getAttendanceByLessonId(item.id))} */}
                    </ColumnHead>
                  ))
                }
              </RowAttandance>
            {
              studentGroup.map(item => (
                <RowAttandance>
                  <ColumnInfo>{ item.id}</ColumnInfo>
                  <ColumnInfo>{`${item.firstName} ${item.lastName}`}</ColumnInfo>
                  <ColumnInfo>{ lessonDataForColumnName.length }</ColumnInfo>
                </RowAttandance>
              ))
            }
              </TableAttendance>
          </AttendaneVisible>
        </AttendanceList>
    )
}

export default Attandance;