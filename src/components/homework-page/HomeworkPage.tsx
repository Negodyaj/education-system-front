import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Role } from '../../enums/role';
import { IRootState } from '../../store';
import { getHomeworks } from '../../store/homework-page/action-creators';
import { getGroupsByTeacherId } from '../../store/homework-page/homework-appoint-modal/thunk';

import HomeworkPageCore from './HomeworkPageCore';

const HomeworkPage = () => {
  const appState = useSelector((state: IRootState) => state);
  const { currentUserRoleId } = useSelector(
    (state: IRootState) => state.roleSelector
  );
  const { groupListByTeacherId } = useSelector(
    (state: IRootState) => state.homeworkAppointModal
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeworks(appState.roleSelector.currentUserRoleId));
  }, [appState.roleSelector.currentUserRoleId]);
  useEffect(() => {
    !groupListByTeacherId.length &&
      dispatch(getGroupsByTeacherId(currentUserRoleId));
  }, [groupListByTeacherId.length]);

  return (
    <HomeworkPageCore
      settings={
        appState.homeworkPage.pageOptionsByRole[
          Role[appState.roleSelector.currentUserRoleId]
        ]
      }
    />
  );
};

export default React.memo(HomeworkPage);
