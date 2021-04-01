
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTcyNzMyNDIsImV4cCI6MTYxNzQ0NjA0MiwiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.N8rFzXWpHPypwT9m4GzmkvQuJwuOIAUrEbGtGzr-B8I';
    const [usersInState, setUsersInState] = useState<User[]>([]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
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
                setIsFetching(false);
            })
    }

    const getUpdatedUsers = (newUser: User) => {
        getUsers();
        props.sendNotification({
            type: "success",
            text: "пользователь " + newUser.firstName + " " + newUser.lastName + " успешно " + actionInNotification,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const onEditClick = (userToEditId?: number) => {
        setIsEditModeOn(true);
        setUserToEdit(
            usersInState.filter((user) => {
                return user.id == userToEditId
            })[0]
        )
    }
    const onSaveClick = (newUser: User) => {
        let method: string;
        let registerOrUpdateAction: string;
        setIsFetching(true);
        if (newUser.id === undefined) {
            method = "POST";
            registerOrUpdateAction = "register";
            actionInNotification = stringAdded;
        } else {
            method = "PUT";
            registerOrUpdateAction = newUser.id.toString();
            actionInNotification = stringChanged;
        }
        fetch('https://80.78.240.16:7070/api/User/' + registerOrUpdateAction, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                birthDate: newUser.birthDate,
                login: newUser.login,
                phone: newUser.phone,
                userPic: newUser.userPic,
                email: newUser.email,
                roleIds: newUser.role?.map(role => role.value)
            })
        }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                !data.Code ? getUpdatedUsers(newUser) : (() => {
                    props.sendNotification({
                        type: "error",
                        text: "ошибка сохранения пользователя " + newUser.firstName + " " + newUser.lastName,
                        isDismissible: true,
                        timestamp: Date.now()
                    });
                    getUsers();
                }
                )();
            })
    }

    const renderUserList = () => {
        console.log(usersInState[0].birthDate)
        return <UserList
            roleId={props.roleId}
            users={usersInState}
            onEditClick={onEditClick}></UserList>
    }
    const renderUserEditForm = () => {
        return <UserEditForm
            roleId={props.roleId}
            user={userToEdit}
            onCancelClick={setIsEditModeOn}
            onSaveClick={onSaveClick}></UserEditForm>
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