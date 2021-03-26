
import { useState } from 'react';
import { Roles } from '../../shared/components/roles/Roles';
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
                value: 2,
                label: "студент"
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
                value: 2,
                label: "студент"
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
                value: 2,
                label: "студент"
            }, {
                value: 3,
                label: "менеджер"
            }, {
                value: 4,
                label: "администратор"
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
                value: 2,
                label: "студент"
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
    ];

    const [usersInState, setUsersInState] = useState(users);
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