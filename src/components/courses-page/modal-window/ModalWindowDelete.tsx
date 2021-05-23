import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  deleteCourse,
  showToggleModalDeleteCourseAction,
} from '../../../store/courses-page/action-creators';

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
        <div>
          <button className="round-button" onClick={closeModalWindow}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
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
