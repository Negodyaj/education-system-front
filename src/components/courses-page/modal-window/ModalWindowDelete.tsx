import './ModalWindowDelete.css';

interface ModalWindowProps {
  onClickDelete: (num: number) => void
}

const ModalWindowDelete = (props: ModalWindowProps) => {
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
                    <button className="button-close" onClick={closeModalWindow}>X</button>
                </div>
                <div className="modal-text">Вы уверены, что хотите удалить данный курс?</div>
                <div className="modal-bottom">
                    <div></div>
                    <div className="select-delete">
                        <button className="button-yes" onClick={deleteCourse}>Да</button>
                        <button className="button-no" onClick={closeModalWindow}>Нет</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ModalWindowDelete;