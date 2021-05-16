import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronArrow } from '../../../../shared/styled-components/ChevronArrow';
import {
  ACTIVE,
  NOT_ACTIVE,
} from '../../../../shared/styled-components/consts';
import { IRootState } from '../../../../store';
import { openItemsSet } from '../../../../store/homework-page/action-creators';

function OpenItemsSetButton(props: { itemsSetName: string }) {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const arrowOnClick = (itemsSetName: string) => {
    dispatch(openItemsSet(itemsSetName));
  };

  return (
    <ChevronArrow
      onClick={() => arrowOnClick(props.itemsSetName)}
      className={
        appState.homeworkPage.openedItemSetsNames.includes(props.itemsSetName)
          ? ACTIVE
          : NOT_ACTIVE
      }
    />
  );
}

export default OpenItemsSetButton;
