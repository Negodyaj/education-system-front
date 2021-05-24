import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';
import { IRootState } from '../../store';
import { Role } from '../../enums/role';

import NavPanelComponent from './nav-panel/NavPanelComponent';
import {
  AttemptCheckingContainer,
  Content,
  Data,
  Description,
  Title,
} from './styledComponents';
import { HeaderComponent } from './header-component/HeaderComponent';
import AttemptCreator from './attempt-creator/AttemptCreator';

function HomeworkAttempt() {
  const { homeworkAttempt, roleSelector } = useSelector(
    (state: IRootState) => state
  );
  const {
    attemptList,
    currentAttempt,
    currentGroup,
    currentHomework,
    allGroupsInCollege,
  } = homeworkAttempt;
  const { currentUserRoleId } = roleSelector;
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    !attemptList?.length &&
      dispatch(getAttemptListToCheck(hwId || '', attemptId));
  }, []);

  return (
    <>
      <HeaderComponent />
      <Description>
        <Title>Домашняя работа:</Title>
        <Data>{currentHomework?.description}</Data>
      </Description>
      {currentUserRoleId === Role.Student ? (
        <AttemptCreator />
      ) : (
        <AttemptCheckingContainer>
          <NavPanelComponent attemptList={attemptList} />
          <Content>
            {attemptList?.length ? currentAttempt?.comment : 'нет ответов'}
          </Content>
        </AttemptCheckingContainer>
      )}
    </>
  );
}
export default HomeworkAttempt;
