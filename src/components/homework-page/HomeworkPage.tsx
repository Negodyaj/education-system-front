import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { IRootState } from "../../store";
import { loadHomeworkSuccess } from "../../store/homework-page/action-creators";
import HomeworkPageCore from "./HomeworkPageCore";

function HomeworkPage() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadHomeworkSuccess(homeworkList));
  }, [])
  return (
    <HomeworkPageCore settings={appState.homeworkPage.pageOptions} />
  )
}
export default HomeworkPage;
