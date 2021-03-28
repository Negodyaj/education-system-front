
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

    const users: User[] = [
        {
            id: 430,
            name: "Гай Юлий",
            secondName: "Цезарь",
            birthDate: new Date(0, 1, 1),
            login: "Lorem",
            password: "cesar",
            phone: "+7 987 654 32 10",
            role: [{
                value: Role.Student,
                label: dictionary[Role[Role.Student]]
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 40,
            name: "Марк Аврелий",
            secondName: "Антонин",
            birthDate: new Date(3, 2, 2),
            login: "ave",
            password: "cesar",
            phone: "+7 897 012 345 67 89",
            role: [{
                value: Role.Student,
                label: dictionary[Role[Role.Student]]
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 30,
            name: "Тит Элий Адриан сверхпредрассредоточенный",
            secondName: "Антонин",
            birthDate: new Date(103, 2, 21),
            login: "ipsum",
            password: "cesar",
            phone: "+7 999 887 23 05",
            role: [{
                value: Role.Student,
                label: dictionary[Role[Role.Student]]
            }, {
                value: Role.Manager,
                label: dictionary[Role[Role.Manager]]
            }, {
                value: Role.Admin,
                label: dictionary[Role[Role.Admin]]
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 4,
            name: "Публий Элий Траян",
            secondName: "Адриан",
            birthDate: new Date(1993, 2, 21),
            login: "dolor",
            password: "cesar",
            phone: "+7 902 089 97 42",
            role: [{
                value: Role.Student,
                label: dictionary[Role[Role.Student]]
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
    ];

    const url = 'https://80.78.240.16:7070/api/User';
    const token = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQkciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiLQodGC0YPQtNC10L3RgiIsIm5iZiI6MTYxNDcxMDc2MSwiZXhwIjoxNjE0NzE0MzYxLCJpc3MiOiJEZXZFZCIsImF1ZCI6IkNsaWVudCJ9.IxpSXCT-NINmfO-R9tjDwQdzlsOrvuwtRz3Jdm5CWEtjuh3l5nflJ974ORJ52RbV';

    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))


    const [usersInState, setUsersInState] = useState([...users]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const ids: (number | undefined)[] = Array.from(usersInState, user => user.id);
    const stringChanged = "изменён";
    const stringAdded = 'добавлен';
    let actionInNotification = stringChanged;

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
            text: "пользователь " + newUser.name + " " + newUser.secondName + " успешно " + actionInNotification,
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
        return <UserEditForm
            roleId={props.roleId}
            user={userToEdit}
            onCancelClick={setIsEditModeOn}
            onSaveClick={onSaveClick}></UserEditForm>
    }

    return (
        <div className="user-page">
            {
                isEditModeOn ? renderUserEditForm() : renderUserList()
            }
        </div>
    )
}

export default UserPage;