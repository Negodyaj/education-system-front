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
import { loadCourseForCloneHWModalWatcherAction } from '../../../../store/homework-page/clone-homework-modal/action-creators';
import { toggleModalWindow } from '../../../../store/modal-window/action-creators';

function HomeworkConeButton(props: { hw: Homework }) {
  const { hw } = props;
  const dispatch = useDispatch();
  const cloneHomework = () => {
    dispatch(toggleModalWindow(ChildIndex.CloneHomework));
    dispatch(loadCourseForCloneHWModalWatcherAction());
    dispatch(rememberHomeworkForModal(hw));
  };

  return (
    <RoundButton onClick={cloneHomework} title="клонировать">
      <FontAwesomeIcon icon="clone" />
    </RoundButton>
  );
}
export default HomeworkConeButton;
