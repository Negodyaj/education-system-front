import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { Attempt } from '../../interfaces/Attempt';
import { homeworkUrl } from '../../shared/consts';
import { PageTitle } from '../../shared/styled-components/consts';
import { IRootState } from '../../store';
import { setCurrentAttempt } from '../../store/homework-attempt/action-creators';
import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';

import {
  AttemptCheckingContainer,
  Author,
  Content,
  NavPanel,
} from './styledComponents';

function HomeworkAttempt() {
  const appState = useSelector((state: IRootState) => state);
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    dispatch(getAttemptListToCheck(hwId || ''));
    attemptId &&
      dispatch(
        setCurrentAttempt(
          appState.homeworkAttempt.attemptList.filter(
            (attempt) => attempt.id.toString() === attemptId
          )[0]
        )
      );
    console.log(appState.homeworkAttempt.currentAttempt);
  }, [appState.homeworkAttempt.attemptList]);

  const authorOnClick = (currentAttempt: Attempt) => {
    dispatch(setCurrentAttempt(currentAttempt));
    history.replace(`/${homeworkUrl}/${hwId}/attempts/${currentAttempt.id}`);
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
            <Author
              onClick={() => authorOnClick(attempt)}
              key={attempt.author.id}>
              {attempt.author.firstName} {attempt.author.lastName}
            </Author>
          ))}
        </NavPanel>
        <Content>{appState.homeworkAttempt.currentAttempt?.comment}</Content>
      </AttemptCheckingContainer>
    </>
  );
}
export default HomeworkAttempt;
