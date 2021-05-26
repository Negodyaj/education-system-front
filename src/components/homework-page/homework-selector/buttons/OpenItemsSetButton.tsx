import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronArrow } from '../../../../shared/styled-components/ChevronArrow';
import {
  ACTIVE,
  NOT_ACTIVE,
} from '../../../../shared/styled-components/consts';
import { IRootState } from '../../../../store';
import { openItemsSet } from '../../../../store/homework-page/action-creators';

const OpenItemsSetButton = (props: { openedItemName: string }) => {
  const { openedItemName } = props;
  const dispatch = useDispatch();
  const { openedItemSetsNames } = useSelector(
    (state: IRootState) => state.homeworkPage
  );
  const arrowOnClick = (itemsSetNameArg: string) => {
    dispatch(openItemsSet(itemsSetNameArg));
  };

  return (
    <ChevronArrow
      onClick={() => arrowOnClick(openedItemName)}
      className={
        openedItemSetsNames.includes(openedItemName) ? ACTIVE : NOT_ACTIVE
      }
    />
  );
};

export default React.memo(OpenItemsSetButton);
