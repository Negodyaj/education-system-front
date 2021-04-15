import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { closeModalDeleteCourse } from '../../../store/courses-page/action-creators';
import './ModalWindowDelete.css';

function ModalWindowDelete() {
  
  const dispatch = useDispatch();
  const courseId = useSelector((state: IRootState) => state.coursePage.courseForDeleteId);

  const closeModalWindow = () => {
    dispatch(closeModalDeleteCourse());
  }

  const deleteCourse = (id: number | undefined) => {
    dispatch(deleteCourse(id))
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
            <button className="button-yes" onClick={() => {deleteCourse(courseId)}}>Да</button>
          </div>
      </div>
    </div>
  )
}

export default ModalWindowDelete;