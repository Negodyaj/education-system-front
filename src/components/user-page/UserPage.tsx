
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import ConfirmationDialog from '../../shared/components/confirmation-dialog/ConfirmationDialog';
import NotificationData from '../../shared/interfaces/NotificationData';
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

export type PreviousMethod = 'DELETE' | 'NOT DELETE';

interface UserPageProps {
    roleId: number;
    sendNotification: (newNotification: NotificationData) => void;
}

function UserPage(props: UserPageProps) {

    const url = 'User';
    const [usersInState, setUsersInState] = useState<User[] | undefined>();
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | undefined>();
    const [userToDeleteId, setUserToDeleteId] = useState<number>();
    const [methodInForm, setMethodInForm] = useState('');
    const [isModalShown, setIsModalShown] = useState(false);
    const stringChanged = "изменён";
    const stringAdded = 'добавлен';
    let actionInNotification = methodInForm === "POST" ? stringAdded : stringChanged;
    const confirmationDeleteMessage = "Вы действительно хотите удалить пользователя?";
    const confirmationDeleteTitle = "Удаление пользователя";
    const confirmLabel = "Да";
    const declineLabel = "нет";


    const getUsers = async () => {
        setUsersInState(await sendGetRequest<User[]>(url))
    }

    const sendNotification = (data: { type: "error" | "success", message: string }) => {
        props.sendNotification({
            type: data.type,
            text: data.message,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    const refreshUsers = () => {
        setUsersInState(undefined);
        getUsers();
    }
    const checkUpdatedUsers = (addedUser: User) => {
        refreshUsers();
        setIsEditModeOn(false)
    }

    const getUserToUpdate = (userToEditId: number) => {
        
    }

    const deleteUser = async (decision: boolean) => {
        setIsModalShown(true);
        if (decision === true) {
            if (await sendDeleteRequest(url + '/' + userToDeleteId)) {
                refreshUsers()
            };
        }
        setIsModalShown(false)
    }

    useEffect(() => {
        getUsers();
    }, []);

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
                isFetching ?
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
                                sendNotification={sendNotification}
                                url={url}></UserEditForm>
                            :
                            usersInState && <UserList
                                roleId={props.roleId}
                                users={usersInState}
                                onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}></UserList>
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