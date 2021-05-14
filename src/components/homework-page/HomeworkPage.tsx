import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Role } from '../../enums/role';
import { IRootState } from '../../store';
import { loadHomeworkList } from '../../store/homework-page/thunk';

import HomeworkPageCore from './HomeworkPageCore';

function HomeworkPage() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadHomeworkList(appState.roleSelector.currentUserRoleId));
  }, [appState.roleSelector.currentUserRoleId]);

  return (
    <HomeworkPageCore
      settings={
        appState.homeworkPage.pageOptionsByRole[
          Role[appState.roleSelector.currentUserRoleId]
        ]
      }
    />
  );
}
export default HomeworkPage;
