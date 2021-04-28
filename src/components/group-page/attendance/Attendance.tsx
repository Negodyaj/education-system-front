import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import { getAttendanceByLessons } from "../../../store/group-page/attendance/thunk";
import { getLessonsByGroup } from "../../../store/group-page/lesson/thunk";
import "./Attendance.css";

const GroupJournal = () => {
  const dispatch = useDispatch();
  const studentGroup = useSelector((state: IRootState) => state.groupInfoComponent.studentsGroup);
  const lessonDataForColumnName = useSelector((state: IRootState) => state.lessonByGroup.lessonList);
  const attendance = useSelector((state: IRootState) => state.attendanceList);

  useEffect(() => {
    dispatch(getGroupToViewById(14))
    dispatch(getLessonsByGroup());
    // dispatch(getAttendanceByLessons(attendance.lessonList))
  }, [])

    return(
        <div className='journal-container'>
          <div className="journal-head">
            <div className="sort-menu"> Тут лежит какое-то меню для сортировок фильтров и тп</div>
          </div>
          <div className="journal-visible">
            <table>
              <tr className='table-head'>
                <th>id</th>
                <th>ФИО</th>
                <th>%</th>
                {
                  lessonDataForColumnName.map(item => (
                    <th>{ item.lessonDate }</th>
                  ))
                }
              </tr>
            {
              studentGroup.map(item => (
                <tr className='row-journal'>
                  <td>{ item.id }</td>
                  <td>{`${item.firstName} ${item.lastName}`}</td>
                </tr>
              ))
            }
              </table>
          </div>
        </div>
    )
}

export default GroupJournal;