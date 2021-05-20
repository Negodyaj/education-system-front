import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';

import { User } from '../../../../interfaces/User';
import ConfirmationDialog from '../../../../shared/components/confirmation-dialog/ConfirmationDialog';
import { IRootState } from '../../../../store';
import { setUserToDelete } from '../../../../store/user-list-page/action-creators';
import { deleteUserRequest } from '../../../../store/user-list-page/thunk';

function DeleteButton(props: { user: User }) {
  const dispatch = useDispatch();
  const [isModalShow, setIsModalShow] = useState(false);
  const appState = useSelector((state: IRootState) => state);
  const [confirmationMessage, setConfirmationMessage] = useState('Вы уверены?');
  const deleteUser = (decision: boolean) => {
    if (decision === true) {
      dispatch(deleteUserRequest(appState.userListPage.userToDelete.id));
    } else if (decision === false) {
      setIsModalShow(false);
    }
  };
  const onDeleteClick = (userToDelete: User) => {
    dispatch(setUserToDelete(userToDelete));
    setConfirmationMessage(
      `Вы действительно хотите удалить пользователя ${userToDelete.firstName} ${userToDelete.lastName}?`
    );
    setIsModalShow(true);
  };

  return (
    <>
      <button
        className="round-button"
        onClick={() => onDeleteClick(props.user)}>
        <FontAwesomeIcon icon="trash" />
      </button>
      <ConfirmationDialog
        isShown={isModalShow}
        confirmLabel="Да"
        declineLabel="Нет"
        message={confirmationMessage}
        title="Удаление пользователя"
        callback={deleteUser}
      />
    </>
  );
}
export default DeleteButton;
