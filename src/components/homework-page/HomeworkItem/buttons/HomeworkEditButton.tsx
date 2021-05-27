import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ChildIndex } from '../../../../enums/ChildIndex';
import { Homework } from '../../../../interfaces/Homework';
import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';
import {
  loadHomeworkForModalWatcherAction,
  rememberHomeworkForModal,
} from '../../../../store/homework-page/add-homework-modal/action-creators';
import { toggleModalWindow } from '../../../../store/modal-window/action-creators';

function HomeworkEditButton(props: { hw: Homework }) {
  const { hw } = props;
  const dispatch = useDispatch();
  const editHomework = () => {
    dispatch(toggleModalWindow(ChildIndex.EditHomework));
    dispatch(loadHomeworkForModalWatcherAction());
    dispatch(rememberHomeworkForModal(hw));
  };

  return (
    <RoundButton onClick={editHomework} title="редактировать">
      <FontAwesomeIcon icon="edit" />
    </RoundButton>
  );
}
export default HomeworkEditButton;
