import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import { getLessonsByGroup } from "../../../store/group-page/lesson/thunk";
import "../group-journal/GroupJournal.css";

const GroupJournal = () => {
  const dispatch = useDispatch();
  const studentGroup = useSelector((state: IRootState) => state.groupInfoComponent.studentsGroup);
  const lessonDataForColumnName = useSelector((state: IRootState) => state.lessonByGroup.lessonList);

  useEffect(() => {
    dispatch(getGroupToViewById(14))
    dispatch(getLessonsByGroup());
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