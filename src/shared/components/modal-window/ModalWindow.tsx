import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../enums/ChildIndex';
import { CourseInput } from '../../../interfaces/CourseInput';
import { IRootState } from '../../../store';
import { INIT_COURSE_TO_REGISTER } from '../../../store/courses-page/reducer';
import { toggleModalWindow } from '../../../store/modal-window/action-creators';

import { Children } from './children/Children';
import { FormChild } from './children/form-child/FormChild';
import {
  ButtonClose,
  HeadModal,
  ModalBackground,
  ModalFormCreate,
  ModalHeader,
} from './ModalWindowCreateFormStyled';

export interface ModalWindowSettings {
  headerName?: string;
  defaultValues?: any;
}
function ModalWindow() {
  const dispatch = useDispatch();
  const state = useSelector((stateArg: IRootState) => stateArg);
  const { isVisible, childIndex, modalWindowSettings } = state.modalWindow;
  const { headerName } = modalWindowSettings[childIndex];
  const getDefaultModel = () => modalWindowSettings[childIndex].defaultValues;

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
        <FormChild<ReturnType<typeof getDefaultModel>>
          childIndex={childIndex}
          defaultValues={getDefaultModel()}
        />
      </ModalFormCreate>
    </ModalBackground>
  );
}

export default ModalWindow;
