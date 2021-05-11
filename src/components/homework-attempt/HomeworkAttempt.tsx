import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Attempt } from '../../interfaces/Attempt';
import { PageTitle } from '../../shared/styled-components/consts';
import { IRootState } from '../../store';
import { setCurrentAttempt } from '../../store/homework-attempt/action-creators';
import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';

import {
  AttemptCheckingContainer,
  Content,
  NavPanel,
} from './styledComponents';

function HomeworkAttempt() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  useEffect(() => {
    dispatch(getAttemptListToCheck(hwId || ''));
  }, []);

  const authorOnClick = (currentAttempt: Attempt) => {
    dispatch(setCurrentAttempt(currentAttempt));
  };

  return (
    <>
      <PageTitle>Проверка ответов</PageTitle>
      <p>
        {appState.homeworkAttempt.currentGroup?.course.name}{' '}
        {appState.homeworkAttempt.currentGroup?.startDate}
      </p>
      <AttemptCheckingContainer>
        <NavPanel>
          {appState.homeworkAttempt.attemptList.map((attempt) => (
            <button onClick={() => authorOnClick(attempt)}>
              {attempt.author.firstName} {attempt.author.lastName}
            </button>
          ))}
        </NavPanel>
        <Content>{appState.homeworkAttempt.currentAttempt?.comment}</Content>
      </AttemptCheckingContainer>
    </>
  );
}
export default HomeworkAttempt;
