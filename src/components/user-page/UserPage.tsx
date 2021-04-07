
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ConfirmationDialog from '../../shared/components/confirmation-dialog/ConfirmationDialog';
import NotificationData from '../../shared/interfaces/NotificationData';
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

export type PreviousMethod = 'DELETE'|'NOT DELETE';

interface UserPageProps {
    roleId: number;
    sendNotification: (newNotification: NotificationData) => void;
}

function UserPage(props: UserPageProps) {

    const url = 'https://80.78.240.16:7070/api/User';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0J_RgNC10L_QvtC00LDQstCw0YLQtdC70YwiLCLQnNC10L3QtdC00LbQtdGAIl0sIm5iZiI6MTYxNzY0ODg5OCwiZXhwIjoxNjE3ODIxNjk4LCJpc3MiOiJFZHVjYXRpb25TeXN0ZW0uQXBpIiwiYXVkIjoiRGV2RWR1Y2F0aW9uIn0.2UJnH39pkpiqT3P9C9s-PAWmLi8Oiz_qr5TKZdkys7o';
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
                setIsFetching(false);
            })
    }

    const sendNotification = (data: { type: "error" | "success", message: string }) => {
        props.sendNotification({
            type: data.type,
            text: data.message,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    

    const checkUpdatedUsers = (addedUser: User, previousMethod: PreviousMethod|string) => {
        setIsFetching(true);
        getUsers();
        previousMethod === 'DELETE' && (actionInNotification = 'удалён');
        sendNotification({
            type: "success",
            message: "пользователь " + addedUser.firstName + " " + addedUser.lastName + " успешно " + actionInNotification
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
                .then(response => {
                    if (response.status > 200) {
                        throw response.json().then(value => {
                            sendNotification({ type: 'error', message: `${value.Code} ${value.Message}` })
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    checkUpdatedUsers(data, 'DELETE');
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
            reviseSending={checkUpdatedUsers}
            sendNotification={sendNotification}
            url={url}
            token={token}
            method={methodInForm}
            headers={headers}></UserEditForm>
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