import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAttemptListToCheck } from '../../store/homework-attempt/action-creators';
import { IRootState } from '../../store';
import { Role } from '../../enums/role';
import { LinkDetector } from '../../shared/components/link-detector/LinkDetector';

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
import AttemptChecker from './attempt-checker/AttemptChecker';

function HomeworkAttempt() {
  const { homeworkAttempt, roleSelector } = useSelector(
    (state: IRootState) => state
  );
  const { attemptList, currentHomework } = { ...homeworkAttempt };
  const { currentUserRoleId } = roleSelector;
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    dispatch(getAttemptListToCheck(hwId || '', attemptId));
  }, []);

  return (
    <>
      <HeaderComponent />
      <Description>
        <Title>Домашняя работа:</Title>
        <Data>
          <LinkDetector
            stringForDetecting={currentHomework?.description || ''}
          />
        </Data>
      </Description>
      {currentUserRoleId === Role.Student ? (
        <AttemptCreator />
      ) : (
        <AttemptChecker />
      )}
    </>
  );
}
export default HomeworkAttempt;
