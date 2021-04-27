import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import React, { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { User } from "../../../interfaces/User";
import ConfirmationDialog from "../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { userListUrl } from "../../../shared/consts";
import { IRootState } from "../../../store";
import { deleteUserRequest } from "../../../store/user-list-page/thunk";

function DeleteButton(props: { user: User }) {
    const dispatch = useDispatch();
    const [isModalShow, setIsModalShow] = useState(false);
    const appState = useSelector((state: IRootState) => state);
    const [confirmationMessage, setConfirmationMessage] = useState('Вы уверены?')
    const { idToDelete } = useParams<{ idToDelete?: string; }>();
    const history = useHistory();
    useEffect(() => {
        if (idToDelete) {
            setIsModalShow(true);
            let userToDelete = appState.userListPage.userList.filter(u => u.id === Number.parseInt(idToDelete))[0]
            setConfirmationMessage(`Вы действительно хотите удалить пользователя ${userToDelete.firstName} ${userToDelete.lastName}?`)
        }
    })
    const deleteUser = (decision: boolean) => {
        if (decision === true) {
            dispatch(deleteUserRequest(idToDelete || "", history));
        } else if (decision === false) {
            setIsModalShow(false);
            history.push(`/${userListUrl}`)
        }
    }
    const onDeleteClick = (userToDelete: User) => {
        history.push(`/${userListUrl}/${userToDelete.id}`)
    }
    return (
        <>
            <button className="round-button" onClick={() => onDeleteClick(props.user)}>
                <FontAwesomeIcon icon="trash" />
            </button>
            <ConfirmationDialog
                isShown={isModalShow}
                confirmLabel='Да'
                declineLabel='Нет'
                message={confirmationMessage}
                title='Удаление пользователя'
                callback={deleteUser}></ConfirmationDialog>
        </>
    )
}
export default DeleteButton;