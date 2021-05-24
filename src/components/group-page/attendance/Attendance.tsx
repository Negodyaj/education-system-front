import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isTypeNode } from 'typescript';

import { IRootState } from '../../../store';
import { getGroupToViewById } from '../../../store/group-page/group-info-component/thunk';
import { getAttendanceByLessonId } from '../../../store/group-page/attendance/thunk';
import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';
import './Attendance.css';

const GroupJournal = () => {
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

      return item;
    });
  }, []);

  return (
    <div className="journal-container">
      <div className="journal-head">
        <div className="sort-menu">
          {' '}
          Тут лежит какое-то меню для сортировок фильтров и тп
        </div>
      </div>
      <div className="journal-visible">
        <table>
          <tr className="table-head">
            <th>id</th>
            <th>ФИО</th>
            <th>%</th>
            {lessonDataForColumnName.map((item) => (
              <th>
                {item.lessonDate}
                {/* {dispatch(getAttendanceByLessonId(item.id))} */}
              </th>
            ))}
          </tr>
          {attendance.map((item) => (
            <tr className="row-journal">
              <td>{item.user.id}</td>
              <td>{`${item.user.firstName} ${item.user.lastName}`}</td>
              <td>{lessonDataForColumnName.length}</td>
              <td>{`${item.isAbsent}`}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default GroupJournal;
