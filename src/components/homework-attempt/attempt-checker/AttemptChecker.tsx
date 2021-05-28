import React from 'react';
import { useSelector } from 'react-redux';

import { Role } from '../../../enums/role';
import { LinkDetector } from '../../../shared/components/link-detector/LinkDetector';
import { IRootState } from '../../../store';
import NavPanelComponent from '../nav-panel/NavPanelComponent';
import {
  AttemptCheckingContainer,
  AttemptCheckingRow,
  Content,
} from '../styledComponents';

import AttemptStatusChanger from './AttemptStatusChanger';

const AttemptChecker = () => {
  const { homeworkAttempt, roleSelector } = useSelector(
    (state: IRootState) => state
  );
  const { currentUserRoleId } = roleSelector;
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
        {currentUserRoleId === Role.Teacher && <AttemptStatusChanger />}
      </AttemptCheckingRow>
    </AttemptCheckingContainer>
  );
};

export default AttemptChecker;
