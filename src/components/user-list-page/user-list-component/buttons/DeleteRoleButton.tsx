import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Role } from "../../../../enums/role";
import { User } from "../../../../interfaces/User";
import { sendDeleteRequestNoResponse } from "../../../../services/http.service";
import ConfirmationDialog from "../../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { IRootState } from "../../../../store";

function DeleteRoleButton(props: { user: User, roleId: number }) {
    const appState = useSelector((state: IRootState) => state);
    const [roleID, setRoleID] = useState(0);
    const [userID, setUserID] = useState(0);
    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('Вы уверены?')
    const onDeleteRoleClick = (user: User, roleId: number) => {
        setUserID(user.id as number);
        setRoleID(roleId);
        setConfirmationMessage(`Вы точно хотите избавить пользователя ${user.lastName}( ${user.login}) от роли ${Role[roleId]}?`)
        setIsModalShow(true);
    }
    const refreshUser = () => {
        const newUsers = [...appState.userListPage.userList];
        const index = newUsers.findIndex(u => u.id === userID)
        newUsers[index] = { ...newUsers[index], roles: newUsers[index].roles?.filter(r => r !== roleID) };
        appState.userListPage.userList = newUsers;
    }
    const deleteRole = async (decision: boolean) => {
        if (decision) {
            if (await sendDeleteRequestNoResponse(`User/${userID}/role/${roleID}`))
                refreshUser();
        }
        setIsModalShow(false);
    }
    return (
        <>
            <button className='round-button mini-button' onClick={() => onDeleteRoleClick(props.user, props.roleId)}>
                <FontAwesomeIcon icon="times" />
            </button>
            <ConfirmationDialog
                isShown={isModalShow}
                confirmLabel='Да'
                declineLabel='Нет'
                message={confirmationMessage}
                title='Удаление роли'
                callback={deleteRole}></ConfirmationDialog>
        </>
    )
}
export default DeleteRoleButton;