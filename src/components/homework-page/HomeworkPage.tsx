import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageTitle } from "../../shared/styled-components/consts";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { loadHomeworkSuccess } from "../../store/homework-page/action-creators";
import { HomeworkSelector } from "./homework-selector/HomeworkSelector";
import { HomeworkPageContainer, HomeworkPageHeader } from "./styled-components/consts";

function HomeworkPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadHomeworkSuccess(homeworkList));
  }, [])
  return (
    <HomeworkPageContainer>
      <HomeworkPageHeader>
        <PageTitle>Домашние задания</PageTitle>
        <button>Создать</button>
      </HomeworkPageHeader>
      <HomeworkSelector />
    </HomeworkPageContainer>
  )
}
export default HomeworkPage;
