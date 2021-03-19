import './UserPage.css'

function UserPage(){

    const users = [
        {
            name: "Гай Юлий",
            secondName:"Цезарь",
            birthDate:"12/07/-0100",
            login:"Lorem",
            password:"cesar",
        },
        {
            name: "Марк Аврелий",
            secondName: "Антонин",
            birthDate:"26/04/0121",
            login:"ave",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:1
            },
        {
            name: "Гай Юлий",
            secondName:"Цезарь",
            birthDate:"12/07/-0100",
            login:"ipsum",
            password:"cesar",

        },
        {
            name: "Марк Аврелий",
            secondName: "Антонин",
            birthDate:"26/04/0121",
            login:"dolor",
            password:"cesar",
            roleId:[
                1,
                2
            ],
            groupId:1
        },
    ]
    
    return(
        <div className="user-page">
            страница пользователей
        </div>
    )
}

export default UserPage;