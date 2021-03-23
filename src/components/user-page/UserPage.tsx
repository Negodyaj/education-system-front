
import { useState } from 'react';
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
                roleId: 1,
                roleName: "студент"
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 40,
            name: "Марк Аврелий",
            secondName: "Антонин",
            birthDate:  new Date(),
            login: "ave",
            password: "cesar",
            phone: "+7 897 012 345 67 89",
            role: [{
                roleId: 1,
                roleName: "студент"
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 30,
            name: "Тит Элий Адриан сверхпредрассредоточенный",
            secondName: "Антонин",
            birthDate:  new Date(),
            login: "ipsum",
            password: "cesar",
            phone: "+7 999 887 23 05",
            role: [{
                roleId: 1,
                roleName: "студент"
            }, {
                roleId: 1,
                roleName: "студент"
            }, {
                roleId: 1,
                roleName: "студент"
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
        {
            id: 4,
            name: "Публий Элий Траян",
            secondName: "Адриан",
            birthDate:  new Date(),
            login: "dolor",
            password: "cesar",
            phone: "+7 902 089 97 42",
            role: [{
                roleId: 1,
                roleName: "студент"
            }],
            email: "boss@myempire.com",
            groupId: 4,
            groupName: "C# Base дневная"
        },
    ];

    
    const [usersState, setUsersState] = useState(users.concat());
    
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    
    const [editedUser, setEditedUser] = useState<User | null>(null);
    
    const ids:(number|undefined)[] =  Array.from(usersState, user => user.id);
    
    const onEditClick = (editedUserId?: number) => {

        alert(editedUserId);

        if (editedUserId===null) return;

        setIsEditModeOn(true);

        setEditedUser(
            usersState.filter((user) => {
                return user.id == editedUserId
            })[0]
        )
    }

    const renderUserList = () => {
        return <UserList users={usersState} onEditClick={onEditClick}></UserList>
    }

    const onSaveClick = (newUser:User) => {

        let i:number = ids.indexOf(newUser.id);

        if (i === -1) usersState.push(newUser);
        else usersState[i]=newUser;
        
        setUsersState(usersState.concat());
    }

    const renderUserEditForm = () => {
        return <UserEditForm user={editedUser} ids={ids} onCancelClick={setIsEditModeOn} onSaveClick={onSaveClick}></UserEditForm>
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