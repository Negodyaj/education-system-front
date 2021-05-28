import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LinkDetector } from '../../../shared/components/link-detector/LinkDetector';
import { IRootState } from '../../../store';
import NavPanelComponent from '../nav-panel/NavPanelComponent';
import {
  AttemptCheckingContainer,
  AttemptCheckingRow,
  Content,
} from '../styledComponents';

import AttemptStatusChanger from './AttemptStatusChanger';

function AttemptChecker() {
  const { homeworkAttempt } = useSelector((state: IRootState) => state);
  const { attemptList, currentAttempt } = homeworkAttempt;
  let attempt = { ...currentAttempt };
  useEffect(() => {
    attempt = { ...currentAttempt };
  }, [attemptList]);

  return (
    <AttemptCheckingContainer>
      <AttemptCheckingRow>
        <NavPanelComponent attemptList={attemptList} />
        <Content>
          {attempt?.comment && (
            <LinkDetector
              stringForDetecting={
                attemptList?.length ? attempt?.comment : 'нет ответов'
              }
            />
          )}
        </Content>
      </AttemptCheckingRow>
      <AttemptCheckingRow right>
        <AttemptStatusChanger />
      </AttemptCheckingRow>
    </AttemptCheckingContainer>
  );
}

export default AttemptChecker;
