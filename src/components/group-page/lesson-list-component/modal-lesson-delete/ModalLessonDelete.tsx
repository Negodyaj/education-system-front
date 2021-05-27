import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../../store';
import {
  deleteLesson,
  setIsOpenModalDeleteLesson,
  setSelectedLesson,
} from '../../../../store/group-page/lesson/action-creators';
import { CurrentLesson } from '../lesson-list-table/LessonsTableByGroup';

import {
  ButtonCloseModalDeleteLesson,
  CommonButton,
  ModalBackDeleteLesson,
  ModalBottomDeleteLesson,
  ModalContentDeleteLesson,
  ModalDeleteLesson,
  ModalHeaderDeleteLesson,
  RoundButton,
} from './ModalLessonDeleteStyled';

const ModalLessonDelete = () => {
  const dispatch = useDispatch();
  const dataLessonForDelete = useSelector(
    (state: IRootState) => state.lessonByGroup.currentLesson
  );

  const closeModalDeleteLesson = () => {
    dispatch(setIsOpenModalDeleteLesson());
    dispatch(setSelectedLesson({} as CurrentLesson));
  };

  const deleteLessonById = () => {
    dispatch(deleteLesson());
  };

  return (
    <ModalBackDeleteLesson>
      <ModalDeleteLesson>
        <ModalHeaderDeleteLesson>
          <ButtonCloseModalDeleteLesson onClick={closeModalDeleteLesson}>
            <FontAwesomeIcon icon="times" />
          </ButtonCloseModalDeleteLesson>
        </ModalHeaderDeleteLesson>
        <ModalContentDeleteLesson>
          Вы уверены, что хотите удалить занятие, запланированное на{' '}
          {dataLessonForDelete.lessonDate}?
        </ModalContentDeleteLesson>
        <ModalBottomDeleteLesson>
          <CommonButton onClick={closeModalDeleteLesson}>Отмена</CommonButton>
          <CommonButton onClick={deleteLessonById}>Да</CommonButton>
        </ModalBottomDeleteLesson>
      </ModalDeleteLesson>
    </ModalBackDeleteLesson>
  );
};

export default ModalLessonDelete;
