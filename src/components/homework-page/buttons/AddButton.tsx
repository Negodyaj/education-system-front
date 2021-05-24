import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ChildIndex } from '../../../enums/ChildIndex';
import { CommonButton } from '../../../shared/styled-components/buttonStyledComponent';
import { toggleModalWindow } from '../../../store/modal-window/action-creators';

function AddButton(props: { isTurnedOn: boolean }) {
  const { isTurnedOn } = props;
  const dispatch = useDispatch();
  const addHomework = () => {
    dispatch(toggleModalWindow(ChildIndex.AddHomework));
  };

  return isTurnedOn ? (
    <CommonButton onClick={addHomework}>
      <FontAwesomeIcon icon="plus" />
      <span> Добавить</span>
    </CommonButton>
  ) : null;
}

export default AddButton;
