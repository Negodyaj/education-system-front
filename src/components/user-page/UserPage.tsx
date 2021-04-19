
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { responseHandlers } from '../../services/response-handler/responseHandler';
import ConfirmationDialog from '../../shared/components/confirmation-dialog/ConfirmationDialog';
import { UserEnd, UserUserDeleteIdEnd } from '../../shared/endpointConsts';
import NotificationData from '../../shared/interfaces/NotificationData';
import { User } from '../interfaces/User';
import { UserDelete } from '../interfaces/UserDelete';
import UserList from './user-list/UserList';
import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

interface UserPageProps {
    roleId: number;
    sendNotification: (newNotification: NotificationData | undefined) => void;
}

function UserPage(props: UserPageProps) {

    const url = 'User';
    const [usersInState, setUsersInState] = useState<User[] | undefined>();
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | undefined>();
    const [userToDeleteId, setUserToDeleteId] = useState<number>();
    const [isModalShown, setIsModalShown] = useState(false);
    const confirmationDeleteMessage = "Вы действительно хотите удалить пользователя?";
    const confirmationDeleteTitle = "Удаление пользователя";
    const confirmLabel = "Да";
    const declineLabel = "нет";

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setUsersInState(await sendGetRequest<User[]>(url, props.sendNotification, responseHandlers[UserEnd]))
    }
    const refreshUsers = () => {
        setUsersInState(undefined);
        getUsers();
    }
    const checkUpdatedUsers = () => {
        refreshUsers();
        setIsEditModeOn(false)
    }
  

    const getUserToUpdate = (userToEditId: number) => {
        //actualize user before UserEditForm rendering
    }
    const deleteUser = async (decision: boolean) => {
        if (decision === true) {
            if (await sendDeleteRequest<UserDelete[]>(
                url + '/' + userToDeleteId,
                props.sendNotification,
                responseHandlers[UserUserDeleteIdEnd])) {
                refreshUsers()
            };
        }
        setIsModalShown(false)
    }
    const onEditClick = (userToEditId?: number) => {
        if (userToEditId) {
            setUserToEdit([...usersInState as User[]].filter(u => u.id === userToEditId)[0]);
        } else {
            setUserToEdit(undefined);
        }
        setIsEditModeOn(true);
    }
    const onDeleteClick = (userToDeleteIdArg: number) => {
        setUserToDeleteId(userToDeleteIdArg);
        setIsModalShown(true);
    }

    return (
        <div className="user-page">
            {
                !usersInState ?
                    <div>
                        <FontAwesomeIcon icon="spinner" />
                    </div> : (
                        isEditModeOn
                            ?
                            <UserEditForm
                                roleId={props.roleId}
                                userToEdit={userToEdit}
                                setIsEditModeOn={setIsEditModeOn}
                                reviseSending={checkUpdatedUsers}
                                sendNotification={props.sendNotification}
                                url={url}></UserEditForm>
                            :
                            <UserList
                                roleId={props.roleId}
                                users={usersInState}
                                onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}
                                sendNotification={props.sendNotification}
                                ></UserList>
                    )
            }
            <ConfirmationDialog
                isShown={isModalShown}
                confirmLabel={confirmLabel}
                declineLabel={declineLabel}
                message={confirmationDeleteMessage}
                title={confirmationDeleteTitle}
                callback={deleteUser}></ConfirmationDialog>
        </div>
    )
}
export default UserPage;