import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IRootState } from '../../../store';
import { showToggleModalDeleteCourseAction } from '../../../store/courses-page/action-creators';
import { deleteCourse, getCourses } from '../../../store/courses-page/thunk'
import './ModalWindowDelete.css';

function ModalWindowDelete() {
  const dispatch = useDispatch();
  const deleteId = useSelector((state: IRootState) => state.coursePage.idCourseForDelete);

  const closeModalWindow = () => {
    dispatch(showToggleModalDeleteCourseAction(deleteId));
  }

  const deleteCourseById = () => {
    dispatch(deleteCourse(deleteId));
    dispatch(getCourses());
  }

  return (
    <div className="modal-back">
      <div className="modal">
          <div className="modal-header-course-delete">
              <button className="button-close-course-delete" onClick={closeModalWindow}>
                  <FontAwesomeIcon icon='times' />
              </button>
          </div>
          <div className="modal-content-course-delete">Вы уверены, что хотите удалить данный курс?</div>
          <div className="modal-bottom-course-delete">
            <button className="button-no" onClick={closeModalWindow}>Отмена</button>
            <button className="button-yes" onClick={deleteCourseById}>Да</button>
          </div>
      </div>
    </div>
  )
}

export default ModalWindowDelete;