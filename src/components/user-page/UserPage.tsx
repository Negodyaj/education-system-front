
import { User } from '../interfaces/User';
import UserList from './user-list/UserList';
import './UserPage.css'

interface UserPageProps{
    roleId:number;
}

function UserPage(props: UserPageProps){

    const users:User[] = [
        {
            id:430,
            name: "Гай Юлий",
            secondName:"Цезарь",
            birthDate:"12/07/-0100",
            login:"Lorem",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:4,
            groupName: "C# Base дневная"
        },
        {
            id:40,
            name: "Марк Аврелий",
            secondName: "Антонин",
            birthDate:"26/04/0121",
            login:"ave",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:4,
            groupName: "C# Base дневная"
            },
        {
            id:30,
            name: "Тит Элий Адриан сверхпредрассредоточенный",
            secondName:"Антонин",
            birthDate:"12/07/-0100",
            login:"ipsum",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:4,
            groupName: "C# Base дневная"
        },
        {
            id:4,
            name: "Публий Элий Траян",
            secondName: "Адриан",
            birthDate:"26/04/0121",
            login:"dolor",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:4,
            groupName: "C# Base дневная"
        },
    ]
    
    return(
        <div className="user-page">
            <UserList users={users}></UserList>
        </div>
    )
}

export default UserPage;