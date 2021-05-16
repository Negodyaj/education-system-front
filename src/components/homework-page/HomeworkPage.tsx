import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Role } from '../../enums/role';
import { homeworkList } from '../../shared/tmp-mock-data/hw/homeworkList';
import { IRootState } from '../../store';
import { loadHomeworkSuccess } from '../../store/homework-page/action-creators';

import AddHomeworkModal from './add-homework-modal/AddHomeworkModal';
import HomeworkPageCore from './HomeworkPageCore';

function HomeworkPage() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadHomeworkSuccess(homeworkList, appState.roleSelector.currentUserRoleId)
    );
  }, [appState.roleSelector.currentUserRoleId]);

  return (
    <>
      <HomeworkPageCore
        settings={
          appState.homeworkPage.pageOptionsByRole[
            Role[appState.roleSelector.currentUserRoleId]
          ]
        }
      />
      <AddHomeworkModal />
    </>
  );
}
export default HomeworkPage;
