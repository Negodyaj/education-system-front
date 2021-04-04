
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfo } from 'node:os';
import React, { useEffect, useState } from 'react';
import ConfirmationDialog from '../../shared/components/confirmation-dialog/ConfirmationDialog';
import ConfirmationDialogContent from '../../shared/components/confirmation-dialog/ConfirmationDialogContent';
import NotificationData from '../../shared/interfaces/NotificationData';
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

interface UserPageProps {
    roleId: number;
    sendNotification: (newNotification: NotificationData) => void;
}

function UserPage(props: UserPageProps) {

    const url = 'https://80.78.240.16:7070/api/User';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTc0NDk3MjcsImV4cCI6MTYxNzYyMjUyNywiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.h_GX1srLTRp2r-D8gzfjikmmxW2WJZ6PwU3703G0bMM';
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
    const [usersInState, setUsersInState] = useState<User[]>([]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
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

    const getUsers = () => {
        fetch(url, {
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                setUsersInState(data);
                console.log(usersInState)
                setIsFetching(false);
            })
    }

    const checkUpdatedUsers = (modifiedUser: User) => {
        setIsFetching(true);
        getUsers();
        props.sendNotification({
            type: "success",
            text: "пользователь " + modifiedUser.firstName + " " + modifiedUser.lastName + " успешно " + actionInNotification,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    const getUserToUpdate = (userToEditId: number) => {
        fetch(url + '/' + userToEditId, {
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                setUserToEdit(Object.assign({}, data));
                setMethodInForm('PUT');
                setIsFetching(false);
                setIsEditModeOn(true);
            })
    }

    const deleteUser = (decision: boolean) => {
        if (decision) {
            fetch(url + '/' + userToDeleteId, {
                method: 'DELETE',
                headers: headers
            })
            .then(response => response.json())
            .then(data => {
                checkUpdatedUsers([...usersInState].filter(u => u.id === userToDeleteId)[0]);
            })
        }
        setIsModalShown(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const onEditClick = (userToEditId?: number) => {
        if (userToEditId) {
            getUserToUpdate(userToEditId)
        }
        else {
            setUserToEdit(undefined);
            setMethodInForm('POST')
            setIsEditModeOn(true);
        }
    }

    const onDeleteClick = (userToDeleteIdArg: number) => {
        setUserToDeleteId(userToDeleteIdArg);
        setIsModalShown(true);
    }

    const renderUserList = () => {
        return <UserList
            roleId={props.roleId}
            users={usersInState}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}></UserList>
    }
    const renderUserEditForm = () => {
        return <UserEditForm
            roleId={props.roleId}
            userToEdit={userToEdit}
            setIsEditModeOn={setIsEditModeOn}
            sendUserPropsForSuccessNotification={checkUpdatedUsers}
            sendNotification={props.sendNotification}
            url={url}
            token={token}
            headers={headers}
            method={methodInForm}></UserEditForm>
    }

    return (
        <div className="user-page">
            {
                isFetching ?
                    <div>
                        <FontAwesomeIcon icon="spinner" />
                    </div> : (
                        isEditModeOn ? renderUserEditForm() : renderUserList()
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