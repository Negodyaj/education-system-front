
import { useEffect, useState } from 'react';
import { Role } from '../../enums/role';
import { dictionary } from '../../shared/converters/enumToDictionaryEntity';
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
import UserEditForm from './UserEditForm/UserEditForm';
import './UserPage.css'

interface UserPageProps {
    roleId: number;
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTY4Nzg2ODUsImV4cCI6MTYxNzA1MTQ4NSwiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.WF-xY1DS6VXWvgTTqdYfKP4T5gJ0g-tbPe4CL7DQcuM';

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

    const onEditClick = (userToEditId?: number) => {
        if (userToEditId === null) return;
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
        } else {
            usersInState[i] = newUser;
        }
        setUsersInState(usersInState);
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