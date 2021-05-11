import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PageTitle } from '../../shared/styled-components/consts';
import { IRootState } from '../../store';
import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';

function HomeworkAttempt() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  useEffect(() => {
    dispatch(getAttemptListToCheck(hwId || ''));
  }, []);

  return (
    <>
      <PageTitle>Проверка ответов</PageTitle>
      {appState.homeworkAttempt.attemptList.map((attempt) => attempt.comment)}
    </>
  );
}
export default HomeworkAttempt;
