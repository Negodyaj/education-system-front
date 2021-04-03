
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Role } from '../../enums/role';
import { dictionary } from '../../shared/converters/enumToDictionaryEntity';
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
    const [usersInState, setUsersInState] = useState<User[]>([]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [userToEdit, setUserToEdit] = useState<User | undefined>();
    const [methodInForm, setMethodInForm] = useState('');
    const ids: (number | undefined)[] = Array.from(usersInState, user => user.id);
    const stringChanged = "изменён";
    const stringAdded = 'добавлен';
    let actionInNotification = stringChanged;

    const getUsers = () => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsersInState(data);
                console.log(usersInState)
                setIsFetching(false);
            })
    }

    const checkUpdatedUsers = (addedUserForNotification: User) => {
        setIsFetching(true);
        getUsers();
        props.sendNotification({
            type: "success",
            text: "пользователь " + addedUserForNotification.firstName + " " + addedUserForNotification.lastName + " успешно " + actionInNotification,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const getUserToUpdate = (userToEditId: number) => {
        fetch(url + '/' + userToEditId, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserToEdit(Object.assign({}, data));
                setIsFetching(false);
                setMethodInForm('PUT');
                setIsEditModeOn(true);
            })
    }
    const onEditClick = (userToEditId?: number) => {
        if (userToEditId) {
            getUserToUpdate(userToEditId)
        }
        else {
            setUserToEdit(undefined);
            setIsEditModeOn(true);
        }
    }
    const onSaveClick = (addedUserForNotification: User) => {
        checkUpdatedUsers(addedUserForNotification)
    }

    const renderUserList = () => {
        return <UserList
            roleId={props.roleId}
            users={usersInState}
            onEditClick={onEditClick}></UserList>
    }
    const renderUserEditForm = () => {
        return <UserEditForm
            roleId={props.roleId}
            userToEdit={userToEdit}
            onCancelClick={setIsEditModeOn}
            onSaveClick={onSaveClick}
            sendNotification={props.sendNotification}
            url={url}
            token={token}
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
        </div>
    )
}

export default UserPage;