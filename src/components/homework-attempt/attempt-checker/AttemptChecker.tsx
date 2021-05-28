import React from 'react';
import { useSelector } from 'react-redux';

import { LinkDetector } from '../../../shared/components/link-detector/LinkDetector';
import { CommonButton } from '../../../shared/styled-components/buttonStyledComponent';
import { ButtonsCell } from '../../../shared/styled-components/consts';
import { IRootState } from '../../../store';
import NavPanelComponent from '../nav-panel/NavPanelComponent';
import {
  AttemptCheckingContainer,
  AttemptCheckingRow,
  Content,
} from '../styledComponents';

import AttemptStatusChanger from './AttemptStatusChanger';

const AttemptChecker = () => {
  const { homeworkAttempt } = useSelector((state: IRootState) => state);
  const { attemptList, currentAttempt } = homeworkAttempt;

  return (
    <AttemptCheckingContainer>
      <AttemptCheckingRow>
        <NavPanelComponent attemptList={attemptList} />
        <Content>
          {currentAttempt?.comment && (
            <LinkDetector
              stringForDetecting={
                attemptList?.length ? currentAttempt.comment : 'нет ответов'
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
};

export default AttemptChecker;
