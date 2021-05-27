import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Material } from '../../../../../interfaces/Materials';
import { CommonButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  deleteMaterial,
  setIsOpenModalDeleteMaterial,
  setSelectedMaterial,
} from '../../../../../store/course-edition/action-creators';
import {
  ButtonCloseModalDelete,
  ModalBackDelete,
  ModalBottomDelete,
  ModalContentDelete,
  ModalDelete,
  ModalHeaderDelete,
} from '../../ModalDeleteStyled';

const ModalDeleteMaterial = () => {
  const dispatch = useDispatch();
  const dataForDeleteMaterial = useSelector(
    (state: IRootState) => state.courseEditionPage.currentMaterial
  );

  const closeModalDelete = () => {
    dispatch(setIsOpenModalDeleteMaterial());
    dispatch(setSelectedMaterial({} as Material));
  };

  const deleteMaterialById = () => {
    dispatch(deleteMaterial());
  };

  return (
    <ModalBackDelete>
      <ModalDelete>
        <ModalHeaderDelete>
          <ButtonCloseModalDelete onClick={closeModalDelete}>
            <FontAwesomeIcon icon="times" />
          </ButtonCloseModalDelete>
        </ModalHeaderDelete>
        <ModalContentDelete>
          Вы уверены, что хотите удалить материал{' '}
          {dataForDeleteMaterial.description.length > 50
            ? `${dataForDeleteMaterial.description.substr(0, 50)}...`
            : dataForDeleteMaterial.description}
          ?
        </ModalContentDelete>
        <ModalBottomDelete>
          <CommonButton onClick={closeModalDelete}>Отмена</CommonButton>
          <CommonButton onClick={deleteMaterialById}>Да</CommonButton>
        </ModalBottomDelete>
      </ModalDelete>
    </ModalBackDelete>
  );
};

export default ModalDeleteMaterial;
