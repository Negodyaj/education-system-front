import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  deleteCourse,
  getCourses,
  showToggleModalDeleteCourseAction,
} from '../../../store/courses-page/action-creators';
import { ModalHeaderAddCourse } from '../NewCourseStyled';

import {
  Modal,
  ModalBack,
  ModalButtomCourseDelete,
  ModalContentCourseDelete,
} from './ModalWindowDeleteStyled';

function ModalWindowDelete() {
  const dispatch = useDispatch();
  const deleteId = useSelector(
    (state: IRootState) => state.coursePage.idCourseForDelete
  );

  const closeModalWindow = () => {
    dispatch(showToggleModalDeleteCourseAction());
  };

  const deleteCourseById = () => {
    dispatch(deleteCourse());
    console.log(deleteId);
  };

  return (
    <ModalBack>
      <Modal>
        <ModalHeaderAddCourse>
          <button className="round-button" onClick={closeModalWindow}>
            <FontAwesomeIcon icon="times" />
          </button>
        </ModalHeaderAddCourse>
        <ModalContentCourseDelete>
          Вы уверены, что хотите удалить данный курс?
        </ModalContentCourseDelete>
        <ModalButtomCourseDelete>
          <button className="common-button" onClick={closeModalWindow}>
            Отмена
          </button>
          <button className="common-button" onClick={deleteCourseById}>
            Да
          </button>
        </ModalButtomCourseDelete>
      </Modal>
    </ModalBack>
  );
}

export default ModalWindowDelete;
