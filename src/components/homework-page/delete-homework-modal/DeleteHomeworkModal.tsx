import { MouseEventHandler, useState } from 'react';
import './DeleteHomeworkModal.css';

interface DeleteHomeworkModalProps {
  Visibility: string;
  CloseModalHandler: () => void;
}

function DeleteHomeworkModal(props: DeleteHomeworkModalProps) {
  const CloseModalHandler = () => {
    props.CloseModalHandler();
  };

  const StopPropagation: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`delete-homework-modal-bg ${props.Visibility}`}
      onClick={CloseModalHandler}>
      <div
        className={`delete-homework-modal ${props.Visibility} table-row`}
        onClick={StopPropagation}>
        <div className="delete-homework-modal-header">
          <div
            className="delete-homework-modal-header-close-btn"
            onClick={CloseModalHandler}>
            +
          </div>
          +
        </div>
        <div className="delete-homework-modal-main">
          Вы уверены, что хотите удалить запись?
        </div>
        <div className="delete-homework-modal-footer">
          <button className="btn-success" onClick={CloseModalHandler}>
            Нет
          </button>
          <button className="btn-danger" onClick={CloseModalHandler}>
            Да
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHomeworkModal;
