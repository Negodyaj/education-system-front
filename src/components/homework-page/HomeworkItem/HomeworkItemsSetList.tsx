import React from 'react';
import { useSelector } from 'react-redux';

import { Homework } from '../../../interfaces/Homework';
import { IndexedObj } from '../../../interfaces/IndexedObj';
import { getEnToRuTranslation } from '../../../shared/converters/enumToDictionaryEntity';
import { ACTIVE, NOT_ACTIVE } from '../../../shared/styled-components/consts';
import { IRootState } from '../../../store';
import OpenItemsSetButton from '../homework-selector/buttons/OpenItemsSetButton';
import {
  HomeworkItemsSet,
  HomeworkItemsSetHeader,
  ItemsSetName,
  SetType,
} from '../styled-components/consts';

import { HomeworkButtonsCellOptions } from './HomeworkButtonsCell';
import HomeworkItemBodyList from './HomeworkItemBodyList';

const HomeworkItemsSetList = (props: {
  set: IndexedObj<Homework[]>;
  setType: string;
  homeworkButtonsCell: HomeworkButtonsCellOptions;
}) => {
  const { set, setType, homeworkButtonsCell } = props;
  const appState = useSelector((state: IRootState) => state);

  return (
    <>
      <SetType>{getEnToRuTranslation(setType)}</SetType>
      {Object.keys(set).map((itemsSetName) => {
        const openedItemName = `${setType} ${itemsSetName}`;

        return (
          <HomeworkItemsSet
            className={
              appState.homeworkPage.openedItemSetsNames.includes(openedItemName)
                ? ACTIVE
                : NOT_ACTIVE
            }
            key={itemsSetName}>
            <HomeworkItemsSetHeader>
              <ItemsSetName>{itemsSetName}</ItemsSetName>
              <OpenItemsSetButton openedItemName={openedItemName} />
            </HomeworkItemsSetHeader>
            <HomeworkItemBodyList
              homeworkList={set[itemsSetName]}
              homeworkButtonsCell={homeworkButtonsCell}
            />
          </HomeworkItemsSet>
        );
      })}
    </>
  );
};

export default React.memo(HomeworkItemsSetList);
