
import { useState, useEffect } from 'react';
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
            birthDate: new Date(),
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
            birthDate: new Date(),
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
            birthDate: new Date(),
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
            birthDate: new Date(),
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

    const [usersState, setUsersState] = useState(users);
    const [fakeUsers, setFakeUsers] = useState<User[]>([]);
    const [fakeUsersCopy, setFakeUsersCopy] = useState<User[]>([]);
    const [temp, setTemp] = useState(0);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const ids: (number | undefined)[] = Array.from(usersState, user => user.id);

    const getUsers = () => {
        fetch('https://80.78.240.16:7070/api/user')
            .then(response => response.json())
            .then(data => setFakeUsers(data));
    }

    useEffect(() => {
        getUsers();
    }, [fakeUsersCopy]);

    const onEditClick = (editedUserId?: number) => {
        if (editedUserId === null) return;
        setIsEditModeOn(true);
        setEditedUser(
            usersState.filter((user) => {
                return user.id == editedUserId
            })[0]
        )
    }
    const onSaveClick = (newUser: User) => {
        let i: number = ids.indexOf(newUser.id);
        if (i === -1) {
            usersState.push(newUser);
        } else {
            usersState[i] = newUser;
        }
        setUsersState(usersState);
    }

    const onClick = () => {
        setTemp(temp + 1);
        const newArr = fakeUsers.slice(0, fakeUsers.length - 1);
        // fetch('https://80.78.240.16:7070/api/user/42', {method: 'DELETE'})
        //.then(response => response.json())
        //.then(data => { const newArr = fakeUsers.filter(item => item.id !== 42); setFakeUsersCopy(newArr); }) 
        //.catch(error => showNotification(...))       
    }

    const addUser = (user: User) => {
        fetch('https://80.78.240.16:7070/api/user', {
            method: 'POST', 
            body: JSON.stringify({name: 'Vasya', birthDate: '11.11.2011'})
        })
            .then(response => response.json())
            .then(addedUser => {
                // add user to fakeUsers array
                const newArr = fakeUsers.slice();
                newArr.push(addedUser);
                setFakeUsersCopy(newArr);
            })
            .catch( error => console.log(error) )
    }

    const renderUserList = () => {
        return <UserList users={usersState} onEditClick={onEditClick}></UserList>
    }
    const renderUserEditForm = () => {
        return <UserEditForm user={editedUser} onCancelClick={setIsEditModeOn} onSaveClick={onSaveClick}></UserEditForm>
    }

    return (
        <div className="user-page">
            {temp}
            <button onClick={onClick}>Delete last user</button>

            {
                fakeUsers.map(user => <div>{user.id} {user.name}</div>)
            }

            {
                isEditModeOn ? renderUserEditForm() : renderUserList()
            }
        </div>
    )
}

export default UserPage;