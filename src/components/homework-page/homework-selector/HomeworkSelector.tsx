import React from 'react';
import { useSelector } from 'react-redux';

import { Role } from '../../../enums/role';
import { ACTIVE, NOT_ACTIVE } from '../../../shared/styled-components/consts';
import { IRootState } from '../../../store';
import {
  HomeworkItemsSet,
  HomeworkItemsSetHeader,
  HomeworkSelectorContainer,
  ItemsSetName,
} from '../styled-components/consts';
import { getEnToRuTranslation } from '../../../shared/converters/enumToDictionaryEntity';
import { currentUserRoleIdSelector } from '../../../store/role-selector/selectors';
import HomeworkItemBodyList from '../HomeworkItem/HomeworkItemBodyList';

import OpenItemsSetButton from './buttons/OpenItemsSetButton';

export function HomeworkSelector() {
  const appState = useSelector((state: IRootState) => state);
  const currentUserRoleId = currentUserRoleIdSelector(appState);
  const {
    homeworkList,
    homeworkButtonsCell,
  } = appState.homeworkPage.pageOptionsByRole[Role[currentUserRoleId]];

  return (
    <HomeworkSelectorContainer>
      {Object.keys(homeworkList).map((type) => (
        <React.Fragment key={type}>
          {Object.keys(homeworkList[type]).length >= 1 &&
            getEnToRuTranslation(type)}
          {Object.keys(homeworkList[type]).map((itemsSetName) => {
            const openedItemName = `${type} ${itemsSetName}`;

            return (
              <HomeworkItemsSet
                className={
                  appState.homeworkPage.openedItemSetsNames.includes(
                    openedItemName
                  )
                    ? ACTIVE
                    : NOT_ACTIVE
                }
                key={itemsSetName}>
                <HomeworkItemsSetHeader>
                  <ItemsSetName>{itemsSetName}</ItemsSetName>
                  <OpenItemsSetButton openedItemName={openedItemName} />
                </HomeworkItemsSetHeader>
                <HomeworkItemBodyList
                  homeworkList={homeworkList[type][itemsSetName]}
                  homeworkButtonsCell={homeworkButtonsCell[type]}
                />
              </HomeworkItemsSet>
            );
          })}
        </React.Fragment>
      ))}
    </HomeworkSelectorContainer>
  );
}
