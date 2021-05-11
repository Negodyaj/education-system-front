import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { Attempt } from '../../interfaces/Attempt';
import { homeworkUrl } from '../../shared/consts';
import { PageTitle } from '../../shared/styled-components/consts';
import { IRootState } from '../../store';
import { setCurrentAttempt } from '../../store/homework-attempt/action-creators';
import {
  getAttemptListToCheck,
  loadCurrentHomework,
} from '../../store/homework-attempt/thunk';

import {
  AttemptCheckingContainer,
  Author,
  Content,
  Description,
  GroupName,
  Header,
  NavPanel,
} from './styledComponents';

function HomeworkAttempt() {
  const {
    attemptList,
    currentAttempt,
    currentGroup,
    currentHomework,
  } = useSelector((state: IRootState) => state.homeworkAttempt);
  const history = useHistory();
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    attemptList?.length
      ? dispatch(
          setCurrentAttempt(
            attemptList.filter(
              (attempt) => attempt.id.toString() === attemptId
            )[0]
          )
        )
      : dispatch(getAttemptListToCheck(hwId || ''));
    dispatch(loadCurrentHomework(hwId || ''));
  }, [attemptList]);

  const authorOnClick = (currentAttemptArg: Attempt) => {
    dispatch(setCurrentAttempt(currentAttemptArg));
    history.replace(`/${homeworkUrl}/${hwId}/attempts/${currentAttemptArg.id}`);
  };

  return (
    <>
      <Header>
        <PageTitle>Проверка ответов</PageTitle>
        <GroupName>
          {currentGroup?.course.name} {currentGroup?.startDate}
        </GroupName>
        <Description>{currentHomework?.description}</Description>
      </Header>
      <AttemptCheckingContainer>
        <NavPanel>
          {attemptList?.length &&
            attemptList.map((attempt) => (
              <Author
                onClick={() => authorOnClick(attempt)}
                key={attempt.author.id}>
                {attempt.author.firstName} {attempt.author.lastName}
              </Author>
            ))}
        </NavPanel>
        <Content>{currentAttempt?.comment}</Content>
      </AttemptCheckingContainer>
    </>
  );
}
export default HomeworkAttempt;
