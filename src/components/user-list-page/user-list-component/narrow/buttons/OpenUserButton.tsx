import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronArrow } from '../../../../../shared/styled-components/ChevronArrow';
import {
  ACTIVE,
  NOT_ACTIVE,
} from '../../../../../shared/styled-components/consts';
import { IRootState } from '../../../../../store';
import { openListItem } from '../../../../../store/user-list-page/action-creators';

function OpenUserButton(props: { userId: number }) {
  const { userId } = props;
  const dispatch = useDispatch();
  const { openedItemId } = useSelector(
    (state: IRootState) => state.userListPage
  );
  const arrowOnClick = (id: number) => {
    dispatch(openListItem(openedItemId === id ? 0 : id));
  };

  return (
    <ChevronArrow
      onClick={() => arrowOnClick(userId)}
      className={openedItemId === userId ? ACTIVE : NOT_ACTIVE}
    />
  );
}
export default OpenUserButton;
