import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "../../interfaces/Courses";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { IRootState } from "../../store";
import { loadHomeworkSuccess } from "../../store/homework-page/action-creators";
import './HomeworkPage.css';

function HomeworkPage() {

  const appState = useSelector((state: IRootState) => state)
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadHomeworkSuccess(homeworkList)) }, [])
  return (
    <>
      <div className="course-item">
        {
          appState.homeworkPage.homeworkListMethodist[4]?.map(hw => (hw.description))
        }
      </div>
    </>
  )
}

export default HomeworkPage;
