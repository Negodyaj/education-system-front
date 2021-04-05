import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalWindowDelete.css';

interface ModalWindowProps {
  onClickDelete: (num: number) => void
}

function ModalWindowDelete(props: ModalWindowProps) {
  
  const closeModalWindow = () => {
    props.onClickDelete(0);
  }

  const deleteCourse = () => {
    props.onClickDelete(1);
  }

  return (
    <div className="modal-back">
      <div className="modal">
          <div className="modal-header">
              <button className="button-close-course-delete" onClick={closeModalWindow}>
                  <FontAwesomeIcon icon='times' />
              </button>
          </div>
          <div className="modal-text">Вы уверены, что хотите удалить данный курс?</div>
          <div className="modal-bottom">
            <button className="button-no" onClick={closeModalWindow}>Отмена</button>
            <button className="button-yes" onClick={deleteCourse}>Да</button>
          </div>
      </div>
    </div>
  )
}

export default ModalWindowDelete;