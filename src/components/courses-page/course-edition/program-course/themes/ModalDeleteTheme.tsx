import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Themes } from '../../../../../interfaces/Themes';
import { CommonButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  deleteTheme,
  setIsOpenModalDeleteTheme,
  setSelectedTheme,
} from '../../../../../store/course-edition/action-creators';
import {
  ButtonCloseModalDelete,
  ModalBackDelete,
  ModalBottomDelete,
  ModalContentDelete,
  ModalDelete,
  ModalHeaderDelete,
} from '../../ModalDeleteStyled';

const ModalDeleteTheme = () => {
  const dispatch = useDispatch();
  const dataForDeleteTheme = useSelector(
    (state: IRootState) => state.courseEditionPage.currentTheme
  );

  const closeModalDelete = () => {
    dispatch(setIsOpenModalDeleteTheme());
    dispatch(setSelectedTheme({} as Themes));
  };

  const deleteThemeById = () => {
    dispatch(deleteTheme());
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
          Вы уверены, что хотите удалить тему {dataForDeleteTheme.name}?
        </ModalContentDelete>
        <ModalBottomDelete>
          <CommonButton onClick={closeModalDelete}>Отмена</CommonButton>
          <CommonButton onClick={deleteThemeById}>Да</CommonButton>
        </ModalBottomDelete>
      </ModalDelete>
    </ModalBackDelete>
  );
};

export default ModalDeleteTheme;
