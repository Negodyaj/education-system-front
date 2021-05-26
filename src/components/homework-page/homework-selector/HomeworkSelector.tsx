import React from 'react';
import { useSelector } from 'react-redux';

import { Role } from '../../../enums/role';
import { IRootState } from '../../../store';
import { HomeworkSelectorContainer } from '../styled-components/consts';
import { currentUserRoleIdSelector } from '../../../store/role-selector/selectors';
import HomeworkItemsSetList from '../HomeworkItem/HomeworkItemsSetList';

const HomeworkSelector = () => {
  const appState = useSelector((state: IRootState) => state);
  const currentUserRoleId = currentUserRoleIdSelector(appState);
  const {
    homeworkList,
    homeworkButtonsCell,
  } = appState.homeworkPage.pageOptionsByRole[Role[currentUserRoleId]];

  return (
    <HomeworkSelectorContainer>
      {Object.keys(homeworkList).map((setType) => (
        <React.Fragment key={setType}>
          {Object.keys(homeworkList[setType]).length >= 1 && (
            <HomeworkItemsSetList
              set={homeworkList[setType]}
              setType={setType}
              homeworkButtonsCell={homeworkButtonsCell[setType]}
              key={setType}
            />
          )}
        </React.Fragment>
      ))}
    </HomeworkSelectorContainer>
  );
};

export default React.memo(HomeworkSelector);
