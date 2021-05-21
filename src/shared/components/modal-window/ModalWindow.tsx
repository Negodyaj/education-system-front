import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../enums/ChildIndex';
import { IRootState } from '../../../store';
import { toggleModalWindow } from '../../../store/modal-window/action-creators';

import { Children } from './children/Children';
import {
  ButtonClose,
  HeadModal,
  ModalBackground,
  ModalFormCreate,
  ModalHeader,
} from './ModalWindowCreateFormStyled';

export interface ModalWindowSettings {
  headerName?: string;
}

function ModalWindow() {
  const dispatch = useDispatch();
  const state = useSelector((stateArg: IRootState) => stateArg);
  const { isVisible, childIndex } = state.modalWindow;
  const { headerName } = state.modalWindow.modalWindowSettings[childIndex];

  return (
    <ModalBackground isVisible={isVisible}>
      <ModalFormCreate>
        <ModalHeader>
          <HeadModal>
            <h4>{headerName}</h4>
          </HeadModal>
          <ButtonClose
            onClick={() => dispatch(toggleModalWindow(ChildIndex.Closed))}>
            <FontAwesomeIcon icon="times" />
          </ButtonClose>
        </ModalHeader>
        <Children childIndex={childIndex} />
      </ModalFormCreate>
    </ModalBackground>
  );
}

export default ModalWindow;
