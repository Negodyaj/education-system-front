
import { useEffect, useState } from 'react';
import { Role } from '../../enums/role';
import { dictionary } from '../../shared/converters/enumToDictionaryEntity';
import NotificationData from '../../shared/interfaces/NotificationData';
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
//import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

interface UserPageProps {
    roleId: number;
    sendNotification: (newNotification: NotificationData) => void;
}

function UserPage(props: UserPageProps) {

    const url = 'https://80.78.240.16:7070/api/User';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTcxMDAwNjIsImV4cCI6MTYxNzI3Mjg2MiwiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.m5KxT3HuXeJyb2W2mNokTfhbgpsputj9jR8fpq3sbUc';



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
        let i: number = ids.indexOf(newUser.id);
        if (i === -1) {
            usersInState.push(newUser);
            actionInNotification = stringAdded;
        } else {
            usersInState[i] = newUser;
            actionInNotification = stringChanged;
        }
        setUsersInState(usersInState);
        props.sendNotification({
            type: "success",
            text: "пользователь " + newUser.firstName + " " + newUser.lastName + " успешно " + actionInNotification,
            isDismissible: true,
            timestamp: Date.now()
        })
    }

    const renderUserList = () => {

        return <UserList
            roleId={props.roleId}
            users={usersInState}
            onEditClick={onEditClick}></UserList>
    }
    const renderUserEditForm = () => {
        return <div></div>
        // <UserEditForm
        //     roleId={props.roleId}
        //     user={userToEdit}
        //     onCancelClick={setIsEditModeOn}
        //     onSaveClick={onSaveClick}></UserEditForm>
    }

    return (
        <div className="user-page">
            {
                isFetching
                    ?
                    <div>loading</div>
                    : (
                        isEditModeOn
                            ?
                            renderUserEditForm()
                            :
                            renderUserList()
                    )
            }
        </div>
    )
}

export default UserPage;