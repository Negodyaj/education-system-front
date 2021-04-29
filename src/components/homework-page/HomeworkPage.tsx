import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { loadHomeworkSuccess } from "../../store/homework-page/action-creators";
import { HomeworkSelector } from "./homework-selector/HomeworkSelector";
import './HomeworkPage.css';

function HomeworkPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadHomeworkSuccess(homeworkList));
  }, [])
  return (
    <div className="homework-page">
      <HomeworkSelector />
    </div>
  )
}
export default HomeworkPage;
